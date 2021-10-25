import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';

import * as actions from '../../_actions/userAction';
import loginFieldData from './data/fieldData';
import renderField from '../renderField';
import SubmitBtn from '../../components/UI/Btn';

const FormWrapperDiv = styled.div`
  margin: 25vh 0;
`;

const LoginForm = ({ loginUser }) => {
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!event.target.email.value || !event.target.password.value) {
      return alert('Provide a whole field.');
    }

    loginUser({
      email: event.target.email.value,
      password: event.target.password.value,
    });
  };

  return (
    <FormWrapperDiv className="row">
      <form className="col s6 offset-s3" onSubmit={onSubmitHandler}>
        {renderField(loginFieldData)}
        <Link to="/signup" className="white-text btn-flat yellow darken-3">
          Sign up
        </Link>
        <SubmitBtn btnColor="teal" icon="done">
          Log in
        </SubmitBtn>
      </form>
    </FormWrapperDiv>
  );
};

const validate = (values) => {
  const errors = {};
  _.each(loginFieldData, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });
  return errors;
};

export default reduxForm({
  validate,
  form: 'loginForm',
})(connect(null, actions)(withRouter(LoginForm)));
