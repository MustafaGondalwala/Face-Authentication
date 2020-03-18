import React from 'react';
// import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import DashboardPage from "./components/pages/DashboardPage";


import UserRoute from "./components/routes/UserRoute"
import GuestRoute from "./components/routes/GuestRoute"

function App() {
  return (
    <div>
      <GuestRoute path="/" exact component={HomePage}/>
      <GuestRoute path="/login" exact component={LoginPage}/>
      <GuestRoute path="/register" exact component={RegisterPage}/>
      <UserRoute path="/dashboard" exact component={DashboardPage}/>
    </div>
  );
}

export default App;
