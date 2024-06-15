import { useQuery } from 'react-query';
import axios from 'axios';


const login = async () => {
  const response = await axios.get('http://localhost:5009/api/user', {
    withCredentials: true
  });
  
  return response.data.user;
};

const useLogin= () => {
  return useQuery('user', login, {
    refetchOnWindowFocus: false 
  });
};

export default useLogin;