import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../layout/navbar";
import { CardDeck, Card } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);

    this.mediaQuery = {
        desktop: 1200,
        tablet: 768,
        phone: 576,
      };

    this.state = { 
      windowWidth: document.body.clientWidth,
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div 
        className='container-fluid'
        style={{
            width: this.state.windowWidth > this.mediaQuery.phone
              ? '50%'
              : '100%', 
          }}> 
        <Navbar />
        <div style={{ marginTop: 30 }}>
          <div className="alert alert-primary" role="alert">
            Welcome
          </div>
        </div>
        <div
          style={{
            margin: 50,
          }}
        >
          <CardDeck>
            <Card
              style={{
                alignItems: "center",
                borderColor: "#fff",
              }}
            >
              <a href="/user">
                <Card.Img
                  src={require("../../assets/customer.png")}
                  style={{
                    width: 100,
                    height: 120,
                    padding: 0,
                  }}
                />
              </a>
              <a href="/user">
                <Card.Title>USER</Card.Title>
              </a>
            </Card>
            <Card
              style={{
                alignItems: "center",
                borderColor: "#fff",
              }}
            >
              <a href="/merchant">
                <Card.Img
                  src={require("../../assets/store.png")}
                  style={{
                    width: 100,
                    height: 120,
                    padding: 0,
                  }}
                />
              </a>
              <a href="/">
                <Card.Title>MERCHANT</Card.Title>
              </a>
            </Card>
            <Card
              style={{
                alignItems: "center",
                borderColor: "#fff",
              }}
            >
              <a href="/product">
                <Card.Img
                  src={require("../../assets/dairy-products.png")}
                  style={{
                    width: 100,
                    height: 120,
                    padding: 0,
                  }}
                />
              </a>
              <a href="/product">
                <Card.Title>PRODUCT</Card.Title>
              </a>
            </Card>
          </CardDeck>
        </div>
        <div
          style={{
            margin: 50,
          }}
        >
          <CardDeck>
            <Card
              style={{
                alignItems: "center",
                borderColor: "#fff",
              }}
            >
              <a href="/category">
                <Card.Img
                  src={require("../../assets/list.png")}
                  style={{
                    width: 100,
                    height: 120,
                    padding: 0,
                  }}
                />
              </a>
              <a href="/category">
                <Card.Title>CATEGORY</Card.Title>
              </a>
            </Card>
            <Card
              style={{
                alignItems: "center",
                borderColor: "#fff",
              }}
            >
              <a href="/history">
                <Card.Img
                  src={require("../../assets/clock.png")}
                  style={{
                    width: 100,
                    height: 120,
                    padding: 0,
                  }}
                />
              </a>
              <a href="/history">
                <Card.Title>HISTORY</Card.Title>
              </a>
            </Card>
          </CardDeck>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Home);
