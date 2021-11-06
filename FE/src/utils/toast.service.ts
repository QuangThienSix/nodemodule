import { toast } from 'react-toastify';

/**
 * add single toast message
 * @param severity Severity level of the message, valid values are "success", "info", "warn" and "error"
 * @param summary Summary text of the message.
 * @param detail Detail text of the message.
 */
export const addSingle = (severity?: string, summary?: string, autoClose?: number) => {
  if (severity === 'success') {
    toast.success(summary, { autoClose: autoClose });
  } else if (severity === 'info') {
    toast.info(summary, { autoClose: autoClose });
  } else if (severity === 'warn') {
    toast.warn(summary, { autoClose: autoClose });
  } else {
    toast.error(summary, { autoClose: autoClose });
  }
};
/**
 * clear all toast messages
 */
export const Clear = () => {
  toast.dismiss();
};
