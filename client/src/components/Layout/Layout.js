import React, { useState, useEffect } from "react";
import classes from "./Layout.css";
import { useCallback } from "react";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
const Layout = (props) => {
  const [checked, setChecked] = useState(true);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  return (
    <>
      <ButtonGroup className="mb-2 position-absolute bottom-0 end-0">
        <ToggleButton
          id="toggle-check"
          type="checkbox"
          variant="secondary"
          checked={checked}
          value="1"
          onChange={(e) => setChecked(e.currentTarget.checked)}
        >
          Animation?
        </ToggleButton>
      </ButtonGroup>
      <Particles
        className="layout"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: {
            enable: true,
          },
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#A30E3B",
            },

            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },

            line_linked: {
              enable: true,
              distance: 150,
              color: "#A30E3B",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: checked,
              speed: 3,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          detectRetina: true,
        }}
      />
      {props.children}
    </>
  );
};

export default Layout;
