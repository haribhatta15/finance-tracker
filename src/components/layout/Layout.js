import React, { children } from "react";
import Container from "react-bootstrap/esm/Container";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />

      <Container className="main">{children}</Container>

      <Footer />
    </div>
  );
};

export default Layout;
