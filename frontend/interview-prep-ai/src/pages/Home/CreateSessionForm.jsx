import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../../components/Inputs/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // 1️⃣ Generate AI Questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generatedQuestions = aiResponse.data;

      // 2️⃣ Create Session
      const response = await axiosInstance.post(
        API_PATHS.SESSION.CREATE,
        {
          ...formData,
          questions: generatedQuestions,
        }
      );

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Start a New Interview Journey
      </h3>

      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Fill out a few quick details and unlock your personalized set of
        interview questions.
      </p>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <Input
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          label="Target Role"
          placeholder="Frontend Developer"
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={(e) => handleChange("experience", e.target.value)}
          label="Experience"
          placeholder="2"
          type="number"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={(e) => handleChange("topicsToFocus", e.target.value)}
          label="Topics to Focus"
          placeholder="React, Node.js, MongoDB"
          type="text"
        />

        <Input
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          label="Description"
          placeholder="Preparing for product-based companies"
          type="text"
        />

       <button
  type="submit"
  disabled={isLoading}
  className="
    w-full mt-2 
    bg-black text-white 
    py-3 rounded-lg 
    font-semibold 
    hover:bg-gray-800 
    transition-all duration-300
    flex items-center justify-center
    disabled:opacity-60 disabled:cursor-not-allowed
  "
>
  {isLoading ? <SpinnerLoader /> : "Create Session"}
</button>
      </form>
    </div>
  );
};

export default CreateSessionForm;