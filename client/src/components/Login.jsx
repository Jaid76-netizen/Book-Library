import React, { useState , useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {userBaseUrl} from "../axiosInstance"
import  {toast, Toaster } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

    const userAuth = localStorage.getItem("userAuth");
    const authUser = JSON.parse(userAuth);

  useEffect(() => {
    if(authUser?.isLogin){
        navigate("/");
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log("formdata: " , formData);

  const handleSubmit = async (e) => {
   //login
    e.preventDefault();
   try {
     const {data} = await userBaseUrl.post("/login" , formData);
     console.log("data" , data);

     const authData = {
        isLogin: true,
        token: data?.token,
     };

     if(data?.success){
        localStorage.setItem("userAuth" , JSON.stringify(authData));
        navigate("/");
     }

   } catch (error) {
        console.log("login-error" , error);
        const errMessage = error?.response?.data;

        if(!errMessage?.success){
                toast.error(errMessage.message);
        }
   }
    console.log("Login Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Toaster />
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <NavLink href="/signup" className="text-blue-600 cursor-pointer">Sign up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
