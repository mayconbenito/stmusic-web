import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import * as yup from 'yup';

import { Creators as LoginActions } from '../../store/ducks/login';

import {
  GlobalStyle, Container, Title, Logo, Form, Input, Submit, Button, WarningBox,
} from './styles';

import logo from '../../images/logo.svg'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Formato de email invalido')
    .required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

function Login() {
  const { requestLogin } = LoginActions;
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const alert = useAlert();

  const [warning, setWarning] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  useLayoutEffect(
    () => {
      if (login.error.length > 0) {
        alert.show(login.error);
      }
    },
    [login.error],
  );

  function handleInputChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const isValid = await schema.validate(form, { abortEarly: false });
      setWarning(false);
      dispatch(requestLogin(isValid));
    } catch (err) {
      err.inner
        .slice(0)
        .reverse()
        .forEach((error) => {
          setWarning({ ...error });
        });
    }
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Logo src={logo} />
          <Title>Entrar</Title>
          <Input
            warning={warning.path === 'email'}
            name="email"
            type="email"
            placeholder="Endereço de email"
            value={form.email}
            onChange={handleInputChange}
          />

          <Input
            warning={warning.path === 'password'}
            name="password"
            type="password"
            placeholder="Sua senha"
            value={form.password}
            onChange={handleInputChange}
          />

          <Submit type="submit">
            { login.loading ? 'Carregando...' : 'Entrar' }
          </Submit>

          <Button to="/sign-up">Cadastrar</Button>
          {warning && (
            <WarningBox>
              <span>{warning.message}</span>
            </WarningBox>
          )}
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default Login;
