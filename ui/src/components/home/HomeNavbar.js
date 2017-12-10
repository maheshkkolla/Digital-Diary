import React from "react";
import {Navbar} from "react-bootstrap";
import "./navbar.scss";

export default class HomeNavbar extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="navigation-bar" fixedTop>
          <Navbar.Header className="header">
            <Navbar.Brand className="brand">
              <a href="#"><img src="../../static/logo.png" alt="Lexicon"/></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse className="navbar-menu">
            <Navbar.Text onClick={this.props.onFeaturesClick}>
              <Navbar.Link>Features</Navbar.Link>
            </Navbar.Text>
            <Navbar.Text onClick={this.props.onContactUsClick}>
              <Navbar.Link>Contact Us</Navbar.Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Navbar className="navigation-bar">
          <img src="../../static/logo.png" alt="Lexicon"/>
        </Navbar>
      </div>
    );
  }
}