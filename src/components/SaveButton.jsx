import React from 'react';
import {updateFeedback} from '../api/api_config_dev';

const SaveButton = ({ feedbackType, id, onSaveSuccess }) => {
  const handleClick = async () => {
    try {
      const response = await fetch(`${updateFeedback.url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback_type: feedbackType }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      onSaveSuccess('Feedback updated successfully!'); // Notify parent of success

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <button className="btn btn-success" onClick={handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-floppy-fill me-1 mb-1" viewBox="0 0 16 16">
        <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
        <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
      </svg>
      Save Changes
    </button>
  );
};

export default SaveButton;
