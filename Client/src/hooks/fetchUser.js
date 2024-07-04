// useFetchUser.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {authActions} from '../store';
import axios from 'axios';
import { backendUrl } from '../../config';

import { toast } from 'react-toastify';
import io from 'socket.io-client';

const socket = io(backendUrl);


axios.defaults.withCredentials = true;

let firstRender = true;

const useFetchUser = () => {
  const dispatch = useDispatch();
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null); // Add error state
  const [loading, setLoading] = useState(true); 
   
  const fetchUser = async () => {

    console.log("fetching user")
   
    try {

      const res = await axios.get(`${backendUrl}/api/user/user`, { withCredentials: true });
      const data = res.data;
      if (data.user) {
        dispatch(authActions.login({ userType: `${data.user.usertype}`, user: data.user }));
        setCurrentUser(data.user);
      }
    } catch (err) {

    if(err.message === 'Network Error' || err.response.status === 500){
      setError(err);

    }
    else{
      dispatch(authActions.logout())

    }
    }
    finally{
      setLoading(false);
    }

};

const refreshUser = async () => {
if(!isLoggedin)return;
  try {
    console.log("refreshing")
    const res = await axios.get(`${backendUrl}/api/user/refresh`, { withCredentials: true });
    const data = res.data;
    if (data.user) {
      setCurrentUser(data.user);
      //dispatch(authActions.login({ userType: `${data.user.usertype}`, user: data.user }));
    }
  } catch (err) {
    if(err.message === 'Network Error' || err.response.status === 500){
      setError(err);

    }
    else{
      dispatch(authActions.logout())

    }
    
  }
  finally{
    setLoading(false)

  }

};
  useEffect(() => {
   

    if(firstRender){
      fetchUser();
      firstRender = false;
    }

  
    const intervalId = setInterval(() => {
      refreshUser();
    }, 1000*20);

    // Clear interval when component unmounts
    return () => clearInterval(intervalId);


   
    
  }, [dispatch,isLoggedin]);

  useEffect(() => {
    if(!currentUser)return;
    socket.on('userdeleted', (data) => {
      if(data === currentUser._id){
        toast.error('Your account has been deleted');
        fetchUser();
      }
    });
    return () => {
      socket.off('userdeleted');
    };

  },[currentUser]);



  return { loading, error };
};

export default useFetchUser;
