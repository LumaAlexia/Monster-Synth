import { createContext, useContext, ReactNode, useState, useEffect } from "react";
// Importazione corretta per socket.io-client
import io from "socket.io-client";

// Definizione del tipo Socket usando ReturnType
type SocketType = ReturnType<typeof io>;

interface WebSocketContextType {
  socket: SocketType | null;
  isConnected: boolean;
  connect: (userId: string, userName: string, userImage: string) => void;
  disconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
  connect: () => {},
  disconnect: () => {},
});

export const useWebSocket = () => useContext(WebSocketContext);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [socket, setSocket] = useState<SocketType | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = (userId: string, userName: string, userImage: string) => {
    // Utilizziamo l'URL del server WebSocket
    const socketInstance = io("http://localhost:3001");
    
    socketInstance.on("connect", () => {
      setIsConnected(true);
      console.log("WebSocket connesso");
      
      // Identifichiamo l'utente al server
      socketInstance.emit("identify", { userId, userName, userImage });
    });
    
    socketInstance.on("disconnect", () => {
      setIsConnected(false);
      console.log("WebSocket disconnesso");
    });
    
    socketInstance.on("connect_error", (error: Error) => {
      console.error("Errore di connessione WebSocket:", error);
      setIsConnected(false);
    });
    
    setSocket(socketInstance);
  };
  
  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  };
  
  // Pulizia alla disinstallazione del componente
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);
  
  return (
    <WebSocketContext.Provider value={{ socket, isConnected, connect, disconnect }}>
      {children}
    </WebSocketContext.Provider>
  );
};
