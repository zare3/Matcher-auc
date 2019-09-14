import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import IdentityManager from "../identity/IdentityManager.js";
import { validateAll, validations} from 'indicative/validator'
import TextField from '@material-ui/core/TextField';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.identityManager = new IdentityManager();
    
    this.state = {
      email: null,
      password: null,
      isEmailCorrect : false,
      isPasswordCorrect : false,
      errors : {},
      touched : {}
    };
    
  }

  isSubmissionAllowed (){
    return this.state.isEmailCorrect && this.state.isPasswordCorrect;
  }

  onChangePassword(ev) {
    this.setState({password: ev.target.value},()=>{
      const schema = {
        password: [
          validations.required(),
          validations.min([8]),
          validations.regex(['(?=.*[a-z0-9])(?=.*[A-Z])(?=.*[^A-Za-z0-9 ])'])
        ]
      };
      const messages = {
        required: 'Make sure to enter a password',
        min: 'Password should be at least 8 characters',
        regex : 'The password should contain at least One Upper, Lower, Numeric and Special Character.'
      };
      validateAll(this.state, schema,messages).then(()=>{this.setState({isPasswordCorrect : true})}).catch(errors=>{
      this.setState({isPasswordCorrect : false})
      const formattedErrors = {}
      errors.forEach(error=>{formattedErrors[error.field] = error.message})
      this.setState({errors:formattedErrors})
    })
  }
  );
}

  onChangeEmail(ev) {
    this.setState({email: ev.target.value},()=>{
      const schema = {
        //email: 'required|email'
        email:[
          validations.required(),
          validations.regex([/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/])
        ]
      };
      const messages = {
        required: 'Make sure to enter an email',
        regex: 'Make sure the email is of a valid email format'
      };
      validateAll(this.state, schema,messages).then(()=>{this.setState({isEmailCorrect : true})}).catch(errors=>{
        this.setState({isEmailCorrect : false})
        const formattedErrors = {}
        errors.forEach(error=>{formattedErrors[error.field] = error.message})
        this.setState({errors:formattedErrors})
      })
  }
  );
}

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }


  render() {
    return (
      <div className="LoginForm content">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <TextField
            onChange={this.onChangeEmail.bind(this)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={!this.state.isEmailCorrect && this.state.touched['email']}
            helperText={!this.state.isEmailCorrect && this.state.touched['email']?this.state.errors['email']:""}
            name="email"
            label="Enter Address"
            type="email"
            id="email"
            onBlur={this.handleBlur('email')}
          />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <TextField
            onChange={this.onChangePassword.bind(this)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={!this.state.isPasswordCorrect && this.state.touched['password']}
            helperText={!this.state.isPasswordCorrect?this.state.errors['password']:""}
            name="password"
            label="Password"
            type="password"
            id="password"
            onBlur={this.handleBlur('password')}
            //autoComplete="current-password"
          />
          </Form.Group>
          <Button
            onClick={() => {
              this.props.onSignup(this.state.email, this.state.password)
            }}
            variant="primary"
            type="button"
            disabled={!this.isSubmissionAllowed()}
          >
            Signup
          </Button>
          <Button
            onClick={() => {
              this.props.onSignin(this.state.email, this.state.password);
            }}
            variant="primary"
            type="button"
            disabled={!this.isSubmissionAllowed()}
          >
            Signin
          </Button>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
