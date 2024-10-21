"use client";
import { config } from "@/utils/config";
import { useAppDispatch } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}
const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<{
  token: string;
  children: React.ReactNode;
}> = ({ token, children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

    useEffect(() => {
    if (token) {
      const socketInstance = io(`${config?.server}`, {
        auth: { token },
      });
      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        console.log("Connected with socket id:", socketInstance?.id);
      });

      socketInstance.on("data", (data: any) => {
        // switch (data.type) {
        //   case "CATEGORIES": //render sidebar categories and events
           
          
        //   default:
        //     break;
        // }
        //
      });

      socketInstance.on("error", (error) => {
        toast.remove();
        toast.error(`Error from server: ${error.message}`);
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};