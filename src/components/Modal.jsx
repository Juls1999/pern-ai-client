import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import SaveButton from "./SaveButton";

const Modal = ({ feedback, handleClose, onSaveSuccess }) => {
  // Initialize state with feedback.feedback_type or default to "down"
  const [feedbackType, setFeedbackType] = useState(feedback.feedback_type);

  // Update state when feedback prop changes
  useEffect(() => {
    setFeedbackType(feedback.feedback_type || "down");
  }, [feedback.feedback_type]);

  const handleFeedbackTypeChange = (event) => {
    setFeedbackType(event.target.value);
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-warning">
            <h5 className="modal-title text-white">
              <i className="bi bi-pencil me-1"></i>Edit Feedback
            </h5>
            <i
              className={`${styles.hover} bi bi-x-lg`}
              onClick={handleClose}
            ></i>
          </div>
          <div className="modal-body">
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              className="form-control"
              name="id"
              id="id"
              value={feedback?.id}
              disabled
            />
            <br />
            <label htmlFor="prompt" className="me-2 mt-1">
              Prompt:
            </label>
            <textarea
              className="form-control"
              name="prompt"
              id="prompt"
              value={feedback?.prompt || ""}
              style={{ resize: "none" }}
              readOnly
            ></textarea>
            <br />

            <label htmlFor="response">Response:</label>
            <textarea
              className="form-control"
              style={{ resize: "none" }}
              name="response"
              id="response"
              value={feedback?.response || ""}
              readOnly
            ></textarea>

            <br />
            <label htmlFor="feedback">Feedback Type:</label>
            <select
              className="ms-2"
              name="feedback"
              id="feedback"
              value={feedbackType} // Use state value
              onChange={handleFeedbackTypeChange}
            >
              {feedbackType === "down" ? (
                <>
                  <option value="up">up</option>{" "}
                  <option value="down" disabled>
                    down
                  </option>
                </>
              ) : (
                <>
                  <option value="down">down</option>{" "}
                  <option value="up" disabled>
                    up
                  </option>
                </>
              )}
            </select>
          </div>
          <div className="bg-warning p-4 d-flex justify-content-center">
            <SaveButton
              id={feedback?.id}
              feedbackType={feedbackType}
              onSaveSuccess={onSaveSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
