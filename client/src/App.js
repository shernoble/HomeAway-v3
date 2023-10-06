import { Route,Routes } from 'react-router';


import './App.css';
// import { Footer } from './components/Footer/Footer';
// import { Header } from './components/Header/Header';
import {GuestRoutes} from './routes/GuestRoutes';
import {HostRoutes} from './routes/HostRoutes';
import {AdminRoutes} from './routes/AdminRoutes';
import {GenRoutes} from './routes/GenRoutes';

function App() {
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
