import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ProfileImpl from "../profile/Profile.js";
import MatchesImpl from "../matches/Matches.js";
import FindImpl from "../find/Find.js";
import {NavLink} from "react-router-dom";
import PreferencesImpl from "../preferences/Preferences.js";
import AuthenticaionImpl from "../authentication/Authentication.js";
import IdentityManager from "../identity/IdentityManager.js";
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";

require("./header.css");
require("./common.css");

const SELECTED_TAB_STYLE = {color: "rgb(208,136,19)"};
const IDENTITY_MANGER = new IdentityManager();

/* Initialize authentication state */
const AUTHENTICATOR = {
  isAuthenticated: false
};

IDENTITY_MANGER.isAuthenticated(() => {
  AUTHENTICATOR.isAuthenticated = true;
}, () => {
  AUTHENTICATOR.isAuthenticated = false;
});
/*****************************************************************************************/

/* keep polling for authentication state and update isAuthenticated accordingly */
function initAuthRetrievalTask() {
  setInterval(function() {
    IDENTITY_MANGER.isAuthenticated(
      user => {
        AUTHENTICATOR.isAuthenticated = true;
      },
      err => {
        AUTHENTICATOR.isAuthenticated = false;
      }
    );
  }, 5000);
}
/*****************************************************************************************/

function Profile() {
  return <ProfileImpl />;
}

function Matches() {
  return <MatchesImpl />;
}

function Find() {
  return <FindImpl />;
}

function Authentication() {
  return <AuthenticaionImpl />;
}

function Preferences() {
  return <PreferencesImpl />;
}

//Pages that require authentication should be declared as <PrivateRoute/>
//Pages that don't require authentication should be declared as <Route/>
function AppRouter() {
  initAuthRetrievalTask();
  return (
    <Router>
      <div>
        <PrivateRoute path="/" exact component={Find} />
        <PrivateRoute path="/profile/" component={Profile} />
        <PrivateRoute path="/matches/" component={Matches} />
        <PrivateRoute path="/preferences/" component={Preferences} />
        <Route path="/authentication/" component={Authentication} />
      </div>
    </Router>
  );
}

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      ((props.location && props.location.state && props.location.state.isAuthenticated) || AUTHENTICATOR.isAuthenticated) ? (
        <div>
          <Navbar bg="light" expand="lg" className="Router__Navbar">
            <Navbar.Brand>Matcher@aucegypt.edu</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavLink exact to="/" activeStyle={SELECTED_TAB_STYLE}>
                  Find
                </NavLink>
                <NavLink to="/profile/" activeStyle={SELECTED_TAB_STYLE}>
                  Profile
                </NavLink>
                <NavLink to="/matches/" activeStyle={SELECTED_TAB_STYLE}>
                  Matches
                </NavLink>
                <NavLink to="/preferences/" activeStyle={SELECTED_TAB_STYLE}>
                  Preferences
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="content">
          <Component {...props} />
          </div>
        </div>
      ) : (
        <Redirect to="/authentication/" />
      )
    }
  />
);

export default AppRouter;
