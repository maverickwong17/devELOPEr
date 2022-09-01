import React from "react";
import { useMediaQuery } from "react-responsive";
const ResponsiveSideBar = () => {
  const isSmall = useMediaQuery({ query: "(max-width: 1224px" });

  return <>{isSmall && <p>sdsd</p>}</>;
};

export default ResponsiveSideBar;
