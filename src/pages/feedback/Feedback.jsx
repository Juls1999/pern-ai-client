import React, { useState, useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import FeedbackTable from "../../components/FeedbackTable";
import Modal from "../../components/Modal";
import SuccessModal from "../../components/SuccessModal";
import DeleteConfirmationModal from "../../components/DeleteModal"; // Import your new modal component

const Feedback = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [feedbackToDelete, setFeedbackToDelete] = useState(null); // Store feedback item to delete
  const [refreshKey, setRefreshKey] = useState(0); // Key to force refresh

  const handleEditClick = (feedback) => {
    setSelectedFeedback(feedback);
    setShowModal(true);
  };

  const handleDeleteClick = (feedback) => {
    setFeedbackToDelete(feedback);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFeedback(null);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setSuccessMessage("");
  };

  const handleSaveSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setRefreshKey(prevKey => prevKey + 1); // Trigger refresh
    handleCloseModal();
  };

  const handleDeleteConfirmation = async () => {
    try {
      await fetch(`http://localhost:5000/feedbacks/${feedbackToDelete.id}`, {
        method: 'DELETE',
      });
      setSuccessMessage("Feedback deleted successfully!");
      setShowSuccessModal(true);
      setRefreshKey(prevKey => prevKey + 1); // Trigger refresh
    } catch (error) {
      console.error("Error deleting feedback:", error);
      setSuccessMessage("Error deleting feedback.");
      setShowSuccessModal(true);
    } finally {
      setShowDeleteModal(false);
      setFeedbackToDelete(null);
    }
  };

  const refreshFeedbacks = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2">
            <Sidebar />
          </div>
          <div className="col-md-9 col-lg-10">
            <FeedbackTable
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick} // Pass the handler for delete
              refreshKey={refreshKey}
            />
            {showModal && (
              <Modal
                feedback={selectedFeedback}
                handleClose={handleCloseModal}
                onSaveSuccess={handleSaveSuccess}
              />
            )}
            {showSuccessModal && (
              <SuccessModal
                message={successMessage}
                handleClose={handleSuccessModalClose}
              />
            )}
            {showDeleteModal && (
              <DeleteConfirmationModal
                message="Are you sure you want to delete this feedback?"
                onConfirm={handleDeleteConfirmation}
                onCancel={() => setShowDeleteModal(false)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
