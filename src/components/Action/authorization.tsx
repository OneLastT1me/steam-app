import useLogin from "../../hooks/useLogin";
import useLogout from "../../hooks/useLogout";

const Authorizathion = () =>{

    const { data: user} = useLogin();
  const { mutate } = useLogout();
  
  const handleLogin = () => {
    window.location.href = 'http://localhost:5009/auth/steam';
  };
  const handleLogout = () => {
    mutate();
  };

    return (
        <>
        { user ? (
            <div>
                <p>{user.displayName}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <div>
                <button onClick={handleLogin} className="text-white">login</button>
            </div>
        )}
      </>
    )
}

export default Authorizathion