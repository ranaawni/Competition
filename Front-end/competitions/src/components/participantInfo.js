import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

import axios from "axios";
import Navbar from "./nav";
class ParticipantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      name: "",
      email: "",
      qualifications: "",
      country: "",
      photo: "",
    };
  }
  componentDidMount() {
    // to get data about one participant
    let token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    let userId = decoded._id;
    axios
      .get("http://localhost:3010/participant/" + this.props.match.params.id)
      .then((res) => {
        console.log(res, "one");
        this.setState({
          name: res.data.name,
          mobile: res.data.mobile,
          country: res.data.country,
          email: res.data.email,
          qualifications: res.data.qualifications,
          photo: res.data.photo,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <br />
        <div className="container text-center border border-light p-9">
          <table className="table">
            <thead className="thead">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>country</th>
                <th>Qualifications</th>
                <th>Mobile</th>
                <th>Photo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.name}</td>
                <td>{this.state.email}</td>
                <td>{this.state.country}</td>
                <td>{this.state.qualifications}</td>
                <td>{this.state.mobile}</td>
                <td>
                  <img
                    src={this.state.photo}
                    alt="user"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default withRouter(ParticipantInfo);
