import React from "react";
import client from "../assets/Images/client.jpg";
import LogoImage from "../assets/Images/logo.jpg";

const Header = () => {
  return (
    <section className="w-full bg-blue-300 lg:h-20 h-fit flex lg:flex-row flex-col justify-between items-center p-4 rounded-xl lg:gap-2 gap-4">
      <div>
        <img className="w-12 h-12 " src={LogoImage} alt="logo" />
      </div>
      <div className="flex justify-between items-center gap-18">
        <div
          id="client-info"
          className="flex justify-center items-center gap-4"
        >
          <div className="flex flex-col justify-center items-center -mb-1 gap-2">
            <h1 className="text-lg font-semibold text-blue-900 ">Rifab Ahamed</h1>
          </div>
          <img
            src={client}
            alt="client-image"
            className="rounded-full w-12 h-12"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
