import React, {useCallback, useEffect, useState} from "react"
import {Contact} from "../../models/contact"
import {SingleContact} from '../SingleContact'
import {
  Fab, Button, Box, styled, Input, Typography, FormControlLabel,
  Checkbox as MuiCheckbox, InputAdornment, CircularProgress
} from '@mui/material';
import {Add, CheckCircle, Search, RadioButtonUnchecked} from '@mui/icons-material';
import {debounce} from 'lodash'
import axios from 'axios';
import useFilter from '../../hooks/useFilter';
import {authenticate} from "../../utils/authenticate";
import {CONSTANT} from "../../utils/constant";

const ExportButton = styled(Button)(({theme}) => `
  background: #02a490;
  padding-right: 10px;
  padding-left: 10px;
`);

type Props = {
  setContactsCount: any
};

export const Contacts = (props: Props) => {
  const [allContacts, setAllContacts] = useState<Array<Contact>>([])
  const [isSelectAll, setIsSelectAll] = useState(false)
  const [page, setPage] = useState('')
  const [loader, setLoader] = useState(false)
  const {filters} = useFilter();

  const getContacts = useCallback(async (searchValue?: string, page: string = '') => {
    setLoader(true)
    axios.defaults.headers = await authenticate()
    axios.get(CONSTANT.CONTACT_API.CONTACTS, {
      params: {...filters, q: searchValue, page: page},
    })
      .then(res => res.data)
      .then(({contacts, nextPage}: { contacts: Contact[], nextPage: string }) => {

        let contactsToStore = contacts
        if (page !== '') {
          contactsToStore = allContacts.concat(contacts);
        }

        setAllContacts(contactsToStore)
        setPage(nextPage)
        props.setContactsCount(contactsToStore.length)
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => setLoader(false))
  }, [filters, allContacts]);

  const handleScroll = useCallback(
    debounce(() => {
      if (window.innerHeight + document.documentElement.scrollTop + 0.5 === document.documentElement.offsetHeight) {
        getContacts(undefined, page)
      }
    }, 300),
    [page]
  );

  useEffect(() => {
    getContacts();
  }, [filters])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {passive: true});
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll])

  const doSearch = debounce(({target: {value}}: { target: { value?: string } }) => {
    getContacts(value);
  }, 300);

  const Checkbox = (props: any) => {
    return (
      <FormControlLabel
        label={props.label}
        control={
          <MuiCheckbox
            size="small"
            sx={{p: 0, ml: 2}}
            checked={isSelectAll}
            icon={props.icon}
            checkedIcon={props.checkedIcon}
            onChange={(e) => {
              setIsSelectAll(e.target.checked)
            }}
          />
        }
      />
    );
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          m: 1,
        }}
      >
        <Typography variant="h6">All Contacts ({allContacts.length})</Typography>
        <Box>
          <Fab size="small" sx={{background: '#02a490', color: 'white'}}>
            <Add/>
          </Fab>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
        }}
      >
        <Input
          onChange={doSearch}
          fullWidth
          disableUnderline
          size="medium"
          sx={{borderRadius: 10, background: '#F2F5F9', p: 1}}
          startAdornment={
            <InputAdornment position="start">
              <Search/>
            </InputAdornment>
          }
          placeholder="Search contacts"/>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          ml: 1,
          mr: 1,
          pr: 1
        }}
      >

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Checkbox
            label=""
            icon={<RadioButtonUnchecked/>}
            checkedIcon={<CheckCircle/>}
          />
          <Typography variant="subtitle2">Select All</Typography>
        </Box>

        <ExportButton variant="contained">Export All</ExportButton>
      </Box>

      {
        allContacts.map((contact: Contact, index: number) => <SingleContact key={index} contact={contact}
                                                                            isSelectAll={isSelectAll}/>)
      }

      {
        loader && <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: page ? -5 : 0

        }}
          >
              <CircularProgress/>
          </Box>
      }

    </div>
  )
};