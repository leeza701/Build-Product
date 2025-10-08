import {Box, useColorModeValue} from '@chakra-ui/react';
import {Route,Routes} from 'react-router-dom';

import CreatePage from './pages/createpage.jsx';
import HomePage from './pages/homepage.jsx';
import Navbar from './components/navbar.jsx';
import { use } from 'react';
function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100","gray.900")}>
   <Navbar />
   
   <Routes>
    <Route path ='/' element={<HomePage />} />
    <Route path='/create' element={<CreatePage />} />
   </Routes>
  </Box>
  );
}

export default App;
