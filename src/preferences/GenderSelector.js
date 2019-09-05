import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

require("./gender-selector.css")

class GenderSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gender: this.props.gender
    }
  }

  onChangeGender(gender) {
    this.setState({
      gender: gender
    })
    this.props.onChangeGender(gender)
  }

  render() {
    return <ButtonGroup className={"GenderSelector " + this.props.className}>
      <Button
        onClick={() => {
          this.onChangeGender("male");
        }}
        className={
          this.state.gender === "male" ? "selected" : "unselected"
        }
      >
        Male
      </Button>
      <Button
        onClick={() => {
          this.onChangeGender("female");
        }}
        className={
          this.state.gender === "female" ? "selected" : "unselected"
        }
      >
        Female
      </Button>
    </ButtonGroup>
  }
}

export default GenderSelector;
