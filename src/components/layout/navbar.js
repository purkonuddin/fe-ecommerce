/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../redux/actions/auth";

class Navbar extends Component {
  onLogout() {
    this.props.dispatch(logout());
    this.props.history.push("/login");
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ background: "#e3f2fd" }}
      >
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                <i class="fas fa-home">Home</i>
                <span className="sr-only">(current)</span>
              </a>
            </li>

            <li className="nav-item ">
              <a className="nav-link" href="/product">
                <i className="fas fa-file-invoice"> Product</i>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/category">
                <i className="fa fa-list-alt">Category</i>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/history">
                <i className="fas fa-chart-line">History</i>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/user">
                <i className="fas fa-user-cog">User</i>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/merchant">
                <i class="fas fa-store">Merchant</i>
              </a>
            </li>
            <li className="nav-item ">
              <Link
                className="nav-link"
                id=""
                onClick={this.onLogout.bind(this)}
              >
                <i className="fas fa-sign-out-alt">Logout</i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const Nav = withRouter(Navbar);

export default connect(mapStateToProps)(Nav);
