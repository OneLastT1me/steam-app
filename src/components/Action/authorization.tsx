import useLogin from "../../hooks/useLogin";
import useLogout from "../../hooks/useLogout";

const Authorization = () =>{

    const { data: user} = useLogin();
  const { mutate } = useLogout();
  
  const handleLogin = () => {
    window.location.href = 'http://localhost:5009/auth/steam';
  };
  const handleLogout = () => {
    mutate();
  };

    return (
        <div>
        { user ? (
            <div>
                <p>{user.displayName}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <div>
                <button onClick={handleLogin} className="text-[#b8b6b4] leading-[14px] text-[12px]">login</button>
            </div>
        )}
      </div>
    )
}

export default Authorization