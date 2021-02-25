/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux"; 
import { Link, withRouter } from 'react-router-dom'; 
import { logout } from "../../redux/actions/auth";
import { FormControl, Form, Navbar, Nav } from "react-bootstrap";
import {SearchSvg, FilterSvg, ShopingCartSvg, BellSvg, MailSvg, LogoSvg} from '../../assets/properties';


class NavbarComp extends Component { 


  onLogout() {
    this.props.dispatch(logout());
    // this.props.history.push("/login");
  }

  // onLogin() {
  //   this.props.history.push("/login");
  // }

  // onSignup() {
  //   this.props.history.push("/sign-up");
  // }

  render() {
    return (
      <>
      <Navbar collapseOnSelect expand="lg" variant="light" bg="light" fixed="top" className="pr-lg-5 pl-lg-5">
        <Navbar.Brand href="#home">
          <LogoSvg/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form inline  className="mr-auto ml-auto">
            <FormControl type="text" placeholder="Search"/>
            <button className="btn btn-search-svg">
              <SearchSvg/>
            </button>  
            <button className="btn btn-outline-light btn-filter-svg">
              <FilterSvg/>
            </button>  
          </Form> 
          
          <Nav>
            <Nav.Link href="#deets"><ShopingCartSvg/></Nav.Link>
            {/* <button className="btn"><ShopingCartSvg/></button> */}

            {this.props.auth.isAuthenticated 
              ? <>
                <Nav.Link eventKey={2} href="#memes">
                  <BellSvg/>
                </Nav.Link>
                <Nav.Link href="#"><MailSvg/></Nav.Link>
                <Link
                  className="nav-link"
                  id=""
                  onClick={this.onLogout.bind(this)}
                >
                  Logout
                </Link>
                </>
              : <> 
                <Link
                  className="btn btn-secondary btn-block btn-block-nav"
                  id=""
                  // onClick={this.onLogin.bind(this)}
                  to="/login"
                >
                    Login
                </Link>
                <Link
                  className="btn btn-outline-secondary btn-block-nav"
                  id=""
                  // onClick={this.onSignup.bind(this)}
                  to="/sign-up"
                >
                    Signup
                </Link> 
              </>
            }   
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const Navigate = withRouter(NavbarComp);

export default connect(mapStateToProps)(Navigate);
