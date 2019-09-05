import React from "react";
import IdentityManager from "../identity/IdentityManager.js";
import {Redirect} from "react-router-dom";
import Verification from "./Verification.js";
import LoginForm from "./LoginForm.js";
import UsersApiClient from "../api/user/client.js";

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.identityManager = new IdentityManager();
    this.api = UsersApiClient;
    this.state = {
      isAuthenticated: false,
      nonVerifiedSignedUpUser: null
    };
  }

  componentDidMount() {
    this.identityManager.isAuthenticated(
      () => {
        this.setState({
          isAuthenticated: true
        });
      },
      () => {
        this.setState({
          isAuthenticated: false
        });
      }
    );
  }

  onSignup(email, password) {
    this.identityManager.signup(
      email,
      password,
      user => {
        if (user) {
          console.log("Signup: here is the email: ", user.getUsername());
          this.api.create(result => {
            console.log("Users create api responded with: ", result);
            user.email = email;
            user.password = password;
            this.setState({
              nonVerifiedSignedUpUser: user
            });
          });
        }
      },
      err => {
        this.setState({
          isAuthenticated: false
        });
      }
    );
  }

  onSignin(email, password) {
    this.identityManager.signin(
      email,
      password,
      token => {
        this.setState({
          isAuthenticated: true
        });
      },
      err => {
        this.setState({
          isAuthenticated: false
        });
      }
    );
  }

  render() {
    if (this.state.isAuthenticated)
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {isAuthenticated: true}
          }}
        />
      );
    else if (
      this.state.nonVerifiedSignedUpUser &&
      !this.state.isAuthenticated
    ) {
      return (
        <Verification
          user={this.state.nonVerifiedSignedUpUser}
          onVerify={this.onSignin.bind(this)}
        />
      );
    } else {
      return (
        <LoginForm
          onSignup={this.onSignup.bind(this)}
          onSignin={this.onSignin.bind(this)}
        />
      );
    }
  }
}

export default Authentication;
