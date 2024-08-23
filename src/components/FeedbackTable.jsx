import React, { useState, useEffect } from 'react';

const FeedbackTable = ({ onEditClick, onDeleteClick, refreshKey }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:5000/feedbacks");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [refreshKey]); // Add refreshKey as a dependency

  return (
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <div className="table-responsive" style={{ maxHeight: "88svh" }}>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th className='d-none'>ID</th>
              <th>Prompt</th>
              <th>Response</th>
              <th>Feedback Type</th>
              <th>Create At</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No feedback available
                </td>
              </tr>
            ) : (
              feedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td className='d-none'>{feedback.id}</td>
                  <td>{feedback.prompt}</td>
                  <td>{feedback.response}</td>
                  <td>{feedback.feedback_type}</td>
                  <td>{feedback.created_at}</td>
                  <td>
                    <button className="btn btn-warning d-flex" onClick={() => onEditClick(feedback)}>
                      <i className="bi bi-pencil me-1"></i>Edit
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger d-flex" onClick={() => onDeleteClick(feedback)}>
                      <i className="bi bi-trash-fill me-1"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackTable;
