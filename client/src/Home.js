import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import Login from "./components/Auth/Login";

class Home extends Component {
  state = {
    users: null,
    search: ""
  };

  getData = () => {
    axios
      .get("/api/users")
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSearch = e => {
    e.preventDefault();
    let input = e.target.value;
    this.setState({
      search: input
    });

    axios
      .get(`/api/users/${input}`)
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getData();
    console.log(this.state.users);
  }

  render() {
    console.log("ME", this.props.user);

    if (!this.state.users) return <div></div>;
    let users = this.state.users.map(user => {
      if (this.props.user._id === user._id) return;
      return (
        <div>
          <Link key={user._id} to={`/profile/${user._id}`}>
            <div>
              <img width="50%" src={user.profileImg} alt="user-profile-img" />
              <h5>{user.username}</h5>
            </div>
          </Link>
          <p>wishlists:{user.wishlists.length}</p>
        </div>
      );
    });
    return (
      <div className="home-container">
        <input onChange={e => this.handleSearch(e)} type="text" />
        <Link to="/profile/wishlist/new">
          <button>New Wishlist</button>
        </Link>
        <div className="flex-user-container">{users}</div>
      </div>
    );
  }
}

export default Home;
