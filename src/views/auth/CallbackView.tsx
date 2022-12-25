import { IOSTokenStorage } from 'api/core/plugins';
import { Navigate, useLocation } from 'react-router-dom';
import { client, Keys } from 'stores';

export function CallbackView() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const token = params.get('token');

  if (token != null) {
    localStorage.setItem(IOSTokenStorage, token);
    client.invalidateQueries(Keys.login);
  }

  return <Navigate to="/home" />;
}
