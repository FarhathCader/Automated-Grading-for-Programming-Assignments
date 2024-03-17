// useFetchUser.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {authActions} from '../store';
import axios from 'axios';

axios.defaults.withCredentials = true;

const useFetchUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/user/user', { withCredentials: true });
        const data = res.data;
        if (data.user) {
          dispatch(authActions.login({ userType: `${data.user.usertype}`, user: data.user }));
          console.log("auth actions login")
        }
      } catch (err) {
        dispatch(authActions.logout());
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useFetchUser;
