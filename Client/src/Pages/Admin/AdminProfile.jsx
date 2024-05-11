import React from 'react';
import Header from "../../Sections/Header";
import Logo from "../../assets/Images/client.jpg";
import SidebarAdmin from '../../Sections/SidebarAdmin';


const AdminProfile = () => {
  return (
    <main className="w-full h-screen flex justify-between items-start">
      <SidebarAdmin />
      <div className="w-4/5 grow bg-green-100 h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
        <Header bgColor="green" />
        <div className="relative max-w-md mx-auto md:max-w-2xl mt-20 min-w-0 break-words bg-green-900 w-full mb-6 shadow-lg rounded-xl">
          <div className="px-6">
            <div className="flex-grow flex flex-col items-center justify-start">
              <div className="w-full flex justify-center mt-4">
                <div className="relative rounded-full overflow-hidden">
                  <img
                    src={Logo}
                    className="shadow-xl rounded-full align-middle border-none object-cover w-32 h-32"
                    alt="Admin Profile"
                  />
                </div>
              </div>
              <div className="w-full text-center mt-10">
                <div className="flex justify-center lg:pt-4  pb-0">
                  <div className="w-full text-center mt-2">
                    <div className="flex justify-center lg:pt-4 pb-0">
                      <div className="w-full lg:w-3/4"> {/* Adjusted card width to lg:w-3/4 */}
                        <div className="bg-green-100 p-8 rounded-lg mb-20 shadow-green-700">
                          <h2 className="text-2xl font-bold text-green-800 mb-6">
                            Your Profile
                          </h2>
                          <div className="flex items-center mb-4">
                            <label
                              className="block text-green-700 text-sm font-bold mr-2"
                              htmlFor="name"
                            >
                              Name:
                            </label>
                            <p className="text-green-800 text-lg">Mohammed Musharraf</p>
                          </div>
                          <div className="flex items-center mb-4">
                            <label
                              className="block text-green-700 text-sm font-bold mr-2"
                              htmlFor="email"
                            >
                              Email:
                            </label>
                            <p className="text-green-800 text-lg">
                              mhdmusharraf.edu@gmail.com
                            </p>
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
}

export default AdminProfile;
