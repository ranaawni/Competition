import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";
import Navbar from "./nav";
const Participants = (props) => (
  <tr>
    <td>{props.participant.name}</td>
    <td>{props.participant.country}</td>
    <td>
      <button
        style={{
          width: "100px",
          height: "40px",
          borderRadius: "10px",
          color: "white",
          background: "#9AB973",
          fontWeight: "bold",
        }}
        type="button"
        className="btn btn-deep-orange darken-4"
        onClick={() => {
          window.location.href = "/participant/" + props.participant._id;
        }}
      >
        More Details
      </button>
    </td>
  </tr>
);

class ParticipantsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      filteredParticipants: [],
      country: "",
    };
  }
  //get all participants
  componentDidMount() {
    axios
      .get("http://localhost:3010/participants")
      .then((res) => {
        this.setState({ participants: res.data });
        console.log(res, "ressss");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ComplaintsList() {
    let listedParticipants =
      this.state.filteredParticipants.length > 0
        ? this.state.filteredParticipants
        : this.state.participants;

    return listedParticipants.map((currentParticipant) => {
      return (
        <Participants
          participant={currentParticipant}
          key={currentParticipant._id}
        />
      );
    });
  }

  onChangeCountry(e) {
    let { filteredParticipants } = this.state;
    var string = e.target.value;
    this.setState({
      country: e.target.value,
    });
    console.log(filteredParticipants, string, "filter");
    filteredParticipants = this.state.participants.filter((participant) =>
      // console.log(participant,'parr')
      participant.country.includes(string)
    );
    this.setState({ filteredParticipants: filteredParticipants });
  }

  render() {
    return (
      <div>
        <Navbar />
        <br />
        <div className="container text-center border border-light p-9">
          <Form>
            <Form.Group
              controlId="exampleForm.SelectCustomSizeSm"
              onChange={this.onChangeCountry.bind(this)}
            >
              <Form.Control
                as="select"
                size="sm"
                custom
                style={{
                  width: 155,
                  color: "white",
                  borderRadius: "5px",
                  height: "40px",
                  padding: "6px",
                  marginLeft: "1100px",
                  background: "#212121",
                }}
              >
                <option value="">Select by country</option>
                <option value="Jordan">Jordan</option>
                <option value="Qatar">Qatar</option>
                <option value="Syria">Syria</option>
                <option value="Bahrin">Bahrin</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <table className="table">
            <thead className="thead">
              <tr>
                <th>Name</th>
                <th>country</th>
              </tr>
            </thead>
            <tbody>{this.ComplaintsList()}</tbody>
          </table>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}
export default withRouter(ParticipantsList);
