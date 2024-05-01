
import React from 'react';
import {Routes,Route} from "react-router-dom";
import P1h from '../pages/host/P1h';
import P2h from '../pages/host/P2h';
import P3h from '../pages/host/P3h';
import P4h from '../pages/host/P4h';
import P5h from '../pages/host/P5h';
import P6h from '../pages/host/P6h';
import P7h from '../pages/host/P7h';
import P8h from '../pages/host/P8h';
import P9h from '../pages/host/P9h';
import P10h from '../pages/host/P10h';
import Congo from '../pages/host/Congo';
import P12h from '../pages/host/P12h';
import { HostLogin } from '../pages/host/HostLogin';
import { HostRegister } from '../pages/host/HostRegister';
import { HostEditPass } from "../pages/host/HostEditPass";
import  HostProfilepage from "../pages/host/HostProfilepage";
import { Dashboard } from '../pages/host/Dashboard';
export function HostRoutes() {
    return (
        <div>
            <Routes>
            <Route path='/' element={<P1h/>}/>
            <Route path='/p1h' element={<P1h/>}/>
            <Route path='/p2h' element={<P2h/>}/>
            <Route path='/p3h' element={<P3h/>}/>
            <Route path='/p4h' element={<P4h/>}/>
            <Route path='/p5h' element={<P5h/>}/>
            <Route path='/p6h' element={<P6h/>}/>
            <Route path='/p7h' element={<P7h/>}/>
            <Route path='/p8h' element={<P8h/>}/>
            <Route path='/p9h' element={<P9h/>}/>
            <Route path='/p10h' element={<P10h/>}/>
            <Route path='/p12h' element={<P12h/>}/>
            <Route path='/congo' element={<Congo/>}/>
            <Route path='/login' element={<HostLogin/>}/>
            <Route path='/register' element={<HostRegister/>}/>
            <Route path='/editPass' element={<HostEditPass/>}/>
            <Route path='/hostprof' element={<HostProfilepage/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            </Routes>


        </div>
    );
}

