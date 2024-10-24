"use client";
import {
  addUser,
  removeUser,
  updateUser,
} from "@/redux/features/activeUsersSlice";
import { config } from "@/utils/config";
import { useAppDispatch } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

export enum eventType {
  JOIN_PLATFORM = "join_platform",
  ENTER_GAME = "enter_game",
  EXIT_GAME = "exit_game",
  EXIT_PLATFORM = "exit_platform",
}

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

      socketInstance.on("activeUsers", (activeUsers: any[]) => {
        // Add all active users when the manager connects
        activeUsers.forEach((user) => {
          dispatch(
            addUser({
              username: user.username,
              playerData: {
                credits: user.credits,
                activeGame: user.currentGame,
              },
            })
          );
        });
      });

      socketInstance.on("player", (data: any) => {
        switch (data.type) {
          case "join_platform":
            console.log("DATA : ", data);
            dispatch(
              addUser({
                username: data?.data?.username,
                playerData: { credits: data?.data.credits, activeGame: null },
              })
            );
            break;
          case "enter_game":
            dispatch(
              updateUser({
                username: data?.data?.username,
                activeGame: data?.data?.gameId,
              })
            );
            break;
          case "exit_game":
            dispatch(
              updateUser({ username: data?.data?.username, activeGame: null })
            );
            break;
          case "exit_platform":
            dispatch(removeUser({ username: data?.data?.username }));
            break;
          default:
            console.warn(`Unhandled event type: ${data.type}`);
        }
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
