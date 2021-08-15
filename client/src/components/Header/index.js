import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import classes from './style.module.css';
import * as actions from '../../_actions/userAction';

const Header = ({ auth, logoutUser }) => {
  const loginContent = () => {
    return [
      <li key="logout">
        <a onClick={() => logoutUser()}>Log out</a>
      </li>,
      <li key="github">
        <a href="https://github.com/chanyu1" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </li>,
    ];
  };

  const logoutContent = () => {
    return [
      <li key="login">
        <Link to="/login">Log in</Link>
      </li>,
      <li key="signup">
        <Link to="/signup">Sign up</Link>
      </li>,
    ];
  };

  return (
    <nav>
      <div className={`nav-wrapper ${classes.navWrapper}`}>
        <Link
          to={auth && auth.isAuth ? '/postcards' : '/'}
          className={`left brand-logo ${classes.logo}`}
        >
          KOU
        </Link>
        <ul className="right">
          {auth && auth.isAuth ? loginContent() : logoutContent()}
        </ul>
      </div>
    </nav>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(withRouter(Header));
