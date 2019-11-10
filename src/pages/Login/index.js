import React, { useState, useLayoutEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import logo from '../../assets/images/logo.svg';
import { Creators as LoginActions } from '../../store/ducks/login';
import {
  GlobalStyle,
  Container,
  Title,
  Logo,
  Form,
  InputGroup,
  Input,
  InputMessage,
  Submit,
  Button,
} from './styles';

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

  useLayoutEffect(() => {
    if (login.error.length > 0) {
      alert.show(login.error);
    }
  }, [login.error]);

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
      if (isValid) {
        setWarning(false);
        dispatch(requestLogin(isValid));
      }
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach(error => {
        validationErrors[error.path] = error.message;
      });
      setWarning(validationErrors);
    }
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Logo src={logo} />
          <Title>Fazer Login</Title>
          <InputGroup>
            <Input
              name="email"
              placeholder="Endereço de email"
              value={form.email}
              onChange={handleInputChange}
            />
            <InputMessage>{warning.email}</InputMessage>
          </InputGroup>

          <InputGroup>
            <Input
              name="password"
              type="password"
              placeholder="Sua senha"
              value={form.password}
              onChange={handleInputChange}
            />
            <InputMessage>{warning.password}</InputMessage>
          </InputGroup>

          <Submit type="submit">
            {login.loading ? 'Carregando...' : 'Entrar'}
          </Submit>

          <Button to="/sign-up">Cadastrar</Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default Login;
