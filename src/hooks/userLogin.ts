import { useQuery } from 'react-query';
import axios from 'axios';

const userLogin = async () => {
  const response = await axios.get('http://localhost:5009/api/user', {
    withCredentials: true
  });
  
  return response.data.user;
};

const useUserLogin= () => {
  return useQuery('user', userLogin, {
    refetchOnWindowFocus: false 
  });
};

export default useUserLogin;