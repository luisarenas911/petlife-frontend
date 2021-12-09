import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import MyProfile from "./pages/MyProfile";
import DetailPet from "./pages/DetailPet";
import VetSearch from "./pages/VetSearch";
import AddProcedure from "./pages/AddProcedureForm";
import PetSearch from "./pages/PetSearch";
import DetailVet from "./pages/DetailVet";
import NewPet from "./pages/NewPet";
import Chat from "./pages/Chat";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/newpet" component={NewPet} />
        <Route path="/login" component={Login} />
        <Route path="/vets/:id" component={DetailVet} />
        <Route path="/myprofile" component={MyProfile} />
        <Route path="/petSearch" component={PetSearch} />
        <Route path="/vetSearch" component={VetSearch} />
        <Route path="/addprocedure" component={AddProcedure} />
        <Route path="/pets/:id" component={DetailPet} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </div>
  );
}

export default App;
