import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6"
const Input = ({value, onChange, label, placeholder, type}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
  <div className="mb-4">
    <label className="text-[13px] text-slate-800">{label}</label>

    <div className="relative mt-1">
      <input
        type={
          type === "password"
            ? (showPassword ? "text" : "password")
            : type
        }
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={value}
        onChange={onChange}
      />

      {type === "password" && (
        <span
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-orange-500"
          onClick={toggleShowPassword}
        >
          {showPassword ? (
            <FaRegEyeSlash size={18} />
          ) : (
            <FaRegEye size={18} />
          )}
        </span>
      )}
    </div>
  </div>
);
}

export default Input;
