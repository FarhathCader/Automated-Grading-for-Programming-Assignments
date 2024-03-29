import React, { useEffect, useRef, useState } from "react";
import LecturerSidebar from "../../Sections/SidebarLecturer";
import Header from "../../Sections/Header";
import Logo from "../../assets/Images/client.jpg";
import { useNavigate } from "react-router-dom";
import EditLectureProfile from "./EditLecturerProfile";
import axios from "axios";
import { useSelector } from "react-redux";
axios.defaults.withCredentials = true;

const LecturerProfile = () => {


  const user  = useSelector(state => state.user);
  const [editProfile, setEditProfile] = useState(false);
  const [lecturer,setLecturer] = useState(null);


  useEffect(() => {
    const fetchLecturer = async () => {
      try{
        if(user._id === undefined) return;
        const res = user && await axios.get(`http://localhost:4000/api/lecturer/${user._id}`);
        const data = res && (await res.data);
        if (data) setLecturer(data);
      }
      catch(err){
        console.log("error",err.message)
      }
  
    };
    fetchLecturer();
  }, [user,editProfile]);

  const handleProfile = () => {
    setEditProfile(true);
  };

  const cancel = () => {
    setEditProfile(false);
  };

  return (
    <main className="w-full h-screen flex justify-between items-start">
      <LecturerSidebar />
      <div className="w-4/5 grow bg-white h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
        <Header bgColor="fuchsia" />

        {editProfile ? (
          <EditLectureProfile cancel={cancel} lecturer={lecturer} />
        ) : (
          <div className="relative max-w-md mx-auto md:max-w-2xl mt-20 min-w-0 break-words bg-fuchsia-900 w-full mb-6 shadow-lg rounded-xl">
          <div className="px-6">
            <div className="flex-grow flex flex-col items-center justify-start">
              <div className="w-full flex justify-center mt-4">
                <div className="relative rounded-full overflow-hidden">
                  <img
                    src={Logo}
                    className="shadow-xl rounded-full align-middle border-none object-cover w-32 h-32"
                    alt="Lecturer Profile"
                  />
                </div>
              </div>
              <div className="w-full text-center mt-10">
                <div className="flex justify-center lg:pt-4  pb-0">
                  <div className="w-full text-center mt-2">
                    <div className="flex justify-center lg:pt-4 pb-0">
                      <div className="w-full lg:w-1/2">
                        <div className="bg-fuchsia-100 p-8 rounded-lg mb-20 shadow-fuchsia-700">
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
                            {lecturer && 
                            <p className="text-fuchsia-800 text-lg">{lecturer.username}</p>
                          }
                          </div>
                          <div className="flex items-center mb-6">
                            <label
                              className="block text-fuchsia-700 text-sm font-bold mr-2"
                              htmlFor="email"
                            >
                              Email:
                            </label>
                           {lecturer && <p className="text-fuchsia-800 text-lg">
                              {lecturer.email}
                            </p>} 
                          </div>
                          <div className="text-center">
                            <button onClick={handleProfile} className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded">
                              Edit Profile
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
        </div>
        )}
  
      </div>
    </main>
  );
};

export default LecturerProfile;
