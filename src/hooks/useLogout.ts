import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const logout = async () => {
  const response = await axios.post('http://localhost:5009/api/logout', {}, {
    withCredentials: true
  });

  return response.data.user;
};

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: () => {
      queryClient.removeQueries('user');
    }
  });
};
export default useLogout;