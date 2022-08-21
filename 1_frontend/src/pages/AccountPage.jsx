import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, logoutUser } from '../redux/actions/userActions';

const AccountPage = () => {
  const { user: loggedUser } = useSelector((state) => state.login);

  const {
    loading,
    user: userDetails,
    error,
  } = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) {
      navigate('/login');
    } else {
      dispatch(getUserDetails());
    }
  }, [loggedUser, navigate, dispatch]);

  // Custom functions
  const handeClick = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  if (!loggedUser) {
    return null;
  }

  return (
    <main>
      <h1>AccountPage</h1>
      {loading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          <li>{userDetails?.name}</li>
          <li>{userDetails?.email}</li>
          <li>
            <button onClick={handeClick}>Logout</button>
          </li>
        </ul>
      )}
    </main>
  );
};

export default AccountPage;
