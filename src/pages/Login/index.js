import React, { useState, useLayoutEffect } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../services/api';
import {
  GlobalStyle,
  Container,
  Logo,
  Form,
  Title,
  InputGroup,
  InputLabel,
  Input,
  InputMessage,
  Submit,
  FormFooter,
  Button,
} from './styles';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('login.invalid_email_format')
    .required('login.email_is_required'),
  password: yup.string().required('login.password_is_required'),
});

function Login({ history }) {
  const alert = useAlert();

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  useLayoutEffect(() => {
    if (error.length > 0) {
      alert.show(t(error));
    }
  }, [error]);

  function handleInputChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleLogin({ email, password }) {
    try {
      setLoading(true);
      const response = await api.post('/app/sessions', { email, password });

      setLoading(false);
      localStorage.setItem('@STMusic:token', response.data.jwt);
      history.push('/');
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setError(t('login.email_or_password_invalid'));
      }

      if (err.response.status === 500) {
        setError(t('commons.internal_server_error'));
      }
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const isValid = await schema.validate(form, { abortEarly: false });

      if (isValid) {
        setWarning(false);
        await handleLogin(form);
      }
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((validationError) => {
        validationErrors[validationError.path] = validationError.message;
      });

      setWarning(validationErrors);
    }
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <Logo width="270px" height="151.88px" />

        <Form onSubmit={handleSubmit}>
          <Title>{t('login.title')}</Title>
          <InputGroup>
            <InputLabel htmlFor="email">{t('login.email_input')}</InputLabel>
            <Input
              id="email"
              name="email"
              placeholder={t('login.email_input_placeholder')}
              value={form.email}
              onChange={handleInputChange}
            />
            <InputMessage>{t(warning.email)}</InputMessage>
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="password">
              {t('login.password_input')}
            </InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={t('login.password_input_placeholder')}
              value={form.password}
              onChange={handleInputChange}
            />
            <InputMessage>{t(warning.password)}</InputMessage>
          </InputGroup>

          <Submit type="submit">
            {loading ? (
              <LoadingSpinner loading size={14} />
            ) : (
              t('login.sign_in')
            )}
          </Submit>

          <FormFooter>
            <Button to="/sign-up">{t('login.sign_up_button')}</Button>
          </FormFooter>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default Login;
