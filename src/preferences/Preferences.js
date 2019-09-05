import React from "react";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import GenderSelector from "./GenderSelector.js";
import Calendar from "react-calendar";
import InputRange from "react-input-range";

require("./preferences.css")

class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: null,
      lookingForGender: null,
      birthdate: null,
      lookingForAge: null
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    this.setState({
      description: "",
      gender: "male",
      lookingForGender: "female",
      birthdate: new Date("1995-12-17T03:24:00"),
      lookingForAge: {min: 18, max: 23}
    });
  }

  onChangeGender(gender) {
    this.setState({
      gender: gender
    });
  }

  onChangeLookingForGender(gender) {
    this.setState({
      lookingForGender: gender
    });
  }

  onChangeBirthdate(value) {
    this.setState({
      birthdate: value
    });
  }

  render() {
    return (
      <div className="Preferences">
        <Tabs defaultActiveKey="i_am">
          <Tab eventKey="i_am" title="I am">
            {this.state.gender && (
              <GenderSelector
                className="space-below "
                gender={this.state.gender}
                onChangeGender={this.onChangeGender.bind(this)}
              />
            )}
            {this.state.birthdate && (
              <div>
                <Form.Label className="space-below-small">
                  Date of birth:
                </Form.Label>
                <Calendar
                  value={this.state.birthdate}
                  onChange={this.onChangeBirthdate.bind(this)}
                />
              </div>
            )}
          </Tab>
          <Tab eventKey="looking_for" title="I am looking for">
            {this.state.lookingForGender && (
              <GenderSelector
                className="space-below"
                gender={this.state.lookingForGender}
                onChangeGender={this.onChangeLookingForGender.bind(this)}
              />
            )}
            {this.state.lookingForAge && (
              <div>
                <Form.Label className="space-below">
                  Age range:
                </Form.Label>
                <InputRange
                  maxValue={99}
                  minValue={18}
                  value={this.state.lookingForAge}
                  onChange={lookingForAge => this.setState({lookingForAge})}
                />
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Preferences;
