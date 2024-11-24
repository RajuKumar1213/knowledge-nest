import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import spinner from "/spinner.svg";
import {showAlert} from "../store/alertSlice"

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signup = (data) => {
    console.log(data);
    setError("");
    setLoading(true);
    if (data) {
      authService
        .createAccount(data)
        .then((userData) => {
          if (userData) {
            authService.getCurrentUser().then((userData) => {
              dispatch(storeLogin(userData));
              dispatch(showAlert({message:"Signup Successfully",type:"success"}))
              navigate("/");
              setLoading(false);
            });
          }
        })
        .catch((err) => {
          setError(err.message || "Failed to signup. Please check the credentials.");
          setLoading(false);
        });
    }
  };

  return (
    <div className="flex items-center justify-center text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-center">KnowledgeNest</h1>

        {/* Login Prompt */}
        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 transition duration-300 underline"
          >
            Login
          </Link>
        </p>
        {error && (
          <p className="text-sm text-red-600 font-semibold mt-2 flex items-center">
            <svg
              className="w-4 h-4 mr-1 fill-current text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M11.001 10h2v5h-2zm0 8h2v2h-2z" />
              <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            </svg>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(signup)} className="space-y-4">
          <Input
            label={"Name"}
            placeholder={"Enter your name."}
            {...register("name", {
              required: true,
              minLength: 3,
              maxLength: 30,
            })}
          />
          {errors.name && (
            <span className="text-red-600 text-sm">This field is required</span>
          )}

          <Input
            label={"Email"}
            placeholder={"Enter your email."}
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && (
            <span className="text-red-600 text-sm">
              Please enter valid email id.
            </span>
          )}

          <Input
            label={"Password"}
            placeholder={"Enter your password."}
            type={"password"}
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 30,
            })}
          />
          {errors.password && (
            <span className="text-red-600 text-sm">
              The password is required and must be at least 6 characters.
            </span>
          )}
         <Button type="submit" className="w-full">
            {loading ? (
              <img src={spinner} alt="spinner" className="mx-auto h-6 w-6" />
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
