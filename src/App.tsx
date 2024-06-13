import { useEffect, useState } from 'react';
import './App.css'

interface UserProfile {
  provider: string;
  _json: object;
  id: string;
  displayName: string;
  photos: { value: string }[];
  identifier: string;
}

function App() {

  const [user, setUser] = useState<UserProfile | null>(null);

  const handleLogin = () => {
    window.location.href = 'http://localhost:5009/auth/steam';
  };

  const handleLogout = () => {
    fetch('http://localhost:5009/logout', { credentials: 'include' })
      .then(() => {
        setUser(null);
        window.location.reload();
      });
  };

  useEffect(() => {
    fetch('http://localhost:5009/api/user', {
      credentials: 'include' 
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch user');
      })
      .then(data => {
        setUser(data.user);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, []);

  return (
      <div className="card">
        {user ? (
        <div>
          <p>{user.displayName}</p>
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
