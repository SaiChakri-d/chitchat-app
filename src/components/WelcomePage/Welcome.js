import React, { useState, useEffect } from "react";
import Robot from "../../assets/robot.gif";
import { Container } from "@mui/material";
import Spinner from "../Spinner";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          background: "ivory",
          flexDirection: "column",
        }}
      >
        <img
          style={{
            height: "20rem",
            margin: "2rem",
          }}
          src={Robot}
          alt=""
        />
        <h1>
          Welcome,{" "}
          <span
            style={{
              color: "#4e0eff",
            }}
          >
            {userName}!
          </span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
      </Container>
    </>
  );
}
