import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import IdentityManager from "../identity/IdentityManager.js";
import {Redirect} from "react-router-dom";

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.identityManager = new IdentityManager();
    this.state = {
      email: null,
      password: null,
      isAuthenticated: false
    };
  }

  onChangePassword(ev) {
    this.setState({password: ev.target.value});
  }

  onChangEmail(ev) {
    this.setState({email: ev.target.value});
  }

  onSignup() {
    this.identityManager.signup(
      this.state.email,
      this.state.password,
      user => {
        if (user) this.onSignin();
      },
      err => {
        this.setState({
          isAuthenticated: false
        });
      }
    );
  }

  onSignin() {
    this.identityManager.signin(
      this.state.email,
      this.state.password,
      token => {
        console.log("auth true");
        this.setState({
          isAuthenticated: true
        });
      },
      err => {
        console.log("auth false");
        this.setState({
          isAuthenticated: false
        });
      }
    );
  }

  render() {
    console.log("AUTHENTICATED: ", this.state.isAuthenticated);
    let component = (
      <div className="Signup">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={this.onChangEmail.bind(this)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={this.onChangePassword.bind(this)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            onClick={this.onSignup.bind(this)}
            variant="primary"
            type="button"
          >
            Signup
          </Button>
          <Button
            onClick={this.onSignin.bind(this)}
            variant="primary"
            type="button"
          >
            Signin
          </Button>
        </Form>
      </div>
    );

    if (this.state.isAuthenticated)
      component = (
        <Redirect
          to={{
            pathname: "/",
            state: {isAuthenticated: true}
          }}
        />
      );
    return component;
  }
}

export default Signup;
