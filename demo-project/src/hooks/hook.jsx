import { useEffect } from 'react';

const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    if (!socket || !handlers) return;

    // Register event handlers
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handlers]); 
};

export default useSocketEvents;
