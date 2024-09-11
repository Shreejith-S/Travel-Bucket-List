// import { Filter } from '@mui/icons-material';
import Index from './Component/Index';
import Login from './Component/Login';
import Register from './Component/Register';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    // <>
    //   {/* <Index /> */}
    //   <center>
    //   <Register />
    //   <hr />
    //   <hr />
    //   <hr />
    //   <Login />

    //   </center>
    // </>
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/index' element={<Index />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
