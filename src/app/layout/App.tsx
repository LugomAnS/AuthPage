import courseLogo from '/src/assets/react.png'
import LoginForm from '../../features/user/LoginForm'
import { useState } from 'react'
import './style.css'
import './media.css'

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      <img src={courseLogo} className="login-image" alt="React course" />
        {!isLogged ? (
          <LoginForm setLoggedIn={setIsLogged} />
        ) : (
          <div className='container'>
            <p className='text'>
              Вы успешно авторизировались!
            </p>
            <button
              className='btn-reset btn-default'
              onClick={() => setIsLogged(false)}>Выход</button>
          </div>
        )}

        {!isLogged ? (
          <div className='container'>
            <p className='text'>
              Для проверки авторизации следующие реквизиты <br></br>
              Логин: test@test.com <br></br>
              Пароль: Test123
            </p>
          </div>
        ) : null}
    </>
  )
}

export default App
