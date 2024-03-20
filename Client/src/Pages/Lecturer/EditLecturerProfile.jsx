import React, { useState } from "react";
import Header from "../../Sections/Header";
import Feed from "../../Sections/Feed";
import Logo from "../../assets/Images/client.jpg";
import SidebarLecturer from "../../Sections/SidebarLecturer";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer,toast } from 'react-toastify';
import axios from "axios";
axios.defaults.withCredentials = true;

const EditLectureProfile = (props) => {

  const [username,setUsername] = useState(props.lecturer.username);
  const [email,setEmail] = useState(props.lecturer.email);

  const save = async () => {

    try{
      const res  = await axios.put(`http://localhost:4000/api/lecturer/${props.lecturer._id}`,{
        username,
        email,
      });
  
      const data = await res.data;
  
      if(res.status === 200){
  
        setTimeout(() => {
          props.cancel();
          }
          , 1000);
          toast.success('Profile Updated Successfully');
          window.location.reload();
         

      }


    }
    catch(err){
      // toast.error(err.response.data.error);
      const error = await err.response.data.error;
      toast.error(error);
      // setTimeout(() => {
      //   props.cancel();
      //   }
      //   , 1000);
    }



  }

  return (
    <div className="relative max-w-md mx-auto md:max-w-2xl mt-20 min-w-0 break-words bg-fuchsia-900 w-full mb-6 shadow-lg rounded-xl">
    <div className="px-6">
      <div className="flex-grow flex flex-col items-center justify-start">
        <div className="w-full flex justify-center mt-4">
          <div className="relative rounded-full overflow-hidden">
            <img
              src={Logo}
              className="shadow-xl rounded-full align-middle border-none object-cover w-32 h-32"
              alt="Lecturer Edit Profile"
            />
          </div>
        </div>
        <div className="w-full text-center mt-10">
          <div className="flex justify-center lg:pt-4  pb-0">
            <div className="w-full text-center mt-2">
              <div className="flex justify-center lg:pt-4 pb-0">
                <div className="w-full lg:w-1/2">
                  <div className="bg-slate-100 p-8 rounded-lg mb-20 shadow-fuchsia-700">
                    <h2 className="text-2xl font-bold text-fuchsia-800 mb-6">
                      Your Profile
                    </h2>
                    <div className="flex items-center mb-4">
                      <label
                        className="block text-fuchsia-700 text-sm font-bold mr-2"
                        htmlFor="name"
                      >
                        Name:
                      </label>
                      <input
                        type="text"
                        className="border-b border-fuchsia-500 rounded text-fuchsia-800 text-lg focus:outline-none px-2 py-1"
                        // defaultValue="John Doe"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center mb-6">
                      <label
                        className="block text-fuchsia-700 text-sm font-bold mr-2"
                        htmlFor="email"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        className="border-b border-fuchsia-500 rounded text-fuchsia-800 text-lg focus:outline-none px-2 py-1"
                        // defaultValue="johndoe@example.com"
                        value={email}

                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-center text-center">
                      <button onClick={props.cancel} className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded ml-10 mr-5">
                        Cancel
                      </button>
                      <button  onClick={save} className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded ml-5">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
  </div>
  );
};

export default EditLectureProfile;
