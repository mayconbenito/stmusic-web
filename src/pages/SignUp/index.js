import React, { useState, useLayoutEffect } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../services/api';
import { InputLabel, FormFooter } from '../Login/styles';
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
  name: yup.string().required('signup.name_is_required'),
  email: yup
    .string()
    .email('signup.invalid_email_format')
    .required('signup.email_is_required'),
  password: yup.string().required('signup.password_is_required'),
});

function SignUp({ history }) {
  const alert = useAlert();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

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

  async function handleSignup({ name, email, password }) {
    try {
      setLoading(true);
      const response = await api.post('/app/register', {
        name,
        email,
        password,
      });

      setLoading(false);
      localStorage.setItem('@STMusic:token', response.data.jwt);
      history.push('/');
    } catch (err) {
      setLoading(false);
      if (err.response.data.error.code === 'EmailAlreadyUsed') {
        setError(t('signup.email_already_used'));
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
        await handleSignup(form);
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
          <Title>{t('signup.title')}</Title>
          <InputGroup>
            <InputLabel htmlFor="name">{t('signup.name_input')}</InputLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder={t('signup.name_input_placeholder')}
              value={form.name}
              onChange={handleInputChange}
            />
            <InputMessage>{t(warning.name)}</InputMessage>
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="email">{t('signup.email_input')}</InputLabel>
            <Input
              name="email"
              placeholder={t('signup.email_input_placeholder')}
              value={form.email}
              onChange={handleInputChange}
            />
            <InputMessage>{t(warning.email)}</InputMessage>
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="email">
              {t('signup.password_input')}
            </InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={t('signup.password_input_placeholder')}
              value={form.password}
              onChange={handleInputChange}
            />
            <InputMessage>{t(warning.password)}</InputMessage>
          </InputGroup>

          <Submit type="submit">
            {loading ? (
              <LoadingSpinner loading size={14} />
            ) : (
              t('signup.sign_up')
            )}
          </Submit>

          <FormFooter>
            <Button to="/login">{t('signup.sign_in_button')}</Button>
          </FormFooter>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default SignUp;
