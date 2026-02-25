import React, { useRef, useEffect, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-lg shadow-gray-100 border border-gray-100 group transition">
      
      {/* Header */}
      <div className="flex items-start justify-between cursor-pointer">
        
        {/* Question */}
        <div className="flex items-start gap-3.5">
          <span className="text-xs md:text-sm font-semibold text-gray-400 leading-[18px]">
            Q
          </span>

          <h3
            className="text-sm md:text-[15px] font-medium text-gray-800 mr-0 md:mr-20"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>

        {/* Right Actions */}
        <div className="flex items-center justify-end ml-4 relative">
          <div
            className={`flex ${
              isExpanded ? "md:flex" : "md:hidden group-hover:flex"
            }`}
          >
            {/* Pin Button */}
            <button
              type="button"
              className="flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 mr-2 rounded border border-indigo-200 cursor-pointer hover:bg-indigo-100 transition"
              onClick={onTogglePin}
            >
              {isPinned ? (
                <LuPinOff size={14} />
              ) : (
                <LuPin size={14} />
              )}
            </button>

            {/* Learn More Button */}
            <button
              type="button"
              className="flex items-center gap-2 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 mr-2 rounded border border-cyan-200 hover:bg-cyan-100 cursor-pointer transition"
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
            >
              <LuSparkles size={14} />
              <span className="hidden md:block">Learn More</span>
            </button>
          </div>

          {/* Expand Icon */}
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expandable Answer Section */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg text-sm leading-relaxed"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;