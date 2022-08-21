import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../redux/actions/userActions';

const SignupPage = () => {
  // State
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const {
    loading,
    user: signedUpUser,
    error,
  } = useSelector((state) => state.signup);
  const { user: loggedUser } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // side effects
  useEffect(() => {
    if (signedUpUser || loggedUser) navigate('/account');
  }, [signedUpUser, loggedUser, navigate]);

  // custom functions
  const submitHandler = (e) => {
    e.preventDefault();

    if (user.password !== confirmPassword) {
      setMessage('Passwords do not match');

      setUser((prev) => ({ ...prev, password: '' }));
      setConfirmPassword('');
    } else {
      dispatch(signupUser(user));
    }
  };

  if (signedUpUser || loggedUser) {
    return null;
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <section>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor='name'>Name</label>
            <br />
            <input
              type='text'
              value={user.name}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
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
            <label htmlFor='confirm'>Confirm password</label>
            <br />
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <br />
            <input type='submit' value={'Signup'} />
          </div>
        </form>
        {message && <p>{message}</p>}
        {loading && <p>Loading ...</p>}
        {error && <p>{error}</p>}
      </section>
    </main>
  );
};

export default SignupPage;
