import { Navigate, useLocation } from 'react-router-dom';

export function CallbackView() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const token = params.get('token');

  if (token != null) {
    localStorage.setItem('session-token', token);
  }

  return <Navigate to="/auth" />;
}
