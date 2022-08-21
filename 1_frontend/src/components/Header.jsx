import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { user } = useSelector((state) => state.login);

  console.log('user:', user);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>

          {!user && (
            <>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/signup'>Sign Up</Link>
              </li>
            </>
          )}

          {user && (
            <li>
              <Link to='/account'>Account</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
