import React from "react";
import { FaUserCircle, FaRegCalendarAlt } from "react-icons/fa";
import { RiHeartsFill } from "react-icons/ri";
import { BsFillChatDotsFill } from "react-icons/bs";

import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="menu">
      <ul>
        {/* {navLinks.map(({ url, name }) => ( */}
        <li>
          <a href="#">
            <FaUserCircle />
          </a>
        </li>
        <li>
          <a href="#">
            <RiHeartsFill />
          </a>
        </li>

        <li>
          <a href="#">
            <BsFillChatDotsFill />
          </a>
        </li>
        <li>
          <a href="#">
            <FaRegCalendarAlt />
          </a>
        </li>

        {/* ))} */}
      </ul>
    </div>
  );
};

export default Sidebar;
