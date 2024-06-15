import './App.css'
import useLogin from './hooks/useLogin';
import useLogout from './hooks/useLogout'

function App() {
  const { data: user} = useLogin();
  const { mutate } = useLogout();
  
  const handleLogin = () => {
    window.location.href = 'http://localhost:5009/auth/steam';
  };
  const handleLogout = () => {
    mutate();
  };

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
