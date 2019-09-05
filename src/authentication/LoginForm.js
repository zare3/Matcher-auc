import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import IdentityManager from "../identity/IdentityManager.js";

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.identityManager = new IdentityManager();
    this.state = {
      email: null,
      password: null
    };
  }

  onChangePassword(ev) {
    this.setState({password: ev.target.value});
  }

  onChangeEmail(ev) {
    this.setState({email: ev.target.value});
  }

  render() {
    return (
      <div className="LoginForm content">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={this.onChangeEmail.bind(this)}
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
            onClick={() => {
              this.props.onSignup(this.state.email, this.state.password)
            }}
            variant="primary"
            type="button"
          >
            Signup
          </Button>
          <Button
            onClick={() => {
              this.props.onSignin(this.state.email, this.state.password);
            }}
            variant="primary"
            type="button"
          >
            Signin
          </Button>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
