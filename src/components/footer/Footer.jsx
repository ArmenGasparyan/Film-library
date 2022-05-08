import React from "react";
import "./footer.scss";

import { Link } from "react-router-dom";
import bg from "../../assets/footer-bg.jpg";
import logo from "../../assets/FilmLogo.png";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo">
            <img src={logo} alt="logo" />
            <Link to="/" style={{ marginLeft: 5 }}>
              Filmster
            </Link>
          </div>
        </div>
        <div className="footer__content__menus">
          <Link to='/'><h2>Armen Gasparyan</h2></Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
