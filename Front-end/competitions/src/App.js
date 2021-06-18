import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
// import AuthContext from "./context/auth-context";
import ProtectedRoute from "./protectedRoutes";

import SignUp from "./components/signup";
import SignIn from "./components/signin";
import Participants from "./components/participants";
import participantInfo from "./components/participantInfo";

class App extends Component {
  state = {
    token: null,
    userId: null,
  };

  login = (userId, token, tokenExperation) => {
    this.setState({ token: token, adminId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <main className="main-content">
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/" component={SignIn} exact />
              <ProtectedRoute
                path="/participants"
                component={Participants}
                isAuth={localStorage.length > 0 && localStorage.user === "User"}
              />
              <ProtectedRoute
                path="/participant/:id"
                component={participantInfo}
                isAuth={localStorage.length > 0 && localStorage.user === "User"}
              />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default App;
