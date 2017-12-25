import React from "react";
import {Row, Col} from "react-bootstrap";
import HomeNavbar from "./HomeNavbar";
import LoginSignUpWidget from "./LoginSignUpWidget";
import scrollTo from 'react-scroll-to-component';
import "./home.scss";


export default class HomePage extends React.Component {

  constructor() {
    super();
    this.scrollToFeatures = this.scrollToFeatures.bind(this);
    this.scrollToContactUs = this.scrollToContactUs.bind(this);
  }

  scrollToFeatures() {
    scrollTo(this.featuresSection, {
      ease: "inSine"
    });
  }

  scrollToContactUs() {
    scrollTo(this.contactUsSection, {
      ease: "inSine"
    });
  }

  render() {
    return (
      <div className="home-page">
        <HomeNavbar onFeaturesClick={this.scrollToFeatures} onContactUsClick={this.scrollToContactUs}/>
        <div className="main-content-container">
          <div className="section-1">
            <div className="image-wrapper"><img src="../../static/home.png" alt="No image" width="100%"/></div>
            <div className="section-content">
              <Row>
                <Col md={5} className="column">
                  <LoginSignUpWidget actions={this.props.actions}/>
                </Col>
                <Col md={7} className="column">
                  <div className="introduction">
                    <div className="title"> Lexicon </div>
                    <div className="text">
                      Don't miss important moments in your life. We will help you make these moments into memories.
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="features-section" ref={(s) => this.featuresSection=s} > Features </div>
          <div className="contact-us-section" ref={(s) => this.contactUsSection=s}> Contact Us </div>
        </div>
      </div>
    );
  }
}

