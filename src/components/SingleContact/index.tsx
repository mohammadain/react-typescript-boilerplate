import * as React from 'react';
import {
  Avatar, Box, Fab, FormControlLabel, Typography, useTheme,
  Checkbox as MuiCheckbox, Divider
} from "@mui/material";
import {
  Add, CheckCircle, FiberManualRecordOutlined,
  RadioButtonUnchecked
} from '@mui/icons-material';
import avatar from '../../images/avatar.jpg'
import {Contact} from "../../models/contact";

const Checkbox = (props: any) => {
  return (
    <FormControlLabel
      label={props.label}
      control={
        <MuiCheckbox
          size="small"
          sx={{p: 0}}
          icon={props.icon}
          checkedIcon={props.checkedIcon}
          checked={props.isSelectAll}
        />
      }
    />
  );
};

type Props = {
  contact: Contact,
  isSelectAll: boolean,
};

export function SingleContact(props: Props) {

  const {contact, isSelectAll} = props
  const theme = useTheme();

  return (
    <div style={{width: '100%'}}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          ml: 3,
          mr: 2,
          mt: 1,
        }}
      >

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Checkbox
            label=""
            icon={<RadioButtonUnchecked/>}
            checkedIcon={<CheckCircle/>}
            isSelectAll={isSelectAll}
          />
          <Avatar sx={{width: 56, height: 56}} alt="{contact.name}" src={contact.img ? contact.img : avatar}/>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            ml: 1
          }}>
            <Typography variant="subtitle2">{contact.name}</Typography>
            <Typography variant="subtitle2"
                        sx={{color: theme.palette.grey[400], fontWeight: 500}}>{contact.phoneNumber}</Typography>
          </Box>
        </Box>


        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Fab variant="extended" size="small" sx={{background: '#02a490'}}>
            <p style={{paddingLeft: 3, textTransform: 'capitalize', color: 'white'}}>Tags</p>
            <FiberManualRecordOutlined fontSize='small' sx={{ml: 1, background: 'white', borderRadius: 5}}/>
          </Fab>
          <Box sx={{ml: 1}}>
            <Fab size="small" sx={{background: '#02a490', color: 'white'}}>
              <Add/>
            </Fab>
          </Box>
        </Box>
      </Box>
      <Divider light={true} sx={{ml: 6, width: '50%'}}/>
    </div>
  )
}