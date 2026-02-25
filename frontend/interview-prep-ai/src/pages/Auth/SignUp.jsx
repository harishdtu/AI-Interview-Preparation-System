import React from 'react'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";


import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
const SignUp = ({setCurrentPage}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext( UserContext );
  const navigate = useNavigate();

  //Handle SignUp Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";
    if(!fullName){
      setError("Please enter your full name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password ){
      setError("Password must be at least 8 characters long");
      return;
    }
    setError("");

    //SignUp API call here
    try{
      //Upload Image if present
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  
  };
  return <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
    <h3 className="text-lg font-semibold text-black">Create an Account</h3>
    <p className="text-xs text-slate-700 mt-1.25 mb-6">Please enter your details to create an account
    </p>
    <form onSubmit={handleSignUp}>


      <ProfilePhotoSelector image={profilePic} setImage={(file)=> setProfilePic(file)} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <Input 
        value={fullName}
        onChange={({ target }) => setFullName(target.value)}
        label = "Full Name"
        placeholder="Enter your full name"
        type="text"
      />
      <Input 
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        label = "Email Address"
        placeholder="jon@example.com"
        type="text"
      />
      <Input 
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label = "Password"
        placeholder="Min 8 Characters"
        type="password"
      />
      </div>
      {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
      <button
  type="submit"
  className="w-full bg-black text-white py-3 rounded-lg mt-4 hover:bg-gray-800 transition"
>
      SIGN UP
      </button>


      <p className="text-[13px] text-slate-800 mt-3">
        Already have an account?{" "}
        <button
          type="button"
          className="font-medium text-red-500 underline cursor-pointer"
          onClick={()=> {
            setCurrentPage("login")
          }}
          >
             Login</button>
      </p>
    </form>
  </div>
  
};

export default SignUp;
