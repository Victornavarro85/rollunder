import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import LanguageUpdate from './LanguageUpdate';

const Logo = () => (
  <a className="navbar-brand" href="/">
    <i className="fas fa-dice-d20" />
    {' Etheroll'}
  </a>
);

const HamburgerBtn = () => (
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarCollapse"
    aria-controls="navbarCollapse"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon" />
  </button>
);

const NavSections = () => (
  <div className="collapse navbar-collapse" id="navbarCollapse">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" exact activeClassName="active">
          <i className="fas fa-home" />
          &nbsp;
          <FormattedMessage
            id="headers.navsections.navlink.home"
            defaultMessage="Home"
          />
          <span className="sr-only">(current)</span>
        </NavLink>
      </li>

      <LanguageUpdate />
    </ul>
  </div>
);

const Headers = () => (
  <header>
    <div className="container centered">
      <img className="logo" src="logo-rollunder.png"></img>
    </div>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Logo />
      <HamburgerBtn />
      <NavSections />
    </nav>
  </header>
);

export default Headers;
