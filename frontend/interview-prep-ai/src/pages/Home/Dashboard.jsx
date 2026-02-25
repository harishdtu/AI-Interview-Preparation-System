import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import SummaryCard from "../../components/Cards/SummaryCard";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import CreateSessionForm from "../Home/CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";
const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);

    console.log("Fetched Sessions:", response.data.sessions);

    setSessions(response.data.sessions || []);

  } catch (error) {
    console.error("Error fetching session data:", error);
    toast.error("Failed to fetch sessions");
    setSessions([]);
  }
};

  const deleteSession = async (sessionData) => {
  try {
    await axiosInstance.delete(
      API_PATHS.SESSION.DELETE(sessionData._id)
    );

    toast.success("Session deleted successfully");

    setOpenDeleteAlert({ open: false, data: null });

    fetchAllSessions(); // refresh list
  } catch (error) {
    console.error("Delete error:", error);
    toast.error("Failed to delete session");
  }
};

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              description={data?.description || ""}
              lastUpdated={
                data?.updatedAt
                  ? moment(data.updatedAt).format("DD MM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() =>
                setOpenDeleteAlert({ open: true, data })
              }
            />
          ))}
        </div>

        <button
          className="h-12 flex items-center justify-center gap-3 
          bg-gradient-to-r from-[#FF9324] to-[#e99a4b] 
          text-sm font-semibold text-white px-7 py-2.5 rounded-full 
          hover:bg-black hover:text-white transition-colors 
          cursor-pointer hover:shadow-2xl hover:shadow-orange-300 
          fixed bottom-10 md:bottom-20 right-10 md:right-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl text-white" />
          Add New
        </button>
      </div>

      <Modal
      isOpen = {openCreateModal}
      onClose ={()=>{
        setOpenCreateModal(false);
      }}
      hideHeader
      >
        <CreateSessionForm/>
       
      </Modal>

      <Modal
       isOpen={openDeleteAlert?.open}
       onClose={()=>{
        setOpenDeleteAlert({ open: false, data:null});
       }}
       title= "Delete Alert"
       >
        <div className="">
          <DeleteAlertContent
          content ="Are you sure you want this session detail?"
          onDelete={()=> deleteSession(openDeleteAlert.data)}
          />
        </div>
       </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;