import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import * as actions from '../../_actions/userAction';
import RegisterFormTexts from '../../commons/RegisterFormTexts';
import formField from '../UI/molecules/formField';

const RegisterForm = ({ registerUser, history }) => {
  const renderFields = () => {
    return _.map(RegisterFormTexts, ({ label, name, type }) => {
      return (
        <Field
          label={label}
          name={name}
          type={type}
          key={name}
          component={formField}
        />
      );
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    event.target.password.value === event.target.confirmPassword.value
      ? registerUser(
          {
            email: event.target.email.value,
            password: event.target.password.value,
            username: event.target.username.value,
          },
          history,
        )
      : alert('Passwords do not match.');
  };

  return (
    <div className="row" style={{ margin: '10vh 0' }}>
      <form className="col s6 offset-s3" onSubmit={onSubmitHandler}>
        {renderFields()}
        <Link to="/" className="red btn-flat white-text">
          Cancel
        </Link>
        <button
          type="submit"
          className="yellow darken-3 btn-flat right white-text"
        >
          Sign up
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
};

const validate = (values) => {
  const errors = {};
  _.each(RegisterFormTexts, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });
  return errors;
};

export default reduxForm({
  validate,
  form: 'registerForm',
})(connect(null, actions)(withRouter(RegisterForm)));