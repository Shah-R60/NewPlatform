import React, { createContext, useContext, useRef } from 'react';
import { io } from 'socket.io-client';

const SIGNAL_SERVER = 'http://localhost:5000';
const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef();

  if (!socketRef.current) {
    socketRef.current = io(SIGNAL_SERVER, { autoConnect: true });
  }

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
