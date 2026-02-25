import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";
const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-2xl border border-gray-200 
                 hover:shadow-xl transition-all duration-300 
                 overflow-hidden cursor-pointer group"
    >
      {/* Top Colored Section */}
      <div
        className="p-5 flex items-start justify-between"
        style={{ background: colors?.bgcolor }}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-lg font-semibold text-gray-800">
              {getInitials(role)}
            </span>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-[18px] font-semibold text-gray-900">
              {role}
            </h2>
            <p className="text-sm text-gray-700">
              {topicsToFocus}
            </p>
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="hidden group-hover:flex items-center justify-center 
                     w-8 h-8 rounded-md bg-white shadow-sm 
                     hover:bg-red-50 transition"
        >
          <LuTrash2 className="text-red-500" size={16} />
        </button>
      </div>

      {/* Bottom Section */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium px-3 py-1 
                           border border-gray-300 rounded-full">
            {topicsToFocus} Q&A
          </span>

          <span className="text-xs font-medium px-3 py-1 
                           border border-gray-300 rounded-full">
            Last Updated: {lastUpdated}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;