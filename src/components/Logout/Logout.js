import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"

import axios from "axios";
import { Button } from "./logoutElements";
import { logoutRoute } from "../../utils/APIRoutes";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleClick}>
      <span style={{ margin: "0.25rem", color: "white"}}>Logout</span>
      <FiLogOut />
    </Button>
  );
}


