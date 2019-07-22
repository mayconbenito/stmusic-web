import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import * as yup from 'yup';

import { Creators as SignUpActions } from '../../store/ducks/signUp';

import {
  GlobalStyle, Container, Title, Form, Input, Submit, Button, WarningBox,
} from './styles';

const schema = yup.object().shape({
  name: yup.string().required('Campo nome é obrigatório'),
  email: yup
    .string()
    .email('Formato de email invalido')
    .required('Campo email é obrigatório'),
  password: yup.string().required('Campo senha é obrigatório'),
});

function SignUp() {
  const {
    requestSignUp,
  } = SignUpActions;
  const dispatch = useDispatch();
  const signUp = useSelector(state => state.signUp);
  const alert = useAlert();

  const [warning, setWarning] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  useLayoutEffect(
    () => {
      if (signUp.error.length > 0) {
        alert.show(signUp.error);
      }
    },
    [signUp.error],
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
      dispatch(requestSignUp(isValid));
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
          <Title>Registrar</Title>
          <Input
            warning={warning.path === 'name'}
            name="name"
            type="text"
            placeholder="Seu nome completo"
            value={form.name}
            onChange={handleInputChange}
          />

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
            {signUp.loading ? 'Carregando...' : 'Cadastrar'}
          </Submit>

          <Button to="/login">Fazer Login</Button>
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

export default SignUp;
