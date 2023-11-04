import { Route,Routes } from 'react-router';
import axios from "axios";

import './App.css';
// import { Footer } from './components/Footer/Footer';
// import { Header } from './components/Header/Header';
import {GuestRoutes} from './routes/GuestRoutes';
import {HostRoutes} from './routes/HostRoutes';
import {AdminRoutes} from './routes/AdminRoutes';
import {GenRoutes} from './routes/GenRoutes';
import { useEffect } from 'react';
// import {useDispatch} from 'react-redux';

function App() {

  // const dispatch=useDispatch();
  // const getAdmins=() => {
  //     axios.get("/admin/guestList")
  //       .then(response => {
  //         console.log(response);
  //         console.log("data received");
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       })
  // }

  // useEffect(() => {
  //   axios.get("/admin/guestList")
  //       .then(response => {
  //         console.log(response);
  //         console.log("data received");
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       })
  // },[])

  return (
    <>

      {/* <h1>hello</h1>
      <Footer /> */}
      {/* <Header /> */}
      {/* <GuestForm /> */}
      <Routes>
        <Route path='/*' element={<GenRoutes/>}/>
        <Route path='/admin/*' element={<AdminRoutes/>}/>
        <Route path='/guest/*' element={<GuestRoutes/>}/>
        <Route path='/host/*' element={<HostRoutes/>}/>
      </Routes>
    </>
  );
}

export default App;
