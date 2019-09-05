import React from "react";
import Form from "react-bootstrap/Form";

require ("./profile.css")

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
      name: null,
      description: "",
      gender: null
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    this.setState({
      img:
        "http://www.hmcoloringpages.com/wp-content/uploads/person-silhouette-9.gif",
      name: "John Doe",
      description: "Looking for someone to go out on dates with",
      gender: "male"
    });
  }

  onChangeDescription(ev) {
    this.setState({
      description: ev.target.value
    });
  }

  render() {
    return (
      <div className="Profile">
        <img className="Profile__img space-below" src={this.state.img} alt=""/>
        <h2 className="Profile__name">{this.state.name}</h2>
        <hr />
        <Form.Group className="Profile__description">
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Describe yourself here..."
            onChange={this.onChangeDescription.bind(this)}
            value={this.state.description}
          />
        </Form.Group>
      </div>
    );
  }
}

export default Profile;
