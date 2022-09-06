import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiHeartsFill } from "react-icons/ri";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { BsFillTerminalFill } from "react-icons/bs";
import "./Sidebar.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Sidebar = () => {
  return (
    <>
      <div className="menu">
        <ul>
          <li>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id={`tooltip-bottom`}>Home</Tooltip>}
            >
              <a href="/swipe" className="header_a">
                <AiFillHome />
              </a>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id={`tooltip-bottom`}>Profile</Tooltip>}
            >
              <a href="/profile" className="header_a">
                <FaUserCircle />
              </a>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id={`tooltip-bottom`}>Matches</Tooltip>}
            >
              <a href="/matches" className="header_a">
                <RiHeartsFill />
              </a>
            </OverlayTrigger>
          </li>

          <li>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id={`tooltip-bottom`}>Chat</Tooltip>}
            >
              <a href="/chat" className="header_a">
                <BsFillChatDotsFill />
              </a>
            </OverlayTrigger>
          </li>

          <li>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id={`tooltip-bottom`}>Leetcode</Tooltip>}
            >
              <a href="/leetcode" className="header_a">
                <BsFillTerminalFill />
              </a>
            </OverlayTrigger>
          </li>
        </ul>
      </div>
      <div className="vertical"></div>
    </>
  );
};

export default Sidebar;
