import React from "react";
import css from "./find.css";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

class Find extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
      name: null,
      description: ""
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    this.setState({
      img:
        "http://www.theguidon.com/1112/main/wp-content/uploads/2012/02/deconstructing-1.jpg",
      name: "Jane Doe",
      description: "Take me out for sushi and I am yours"
    });
  }

  onLike() {
    this.getNext();
  }

  onDislike() {
    this.getNext();
  }

  getNext() {
    this.setState({
      img:
        "http://www.hmcoloringpages.com/wp-content/uploads/person-silhouette-9.gif",
      name: Math.random()
        .toString(36)
        .substring(7),
      description: Math.random()
        .toString(36)
        .substring(7)
    });
  }

  render() {
    return (
      <div className="Match">
        <img className="Match__img space-below" src={this.state.img} />
        <h3 className="Match__name">{this.state.name}</h3>
        <h5 className="Match__description">"{this.state.description}"</h5>
        <ButtonToolbar>
          <Button
            onClick={this.onDislike.bind(this)}
            className="dislike"
            variant="secondary"
            size="lg"
            active
          >
            Dislike
          </Button>
          <Button
            onClick={this.onLike.bind(this)}
            className="like"
            variant="primary"
            size="lg"
            active
          >
            Like
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Find;
