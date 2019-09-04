import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import IdentityManager from "../identity/IdentityManager.js";
import {Redirect} from "react-router-dom";
import UsersApiClient from "../api/user/client.js";

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.identityManager = new IdentityManager();
    this.api = UsersApiClient;
    this.state = {
      email: null,
      password: null,
      isAuthenticated: false
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
        if (user) {
          console.log("Signup: here is the email: ", user.getUsername());
          this.api.create(result => {
            console.log("Users create api responded with: ", result);
            this.onSignin();
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

  onSignin() {
    this.identityManager.signin(
      this.state.email,
      this.state.password,
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
    let component = (
      <div className="Signup content">
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
