import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Profile from "../profile/Profile.js";
import Matches from "../matches/Matches.js";
import Find from "../find/Find.js";
import Preferences from "../preferences/Preferences.js";

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false,
      showMatches: false,
      showFind: true,
      showPreferences: false
    };
  }

  showProfilePage() {
    this.reset();
    this.setState({
      showProfile: true
    });
  }

  showMatches() {
    this.reset();
    this.setState({
      showMatches: true
    });
  }

  showFind() {
    this.reset();
    this.setState({
      showFind: true
    });
  }

  showPreferences() {
    this.reset();
    this.setState({
      showPreferences: true
    });
  }

  reset() {
    this.setState({
      showProfile: false,
      showMatches: false,
      showFind: false,
      showPreferences: false
    });
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Matcher@aucegypt.edu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                className={this.state.showFind ? "selected" : ""}
                onClick={() => {
                  this.showFind();
                }}
              >
                Find
              </Nav.Link>
              <Nav.Link
                className={this.state.showMatches ? "selected" : ""}
                onClick={() => {
                  this.showMatches();
                }}
              >
                Matches
              </Nav.Link>
              <Nav.Link
                className={this.state.showProfile ? "selected" : ""}
                onClick={() => {
                  this.showProfilePage();
                }}
              >
                Profile
              </Nav.Link>
              <Nav.Link
                className={this.state.showPreferences ? "selected" : ""}
                onClick={() => {
                  this.showPreferences();
                }}
              >
                Preferences
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="Router__content">
          {this.state.showProfile && <Profile />}
          {this.state.showMatches && <Matches />}
          {this.state.showFind && <Find />}
          {this.state.showPreferences && <Preferences />}
        </div>
      </div>
    );
  }
}

export default Router;
