import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import firebase from "../firebase";
import { storage } from "../firebase";
import AuthContext from "../context/auth-context";

class SignUp extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      mobile: "",
      country: "",
      qualifications: "",
      url: "",
      photo: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  //handle change for input
  handleChange = (event) => {
    const value = event.target.value;
    console.log(value, "val");
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  //handle change image
  handleImage(e) {
    if (e.target.files[0]) {
      this.setState({
        photo: e.target.files[0],
      });
      console.log("image", e.target.files[0]);
    }
  }

  //handle signup form
  submitHandler = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;
    const mobile = this.state.mobile;
    const country = this.state.country;
    const qualifications = this.state.qualifications;
    const photo = this.state.url;

    if (
      password.trim().length === 0 ||
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      mobile.trim().length === 0 ||
      country.trim().length === 0 ||
      qualifications.trim().length === 0
    ) {
      alert("please fill all input field");
    }

    console.log(photo, "value photo");
    const user = {
      name,
      email,
      password,
      mobile,
      country,
      qualifications,
      photo,
    };

    axios
      .post("http://localhost:3010/signup", user)
      .then((res) => {
        console.log("you are perfect");
        window.location = "/";
      })
      .catch((err) => alert("email already exists"));
  };

  //handle upload image on firebase
  handleUpload() {
    const uploadTask = storage
      .ref(`images/${this.state.photo.name}`)
      .put(this.state.photo);
    console.log(uploadTask, "image upload");

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({
          progress: progress,
        });
      },
      (error) => {
        console.log(error);
      },

      () => {
        storage
          .ref("images")
          .child(this.state.photo.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({
              url: url,
            });
          });
      }
    );
  }

  render() {
    return (
      <div>
        <form className="auth-form" onSubmit={this.submitHandler}>
          <div className="form-control">
            <label>Full Name</label>
            <input
              id="fullName"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-control">
            <label>Email</label>
            <input
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-control">
            <label>Mobile</label>
            <input
              id="mobile"
              name="mobile"
              value={this.state.mobile}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-control">
            <label>Country</label>
            <input
              id="country"
              name="country"
              value={this.state.country}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-control">
            <label>Qualifications</label>
            <input
              id="qualifications"
              name="qualifications"
              ref={this.qualifications}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-control">
            <label>Add Image</label>
            <input
              type="file"
              //   required="true"
              id="image"
              className="form-control"
              // name="photo"
              // value={this.state.photo}
              onChange={this.handleImage}
            />
            <button onClick={this.handleUpload}>Upload</button>

            <br />
            <img
              src={this.state.url || "http://via.placeholder.com/100*150"}
              alt="firebase"
            />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit">Submit</button>
            <a href="/">Switch to Sign in</a>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
