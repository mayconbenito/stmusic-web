import React, { useState, useLayoutEffect } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import logo from '../../assets/images/logo.svg';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Creators as SignUpActions } from '../../store/ducks/signUp';
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

function SignUp() {
  const { requestSignUp } = SignUpActions;
  const dispatch = useDispatch();
  const signUp = useSelector((state) => state.signUp);
  const alert = useAlert();
  const { t } = useTranslation();

  const [warning, setWarning] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  useLayoutEffect(() => {
    if (signUp.error.length > 0) {
      alert.show(t(signUp.error));
    }
  }, [signUp.error]);

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
        dispatch(requestSignUp(isValid));
      }
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });

      setWarning(validationErrors);
    }
  }

  return (
    <React.Fragment>
      <GlobalStyle />

      <Container>
        <Logo src={logo} />
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
            {signUp.loading ? (
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
