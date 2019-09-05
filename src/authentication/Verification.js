import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import IdentityManager from "../identity/IdentityManager.js";

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.identityManager = new IdentityManager();
    this.state = {
      verificationCode: null
    };
  }

  onChangeVerificationCode(ev) {
    this.setState({verificationCode: ev.target.value});
  }

  onVerify() {
    this.identityManager.verify(
      this.props.user,
      this.state.verificationCode,
      user => {
        if (user) {
          this.props.onVerify(this.props.user.email, this.props.user.password);
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  render() {
    return (
      <div className="Verification content">
        <Form>
          <Form.Group>
            <Form.Label>
              Please check your email for a verification code
            </Form.Label>
            <Form.Control
              onChange={this.onChangeVerificationCode.bind(this)}
              type="text"
              placeholder="Enter verification code here"
            />
          </Form.Group>
          <Button
            onClick={this.onVerify.bind(this)}
            variant="primary"
            type="button"
          >
            Verify
          </Button>
        </Form>
      </div>
    );
  }
}

export default Verification;
