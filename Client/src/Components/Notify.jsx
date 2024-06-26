import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBell } from "react-icons/fa";
import axios from 'axios';
import { backendUrl } from '../../config';
import { useSelector } from 'react-redux';

const socket = io(backendUrl); // Ensure this matches your server URL

const Notify = () => {

    const usertype = useSelector(state=>state.userType)

    const [totalUnread, setTotalUnread] = useState(0);

    useEffect(() => {
        socket.on('databaseChange', (change) => {
            fetchNotification(usertype);
            if(change.usertype === usertype){
                toast(change.message);

            }
        });

        return () => {
            socket.off('databaseChange');
        };
    }, []);

    useEffect(() => {
        fetchNotification(usertype);

          }, [usertype]);


    const fetchNotification = async (usertype) => {
        const response = await axios.get(`${backendUrl}/api/notification/unread`,{
            params: { usertype }
        }
        );
        const data = response.data;
        setTotalUnread(data.totalUnread);
    }

    return (
        <div className="App">

            <div className="relative inline-block mt-10">
      <FaBell className="text-2xl" />
      {totalUnread > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
          {totalUnread}
        </span>
      )}
      
    </div>

            
        </div>
    );
};

export default Notify;
