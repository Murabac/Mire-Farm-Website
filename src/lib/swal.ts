import Swal from 'sweetalert2';

/**
 * Utility functions for SweetAlert2 alerts and confirmations
 */

export const showSuccessAlert = (message: string, title: string = 'Success!') => {
  return Swal.fire({
    icon: 'success',
    title,
    text: message,
    confirmButtonColor: '#6B9E3E',
    confirmButtonText: 'OK',
  });
};

export const showErrorAlert = (message: string, title: string = 'Error!') => {
  return Swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonColor: '#dc2626',
    confirmButtonText: 'OK',
  });
};

export const showInfoAlert = (message: string, title: string = 'Info') => {
  return Swal.fire({
    icon: 'info',
    title,
    text: message,
    confirmButtonColor: '#6B9E3E',
    confirmButtonText: 'OK',
  });
};

export const showConfirmDialog = (
  message: string,
  title: string = 'Are you sure?',
  confirmText: string = 'Yes',
  cancelText: string = 'Cancel'
): Promise<boolean> => {
  return Swal.fire({
    title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#6B9E3E',
    cancelButtonColor: '#6b7280',
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  }).then((result) => {
    return result.isConfirmed;
  });
};

