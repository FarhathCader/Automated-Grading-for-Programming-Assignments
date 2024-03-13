import React from "react";
import LecturerSidebar from "../Sections/LecturerSidebar";
import Header from "../Sections/Header";
import Feed from "../Sections/Feed";
import Logo from "../assets/Images/client.jpg";

const EditLectureProfile = () => {
  return (
    <main className="w-full bg-blue-200 h-screen flex justify-between items-start">
      <LecturerSidebar />
      <div className="w-4/5 grow flex flex-col">
        <Header />
        <div className="relative max-w-md mx-auto md:max-w-2xl mt-40 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
          <div className="px-6">
            <div className="flex grow flex-wrap justify-center">
              <div className="w-full flex justify-center">
                <div className="relative">
                  <img
                    src={Logo}
                    className="rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                  />
                </div>
              </div>
              <div className="w-full text-center mt-20">
                <div className="flex justify-center lg:pt-4  pb-0">
                  <div className="w-full text-center mt-2">
                    <div className="flex justify-center lg:pt-4 pb-0">
                      <div className="w-full lg:w-1/2">
                        <div className="bg-slate-100 p-8 rounded-lg mb-20 shadow-gray-700">
                          <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Your Profile
                          </h2>
                          <div className="flex items-center mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mr-2"
                              htmlFor="name"
                            >
                              Name:
                            </label>
                            <input
                              type="text"
                              className="border-b border-gray-500 rounded text-gray-800 text-lg focus:outline-none px-2 py-1"
                              // defaultValue="John Doe"
                              onChange={(e) => console.log(e.target.value)}
                            />
                          </div>
                          <div className="flex items-center mb-6">
                            <label
                              className="block text-gray-700 text-sm font-bold mr-2"
                              htmlFor="email"
                            >
                              Email:
                            </label>
                            <input
                              type="email"
                              className="border-b border-gray-500 rounded text-gray-800 text-lg focus:outline-none px-2 py-1"
                              // defaultValue="johndoe@example.com"
                              onChange={(e) => console.log(e.target.value)}
                            />
                          </div>

                          <div className="flex justify-center text-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 mr-5">
                              Cancel
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">
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
        </div>
      </div>
    </main>
  );
};

export default EditLectureProfile;
