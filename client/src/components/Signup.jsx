import React, { useState , useEffect} from "react";
import { userBaseUrl } from "../axiosInstance";
import { Toaster, toast } from "react-hot-toast";
import { Navigate, NavigationType, useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    FirstName: "",
    LastName: "",
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
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };
  console.log("signform", signupForm);

  const handleSubmit = async (e) => {
    // create
    e.preventDefault();
    // console.log("Signup Data:", signupForm);
    try {
      const { data } = await userBaseUrl.post("/create", signupForm);
      console.log("signupResponse", data);

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log("signup-error", error);
       const errMessage = error?.response?.data;
      
              if(!errMessage?.success){
                      toast.error(errMessage.message);
              }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="FirstName"
              value={signupForm.FirstName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="LastName"
              value={signupForm.LastName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter last name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="Email"
              value={signupForm.Email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="Password"
              value={signupForm.Password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
