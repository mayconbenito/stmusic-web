import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import * as yup from 'yup';

import { requestSignIn } from '../../store/ducks/signIn';

import {
  GlobalStyle, Container, Title, Form, Input, Button, WarningBox,
} from './styles';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Formato de email invalido')
    .required('Campo email é obrigatório'),
  password: yup.string().required('Campo senha é obrigatório'),
});

function SignIn() {
  const dispatch = useDispatch();
  const signIn = useSelector(state => state.signIn);
  const alert = useAlert();

  const [warning, setWarning] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  useLayoutEffect(
    () => {
      if (signIn.error.length > 0) {
        alert.show(signIn.error);
      }
    },
    [signIn.error],
  );

  function handleInputChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit() {
    try {
      const isValid = await schema.validate(form, { abortEarly: false });
      setWarning(false);
      dispatch(requestSignIn(isValid));
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
        <Form>
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

          <Input
            onClick={handleSubmit}
            type="submit"
            value={signIn.loading ? 'Carregando...' : 'Entrar'}
          />

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

export default SignIn;
