import React from "react";

import { FaUserCircle, FaRegCalendarAlt } from "react-icons/fa";
import { RiHeartsFill } from "react-icons/ri";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { BsFillTerminalFill } from "react-icons/bs";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <>
      <div className="menu">
        <ul>
          {/* {navLinks.map(({ url, name }) => ( */}
          <li>
            <a href="/swipe" className="header_a">
              <AiFillHome />
            </a>
          </li>
          <li>
            <a href="/profile" className="header_a">
              <FaUserCircle />
            </a>
          </li>
          <li>
            <a href="/matches" className="header_a">
              <RiHeartsFill />
            </a>
          </li>

          <li>
            <a href="/chat" className="header_a">
              <BsFillChatDotsFill />
            </a>
          </li>

          <li>
            <a href="/leetcode" className="header_a">
              <BsFillTerminalFill />
            </a>
          </li>
        </ul>
      </div>
      <div className="vertical"></div>
    </>
  );
};

export default Sidebar;
//     <li>
// <a href="/events">
// <FaRegCalendarAlt />
// </a>
// </li>
