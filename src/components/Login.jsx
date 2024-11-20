import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import spinner from "/spinner.svg";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="py-8 flex items-center justify-center text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-center">KnowledgeNest</h1>

        {/* Login Prompt */}
        <p className="text-center text-gray-400">
          If you don't have a account? please{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 transition duration-300 underline"
          >
            Sign up
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
        {/* Signup Form */}
        <form className="space-y-4" onSubmit={handleSubmit(login)}>
          <Input
            label={"Email"}
            placeholder={"Enter your email."}
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/,
            })}
          />
          

          <Input
            label={"Password"}
            placeholder={"Enter your password."}
            type={"password"}
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
            })}
          />
          

          <Button type="submit" className="w-full">
            {loading ? (
              <img src={spinner} alt="spinner" className="mx-auto h-6 w-6" />
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
