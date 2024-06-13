import { useEffect, useState } from 'react';
import './App.css'
import { useAuth } from 'react-oidc-context';


function App() {
  const auth = useAuth();
  const [user, setUser] = useState(null);

  console.log(auth?.user)
  const handleLogin = () => {
    window.location.href = 'http://localhost:5009/auth/steam';
  };

  const handleLogout = () => {
    fetch('http://localhost:5009/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(() => window.location.reload());
  };

  useEffect(() => {
    fetch('http://localhost:5009/api/user', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {
        setUser(null);
      });
      console.log(user)
  }, []);

  return (
      <div className="card">
        {auth.isAuthenticated ? (
        <div>
          <p>Authenticated as {user}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Not authenticated</p>
          <button onClick={handleLogin}>Login with Steam</button>
        </div>
      )}

      </div>

  )
}

export default App
