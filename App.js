import React from "react";
import './App.css';
import Login from "./Components/Login";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Registration from "./Components/Registration";
import PrivateRoute from "./Components/PrivateRoute"
import Profile from "./Components/Profile";

function App() {
    return (
        <div className="App">
            <div className="justify-content-center text-white">
                <h3>Registration with Login</h3>
            </div>

            <Router>
                <Routes>
                    <Route exact path="/" element={<Login/>}> </Route>
                    {/*<Route exact path="/Profile" element={<Profile/>}> </Route>*/}
                    {/*//private route*/}
                    <Route path="/Profile" element={<PrivateRoute Component={Profile}/>} />
                    <Route exact path="/Registration" element={<Registration/>}> </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
