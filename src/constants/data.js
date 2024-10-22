import React from "react";
import { BiSolidPackage } from "react-icons/bi";
import {
  BsBuildingsFill,
  BsFillFileEarmarkCheckFill,
  BsPersonBadgeFill,
} from "react-icons/bs";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaClipboardList, FaFileInvoiceDollar } from "react-icons/fa";
import { MdCoPresent, MdGroup } from "react-icons/md";
import { IoMdBriefcase } from "react-icons/io";
import { GiSandsOfTime, GiTeamIdea } from "react-icons/gi";
import { GoHomeFill } from "react-icons/go";
import { RiSettingsFill } from "react-icons/ri";

// NavLinks
export const navLinks = [
  {
    icon: <GoHomeFill className="-ml-0.5 text-lg" title="Dashboard" />,
    id: 1,
    title: "Dashboard",
    items: [
      { title: "Students Dashboard", path: "/dashboard" },
      { title: "Teachers Dashboard", path: "/dashboard/teachers" },
      { title: "Riders Dashboard", path: "/dashboard/riders" },
      { title: "Claim Station Dashboard", path: "/dashboard/claim-station" },
    ],
  },
  {
    icon: (
      <BiSolidPackage className="-ml-0.5 text-xl" title="Education Institute" />
    ),
    id: 2,
    path: "/education-institute",
    title: "Education Institute",
  },
  {
    icon: <AiFillDollarCircle className="-ml-0.5 text-xl" title="Orders" />,
    id: 3,
    path: "/orders",
    title: "Orders",
  },
  {
    icon: (
      <AiFillDollarCircle className="-ml-0.5 text-xl" title="Rider Activity" />
    ),
    id: 9,
    path: "/RiderActivity",
    title: "Rider Activity",
  },
  {
    icon: <BsBuildingsFill className="text-base" title="Environmental Setup" />,
    id: 4,
    path: "/EnvironmentalSetup",
    title: "Environmental Setup",
  },
  {
    icon: (
      <BiSolidPackage
        className="-ml-0.5 text-xl"
        title="Advertising and Annoucements"
      />
    ),
    id: 5,
    path: "/advertising-and-annoucements",
    title: "Advertising and Annoucements",
  },
  {
    icon: <RiSettingsFill className="-ml-0.5 text-xl" title="Admin Chat" />,
    id: 6,
    path: "/AdminChat",
    title: "Admin Chat",
  },
  {
    icon: <RiSettingsFill className="-ml-0.5 text-xl" title="Branch Chat" />,
    id: 7,
    path: "/BranchChat",
    title: "Branch Chat",
  },
  {
    icon: <IoMdBriefcase className="-ml-0.5 text-xl" title="Branches" />,
    id: 8,
    path: "/Branch",
    title: "Branches",
  },
  {
    icon: <IoMdBriefcase className="-ml-0.5 text-xl" title="Branches" />,
    id: 10,
    path: "/OrderLogs",
    title: "Order logs",
  },
];

export const studentNavLink = [
  {
    icon: <GoHomeFill className="-ml-0.5 text-lg" title="Dashboard" />,
    id: 1,
    title: "Students Dashboard",
    path: "/dashboard",
  },
  {
    icon: <RiSettingsFill className="-ml-0.5 text-xl" title="Chat" />,
    id: 2,
    path: "/Chat",
    title: "Chat",
  },
];

export const teacherNavLink = [
  {
    icon: <GoHomeFill className="-ml-0.5 text-lg" title="Dashboard" />,
    id: 1,
    title: "Teachers Dashboard",
    path: "/dashboard/teachers",
  },
  {
    icon: <RiSettingsFill className="-ml-0.5 text-xl" title="Chat" />,
    id: 2,
    path: "/Chat",
    title: "Chat",
  },
];

// Dashboard Analytics
export const dashboardCards = [
  {
    title: "Total Company",
    icon: <IoMdBriefcase className="text-lg text-blue-500" />,
    colSpan: "col-span-2",
  },
  {
    title: "Total Project Manager",
    icon: <MdCoPresent className="text-lg text-blue-500" />,
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    title: "Total Workers",
    icon: <MdGroup className="text-lg text-blue-500" />, // Updated icon
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    title: "Total Sales",
    icon: <BsPersonBadgeFill className="text-lg text-blue-500" />,
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    title: "Total Leads",
    icon: <IoMdBriefcase className="text-lg text-blue-500" />,
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    title: "Total Tasks",
    icon: <FaClipboardList className="text-lg text-blue-500" />,
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    title: "Total Invoices",
    icon: <FaFileInvoiceDollar className="text-lg text-blue-500" />,
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    title: "Total Invoice Pending",
    icon: <GiSandsOfTime className="text-lg text-blue-500" />,
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    title: "Total Invoice Paid",
    icon: <BsFillFileEarmarkCheckFill className="text-lg text-blue-500" />,
    colSpan: "col-span-2 sm:col-span-1",
  },
];

export const colors = {
  error: "border-red-600 bg-red-100 text-red-600",
  info: "border-blue-600 bg-blue-100 text-blue-600",
  warning: "border-yellow-600 bg-yellow-100 text-yellow-600",
  success: "border-green-600 bg-green-100 text-green-600",
};

export const fileColorDropdown = [
  {
    id: 1,
    value: "Colorful",
  },
  {
    id: 2,
    value: "Black & white",
  },
];

export const riderAccountStatus = {
  approve: "approve",
  in_active: "inActivate",
  activate: "activate",
  de_activate: "de-activate",
  blocked: "blocked",
  apply: "apply",
};

export const paginationEntries = ["All", 50, 100, 200, 500, 1000];
