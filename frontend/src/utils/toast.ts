import toast from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export const showToastMessage = (message: string, type: ToastType) => {
  const options = {
    duration: 3000,
    style: {
      background: '#1a1a1a',
      color: '#fff',
      border: '1px solid #333',
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '13px',
    },
  };

  switch (type) {
    case 'success': toast.success(message, options); break;
    case 'error':   toast.error(message, options);   break;
    default:        toast(message, options);
  }
};