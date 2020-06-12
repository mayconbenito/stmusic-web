import React, { useState, useLayoutEffect } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
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
    .email('login.invalid_email_format')
    .required('login.email_is_required'),
  password: yup.string().required('login.password_is_required'),
});

function Login() {
  const { requestLogin } = LoginActions;
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const alert = useAlert();

  const { t } = useTranslation();
  const [warning, setWarning] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  useLayoutEffect(() => {
    if (login.error.length > 0) {
      alert.show(t(login.error));
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
          <Title>{t('login.title')}</Title>
          <InputGroup>
            <Input
              name="email"
              placeholder={t('login.email_input')}
              value={form.email}
              onChange={handleInputChange}
            />
            <InputMessage>{t(warning.email)}</InputMessage>
          </InputGroup>

          <InputGroup>
            <Input
              name="password"
              type="password"
              placeholder={t('login.password_input')}
              value={form.password}
              onChange={handleInputChange}
            />
            <InputMessage>{t(warning.password)}</InputMessage>
          </InputGroup>

          <Submit type="submit">
            {login.loading ? t('login.loading') : t('login.sign_in')}
          </Submit>

          <Button to="/sign-up">{t('login.sign_up_button')}</Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default Login;
