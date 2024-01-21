import Logo from "@/components/UI/logo";
import React from "react";
import { RiMovie2Line } from "react-icons/ri";
const Header = () => {
  return (
    <>
      <header>
        <div>
          <Logo className="flex items-center gap-1" href="/">
            <p className="text-[red] text-4xl">
              <RiMovie2Line />
            </p>
            <h2 className="">
              <span className="text-2xl text-white uppercase">Net</span>
              <span className="text-[red] text-xl">Film</span>
            </h2>
          </Logo>
        </div>
        <div>Search</div>
        <div>nav</div>
      </header>
    </>
  );
};

export default Header;
