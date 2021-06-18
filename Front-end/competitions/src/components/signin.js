import React, { Component } from "react";
// import MainNav from "./navigations/mainNav";
import axios from "axios";
import "../App.css";
import AuthContext from "../context/auth-context";

class SignIn extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
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

  //handle form submit
  submitHandler = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    // check if the fields empty or not
    if (email.trim().length === 0 || password.trim().length === 0) {
      alert("please fill all field");
    }
    const userLog = {
      email,
      password,
    };
    console.log(userLog, "login");
    axios
      .post("http://localhost:3010/signin", userLog)
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!  in auth file line 42");
        }
        console.log(res, "resss");
        const user = {
          email: this.state.email,
          password: this.state.password,
        };
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("email", user.email);
        window.localStorage.setItem("user", "User");

        window.location = "/participants";
      })

      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <form className="auth-form" onSubmit={this.submitHandler}>
          <div className="form-control">
            <label>Email</label>
            <input
              id="email"
              value={this.state.email}
              name="email"
              onChange={this.handleChange}
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
            <button type="submit">Login</button>
            <a href="/signup">Switch to Signup</a>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
