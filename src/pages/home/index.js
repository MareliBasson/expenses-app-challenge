import React, { Component } from "react";
import PageTemplate from "components/page-template";
import "./home.css";

class HomePage extends Component {
  render() {
    return (
      <PageTemplate pageHead="Home Page">
        <p>Some text goes here</p>
      </PageTemplate>
    );
  }
}

export default HomePage;
