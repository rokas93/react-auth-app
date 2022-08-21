import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/actions/userActions';

const LoginPage = () => {
  // State
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const {
    loading,
    user: loggedUser,
    error,
  } = useSelector((state) => state.login);

  console.log(loggedUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // side effects
  useEffect(() => {
    if (loggedUser) navigate('/account');
  }, [loggedUser, navigate]);

  // custom functions
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(user));
  };

  if (loggedUser) {
    return null;
  }

  return (
    <main>
      <h1>Login page</h1>
      <section>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor='email'>Email</label>
            <br />
            <input
              type='email'
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <br />
            <input
              type='password'
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <div>
            <br />
            <input type='submit' value={'Log in'} />
          </div>
        </form>
        {loading && <p>Loading ...</p>}
        {error && <p>{error}</p>}
      </section>
    </main>
  );
};

export default LoginPage;
