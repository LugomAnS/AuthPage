import { Form, Formik } from "formik";
import { UserLoginValues } from "../../app/models/user";
import agent from "../../app/api/agent";
import { useState } from "react";
import * as Yup from 'yup'
import InputField from "./InputField";
import '/src/app/layout/style.css'

interface Props {
  setLoggedIn: (value: boolean) => void;
}

export default function LoginForm({setLoggedIn}: Props) {
  const userValues:  UserLoginValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Введите корректный email').required('Заполните email'),
    password: Yup.string().required('Введите пароль')
  })

  const [serverError, setServerError] = useState<string | null>(null);

  function handleLoginSubmit(values: UserLoginValues, setSubmiting: (value: boolean) => void) {
    setServerError(null);
    agent.Account.login(values).then(() => {
      setSubmiting(false);
      setLoggedIn(true);
    }).catch(() => {
      setSubmiting(false);
      setServerError("Неверный логин или пароль");
    })
  }

  return (
    <div className="container">
    <Formik
      initialValues={userValues}
      validationSchema={validationSchema}
      onSubmit={(values, {setSubmitting}) => {handleLoginSubmit(values, setSubmitting)}}
    >
      {({handleSubmit, isSubmitting, isValid, dirty}) =>
        <Form
          className="form"
          onSubmit={handleSubmit}
        >
          <label className="form__error">{serverError}</label>
          <InputField name="email" placeholder="Почта*" />
          <InputField name="password" placeholder="Пароль*" type="password" />
          <button className="btn-reset btn-default"
            type='submit' disabled={isSubmitting || !isValid || !dirty}>
              {isSubmitting ? (
                <div className="spinner" />
              ) : ("Войти")}
          </button>
          <a href="#" onClick={() => alert("Не реализовано")}>Забыли пароль?</a>
        </Form>}
    </Formik>
    </div>
  )
}
