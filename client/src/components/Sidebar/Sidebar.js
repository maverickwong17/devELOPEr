import React from "react";
import { FaUserCircle, FaRegCalendarAlt } from "react-icons/fa";
import { RiHeartsFill } from "react-icons/ri";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai"

import "./Sidebar.css";
const Sidebar = () => {
  return (
  <>
    <div className="menu">
      <ul>
        {/* {navLinks.map(({ url, name }) => ( */}
        <li>
          <a href="#">
            <AiFillHome />
          </a>
        </li>
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
            <a href="/messages">
              <BsFillChatDotsFill />
            </a>
          </li>
          <li>
            <a href="/events">
              <FaRegCalendarAlt />
            </a>
          </li>

          {/* ))} */}
        </ul>
      </div>
      <div class="vertical"></div>
    </>
  );
};

export default Sidebar;
