import { toast } from 'react-toastify'

const options = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}



const notify = (msg, type) => {
  switch (type.toLowerCase()) {
    case 'error': toast.error(msg, options); break;
    case 'success': toast.success(msg, options); break;
    case 'warn': toast.warn(msg, options); break;
  }
}

export default notify;