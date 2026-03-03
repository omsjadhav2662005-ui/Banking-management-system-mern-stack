import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
          notification.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
          'bg-blue-100 text-blue-800 border border-blue-200'
        }`}>
          <div className="flex items-center">
            <i className={`fas ${
              notification.type === 'success' ? 'fa-check-circle' :
              notification.type === 'error' ? 'fa-exclamation-circle' :
              'fa-info-circle'
            } mr-3`}></i>
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};