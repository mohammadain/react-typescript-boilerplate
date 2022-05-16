import React, {useState} from 'react';
import './App.css';
import {Contacts} from './components/Contacts'
import {Box} from "@mui/material"
import {Filters} from "./components/Filters";
import {FilterProvider} from './contexts/FilterContext';

const App: React.FC = () => {
  const [contactsCount, setContactsCount] = useState(0);

  return (
    <FilterProvider>
      <div className="App">

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            m: 0
          }}
        >
          <Box sx={{
            width: 250,
            p: 2,
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)'
          }}>
            <Filters contactsCount={contactsCount}/>
          </Box>

          <Box
            sx={{flexGrow: 1}}
          >
            <Contacts setContactsCount={setContactsCount}/>
          </Box>

        </Box>

      </div>
    </FilterProvider>
  )
}

export default App;
