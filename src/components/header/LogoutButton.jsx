import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import { showAlert } from "../../store/alertSlice";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
      dispatch(showAlert({ message: "Logged out successful", type: "success" }));
      navigate("/");
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="z-30 px-6 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-md shadow-md hover:from-red-700 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
