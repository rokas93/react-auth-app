import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
// Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading ...</p>}>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/account' element={<AccountPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
