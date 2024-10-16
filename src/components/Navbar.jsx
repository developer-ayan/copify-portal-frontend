import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks, studentNavLink, teacherNavLink } from "../constants/data";
import { VscClose } from "react-icons/vsc";
import Logo from "../assets/images/228743894_131464025787268_5332280447651671160_n.jpg";
import { AppContext } from "../context";
import { GoHomeFill } from "react-icons/go";

const Navbar = ({ toggle, setToggle }) => {
  const { user } = useContext(AppContext);
  const filteredNavLinks = (userRole) => {
    if (user?.role_id == 1) {
      // Show these items when user role is 1
      return navLinks.filter((link) => [1, 2, 4, 5, 6, 8, 9].includes(link.id));
    } else if (user?.role_id == 2) {
      // Show these items when user role is 2
      return navLinks.filter((link) => [3, 7].includes(link.id));
    } else if (user?.role_id == 3) {
      // const filter = navLinks.filter((link) => [1].includes(link.id));
      const filter = studentNavLink;

      // const filterInner = filter.flatMap((item) =>
      //   item?.items?.filter((e) => e.path === "/dashboard")
      // );
      // filterInner[0].icon = (
      //   <GoHomeFill className="-ml-0.5 text-lg" title="Student Dashboard" />
      // );
      // Show these items when user role is 2
      return filter;
    } else if (user?.role_id == 4) {
      const filter = teacherNavLink;
      // Show these items when user role is 2
      return filter;
    } else {
      // Default case if no specific user role matches
      return [];
    }
  };
  return (
    <>
      <nav
        id="navbar"
        className={`flex flex-col justify-between h-screen overflow-y-auto absolute md:static top-0 left-0 border-r bg-white ${
          toggle ? "" : "-translate-x-full md:-translate-x-0"
        } max-md:transition-all max-md:duration-300 w-full max-w-[200px] px-5 pb-7 md:py-8 z-[3]`}
      >
        <div>
          {/* close btn (inside navbar) */}
          <button
            onClick={() => setToggle(false)}
            className="mt-3 text-lg md:hidden"
          >
            <VscClose />
          </button>

          <img
            className="w-full mb-10"
            src={Logo}
            alt="Collegio de Kidapawan logo"
          />
          <h1>Collegio de Kidapawan Branch</h1>

          {filteredNavLinks().map((data) => (
            // {navLinks.map((data) => (
            <NavItem array={filteredNavLinks()} key={data.title} data={data} />
          ))}
        </div>
      </nav>
    </>
  );
};

const NavItem = ({ data, array }) => {
  const [toggle, setToggle] = useState(false);

  // if Nav item is a link
  if (data.path) {
    return (
      <NavLink
        to={data.path}
        className={({ isActive }) => {
          return `${
            isActive || array.length == 1
              ? "text-blue-500 font-semibold"
              : "text-[#091A35]"
          } flex items-center hover:text-blue-500 my-4`;
        }}
      >
        {data.icon}
        <span className="ml-3 text-xs capitalize">
          {data.title.replaceAll("_", " ")}
        </span>
      </NavLink>
    );
  }

  // if Nav item is a Dropdown
  return (
    <>
      <div
        className="flex items-center my-4 mb-2 cursor-pointer text-[#091A35] hover:text-blue-500"
        onClick={() => setToggle(!toggle)}
      >
        {data.icon}
        <span className="ml-3 text-xs capitalize">
          {data.title.replaceAll("_", " ")}
        </span>
      </div>
      <div className={`${toggle ? "block" : "hidden"} relative ml-7 text-xs`}>
        <div className="absolute left-[3px] bg-[#909090] w-0.5 h-full -z-10" />
        {data.items.map(({ path, title }) => {
          return (
            <NavLink
              key={title}
              to={path}
              className={({ isActive }) => {
                return `${
                  isActive ? "font-semibold" : "font-normal"
                } group flex items-center max-w-fit transition-all duration-300 capitalize hover:font-semibold text-[#909090] z-10`;
              }}
            >
              <div
                className={`${
                  window.location.pathname === path
                    ? "bg-[#909090] scale-110"
                    : "bg-[#D9D9D9]"
                } group-hover:bg-[#909090] group-hover:scale-125 rounded-full transition-all duration-300 w-2 h-2 mr-2 my-2`}
              />
              {title.replaceAll("_", " ")}
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
