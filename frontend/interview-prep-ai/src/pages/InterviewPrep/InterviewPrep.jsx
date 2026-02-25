import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import QuestionCard from "../../components/Cards/QuestionCard";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import AIResponsePreview from "./components/AIResponsePreview";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExplainLoading, setIsExplainLoading] = useState(false);

  // ==============================
  // Fetch Session Details
  // ==============================
  const fetchSessionDetailsById = async () => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data?.session) {
        setSessionData(response.data.session);
      } else {
        setErrorMsg("Session not found");
      }
    } catch (error) {
      console.error("Fetch Session Error:", error);
      setErrorMsg("Failed to fetch session data");
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // ==============================
  // Generate Dummy AI Explanation
  // ==============================
  const generateConceptExplanation = async (question) => {
    try {
      setOpenLeanMoreDrawer(true);
      setIsExplainLoading(true);
      setExplanation(null);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          concept: question,
        }
      );

      if (response.data?.explanation) {
        setExplanation(response.data.explanation);
      } else {
        setExplanation("No explanation available.");
      }
    } catch (error) {
      console.error("Explanation Error:", error);
      setExplanation("Failed to load explanation.");
    } finally {
      setIsExplainLoading(false);
    }
  };


  // ==============================
// Pin Question
// ==============================
const toggleQuestionPinStatus = async (questionId) => {
  try {
    const response = await axiosInstance.post(
      API_PATHS.QUESTION.PIN(questionId)
    );

    if (response.data?.question) {
      fetchSessionDetailsById(); // refresh session
      toast.success("Pin status updated");
    }

  } catch (error) {
    console.error("Pin Error:", error);
    toast.error("Failed to update pin");
  }
};
  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <SpinnerLoader />
      </DashboardLayout>
    );
  }

  if (errorMsg) {
    return (
      <DashboardLayout>
        <div className="p-6 text-red-500">{errorMsg}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || ""}
        questions={sessionData?.questions?.length || 0}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold text-black">
          Interview Q & A
        </h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          
          {/* LEFT SIDE */}
          <div
            className={`col-span-12 ${
              openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => (
                <motion.div
                  key={data._id || index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.05,
                  }}
                  layout
                  className="mb-4"
                >
                  <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      onLearnMore={() =>
                        generateConceptExplanation(data?.question)
                      }
                      isPinned={data?.isPinned}
                      onTogglePin={() =>
                        toggleQuestionPinStatus(data?._id)
                      }
                    />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE — AI PREVIEW */}
          {openLeanMoreDrawer && (
            <div className="col-span-12 md:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-5 rounded-xl shadow-lg sticky top-6"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800">
                    AI Explanation
                  </h3>
                  <button
                    onClick={() => setOpenLeanMoreDrawer(false)}
                    className="text-sm text-red-500"
                  >
                    Close
                  </button>
                </div>

                {isExplainLoading ? (
                  <SpinnerLoader />
                ) : (
                  <AIResponsePreview content={explanation} />
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;