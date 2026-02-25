import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-0 relative">
        <div className="h-[200px] flex flex-col justify-center relative z-10">
          
          <h2 className="text-2xl font-semibold">{role}</h2>

          <p className="text-sm font-medium text-gray-700 mt-1">
            {topicsToFocus || "No topics added"}
          </p>

          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <div className="text-xs font-semibold text-white bg-black px-3 py-1 rounded-full">
              Experience: {experience}{" "}
              {Number(experience) === 1 ? "Year" : "Years"}
            </div>

            <div className="text-xs font-semibold text-white bg-black px-3 py-1 rounded-full">
              {questions} Q&A
            </div>

            <div className="text-xs font-semibold text-white bg-black px-3 py-1 rounded-full">
              Last Updated: {lastUpdated}
            </div>
          </div>

          {description && (
            <p className="text-sm text-gray-600 mt-4 max-w-xl">
              {description}
            </p>
          )}
        </div>

        {/* Background Blur */}
        <div className="w-[40vw] md:w-[30vw] h-[200px] absolute top-0 right-0">
          <div className="w-24 h-24 bg-lime-400 rounded-full blur-[65px] absolute animate-blob1"></div>
          <div className="w-24 h-24 bg-teal-400 rounded-full blur-[65px] absolute animate-blob2"></div>
          <div className="w-24 h-24 bg-cyan-400 rounded-full blur-[45px] absolute animate-blob3"></div>
          <div className="w-24 h-24 bg-fuchsia-200 rounded-full blur-[45px] absolute animate-blob4"></div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;