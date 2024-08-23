import React from 'react';
import Swal from 'sweetalert2';

const SuccessModal = ({ message, handleClose }) => {
  React.useEffect(() => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Close',
    }).then((result) => {
      if (result.isConfirmed) {
        handleClose(); // Close both SuccessModal and Modal
      }
    });
  }, [message, handleClose]);

  return null;
};

export default SuccessModal;
