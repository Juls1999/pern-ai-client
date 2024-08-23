import React, { useState } from "react";
import styles from "./Modal.module.css";
import SaveButton from "./SaveButton";

const Modal = ({ feedback, handleClose, onSaveSuccess }) => {
  const [feedbackType, setFeedbackType] = useState("down");

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
              readOnly // Use readOnly instead of disabled
            ></textarea>
            <br />

            <label htmlFor="response">Response:</label>
            <textarea
              className="form-control"
              style={{ resize: "none" }}
              name="response"
              id="response"
              value={feedback?.response || ""}
              readOnly // Use readOnly instead of disabled
            ></textarea>

            <br />
            <label htmlFor="feedback">Feedback Type:</label>
            <select
              className="ms-2"
              name="feedback"
              id="feedback"
              onChange={handleFeedbackTypeChange}
            >
              {feedback.feedback_type === "down" ? (
                <>
                  <option value="down" selected>
                    down
                  </option>
                  <option value="up">up</option>
                </>
              ) : (
                <>
                  <option value="up" selected>
                    up
                  </option>
                  <option value="down">down</option>
                </>
              )}
            </select>
          </div>
          <div className="bg-warning p-4 d-flex justify-content-center">
            <SaveButton
              id={feedback?.id}
              feedbackType={feedbackType}
              onSaveSuccess={onSaveSuccess} // Pass the callback function to SaveButton
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
