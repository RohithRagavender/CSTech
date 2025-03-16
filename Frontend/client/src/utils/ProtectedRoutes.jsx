import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;


// 1. Purpose:
// => ProtectedRoute ensures that only authenticated users can access certain pages.

// 2. Token Verification:
// => It checks if the token exists in localStorage — meaning the user is logged in.

// 3. Conditional Rendering:
// => If the token exists, it renders the children (protected component).

// 4. Redirect:
// => If the token is missing, it redirects the user to the login page (/).

// 5. Clean and Secure:
// => Keeps routes secure and ensures that unauthorized users are redirected automatically.