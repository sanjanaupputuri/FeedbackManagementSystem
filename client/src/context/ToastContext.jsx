import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const toast = {
    success: (message) => addToast(message, 'success'),
    error: (message) => addToast(message, 'error'),
    info: (message) => addToast(message, 'info'),
    warning: (message) => addToast(message, 'warning')
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
        {toasts.map(({ id, message, type }) => (
          <div key={id} className={`toast show align-items-center text-white bg-${type === 'error' ? 'danger' : type} border-0`} role="alert">
            <div className="d-flex">
              <div className="toast-body">{message}</div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => removeToast(id)}></button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
