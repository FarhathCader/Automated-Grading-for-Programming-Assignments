// useFetchUser.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {authActions} from '../store';
import axios from 'axios';

axios.defaults.withCredentials = true;

let firstRender = true;

const useFetchUser = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchUser = async () => {

      console.log("fetching user")
      console.log("first render",firstRender)

   
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

   const refreshUser = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/user/refresh', { withCredentials: true });
        const data = res.data;
        if (data.user) {
          dispatch(authActions.login({ userType: `${data.user.usertype}`, user: data.user }));
        }
      } catch (err) {
        console.log("error is",err.response.data.error)
        dispatch(authActions.logout());
      }
    };

    if(firstRender){
      fetchUser();
      firstRender = false;
    }

  
    const intervalId = setInterval(() => {
      refreshUser();
      console.log("refreshing user")
    }, 1000*60*60);

    // Clear interval when component unmounts
    return () => clearInterval(intervalId);


   
    
  }, []);
};

export default useFetchUser;
