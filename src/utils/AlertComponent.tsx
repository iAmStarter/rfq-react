import { memo } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Default alert options
const defaultOptions = {
  confirmButtonText: 'OK',
  confirmButtonColor: '#3085d6',
  cancelButtonText: 'Cancel',
  cancelButtonColor: '#d33',
  showCancelButton: false,
  showCloseButton: false,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  stopKeydownPropagation: true,
};

// Predefined alert types
const alertTypes = {
  success: {
    icon: 'success',
    title: 'Success!',
    confirmButtonColor: '#28a745',
  },
  error: {
    icon: 'error',
    title: 'Error!',
    confirmButtonColor: '#dc3545',
  },
  warning: {
    icon: 'warning',
    title: 'Warning!',
    confirmButtonColor: '#ffc107',
  },
  info: {
    icon: 'info',
    title: 'Information',
    confirmButtonColor: '#17a2b8',
  },
  confirm: {
    icon: 'question',
    title: 'Are you sure?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#6c757d',
  },
};

/**
 * Displays a customizable SweetAlert2 modal
 * @param {Object} options - SweetAlert2 options object
 * @returns {Promise} - SweetAlert2 result promise
 */
const showAlert = (options = {}) => {
  const {
    type = null,
    title = '',
    text = '',
    html = null,
    ...customOptions
  } = options;

  // Merge options with defaults
  const finalOptions = {
    ...defaultOptions,
    ...(type && alertTypes[type]),
    title: type && !title ? alertTypes[type].title : title,
    text: text || (html ? '' : ''),
    html: html || undefined,
    ...customOptions,
  };

  return MySwal.fire(finalOptions);
};

/**
 * Pre-configured success alert
 * @param {string|ReactNode} message - Alert message
 * @param {Object} options - Additional SweetAlert2 options
 * @returns {Promise}
 */
const showSuccessAlert = (message, options = {}) => {
  return showAlert({
    type: 'success',
    text: message,
    ...options,
  });
};

/**
 * Pre-configured error alert
 * @param {string|ReactNode} message - Alert message
 * @param {Object} options - Additional SweetAlert2 options
 * @returns {Promise}
 */
const showErrorAlert = (message, options = {}) => {
  return showAlert({
    type: 'error',
    text: message,
    ...options,
  });
};

/**
 * Pre-configured warning alert
 * @param {string|ReactNode} message - Alert message
 * @param {Object} options - Additional SweetAlert2 options
 * @returns {Promise}
 */
const showWarningAlert = (message, options = {}) => {
  return showAlert({
    type: 'warning',
    text: message,
    ...options,
  });
};

/**
 * Pre-configured info alert
 * @param {string|ReactNode} message - Alert message
 * @param {Object} options - Additional SweetAlert2 options
 * @returns {Promise}
 */
const showInfoAlert = (message, options = {}) => {
  return showAlert({
    type: 'info',
    text: message,
    ...options,
  });
};

/**
 * Pre-configured confirmation dialog
 * @param {string|ReactNode} message - Confirmation message
 * @param {Object} options - Additional SweetAlert2 options
 * @returns {Promise} - Resolves with {isConfirmed, isDismissed}
 */
const showConfirmDialog = (message, options = {}) => {
  return showAlert({
    type: 'confirm',
    text: message,
    ...options,
  }).then(result => ({
    isConfirmed: result.isConfirmed,
    isDismissed: result.dismiss === Swal.DismissReason.cancel,
  }));
};

// Export all functions as a single object
export const Alert = {
  show: showAlert,
  success: showSuccessAlert,
  error: showErrorAlert,
  warning: showWarningAlert,
  info: showInfoAlert,
  confirm: showConfirmDialog,
};

// Memoized component for React rendering (if needed)
const AlertComponent = memo(({ type = 'info', message, options = {}, onResolve }) => {
  const showAlert = async () => {
    try {
      const result = await Alert[type](message, options);
      onResolve && onResolve(result);
    } catch (error) {
      console.error('Alert error:', error);
    }
  };

  return (
    <button onClick={showAlert} style={{ display: 'none' }} aria-hidden="true" />
  );
});

AlertComponent.displayName = 'AlertComponent';

export default AlertComponent;