import './App.css'
import useUserLogin from './hooks/userLogin'
import useLogout from './hooks/userLogout'

function App() {
  const { data: user} = useUserLogin();
  const logoutMutation = useLogout();
  
  const handleLogin = () => {
    window.location.href = 'http://localhost:5009/auth/steam';
  };
  const handleLogout = () => {
    logoutMutation.mutate();
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
