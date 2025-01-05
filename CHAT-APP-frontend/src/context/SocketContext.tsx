import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";

// Define the type for the SocketContext
interface SocketContextType {
	socket: Socket | null;
	onlineUsers: string[]; // Assuming online users are represented by their IDs
}

// Create a context with the defined type or null as the initial value
const SocketContext = createContext<SocketContextType | null>(null);

// Custom hook to use the SocketContext
export const useSocketContext = (): SocketContextType => {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error("useSocketContext must be used within a SocketContextProvider");
	}
	return context;
};

// SocketContextProvider component
export const SocketContextProvider = ({ children }: { children: ReactNode }) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			// Establish a socket connection
			const socketConnection = io("https://chat-app-backend-9rvc.onrender.com", {
				query: {
					userId: authUser._id,
				},
			});
	
			setSocket(socketConnection);
	
			// Listen for online users update
			socketConnection.on("getOnlineUsers", (users: string[]) => {
				setOnlineUsers(users);
			});
	
			// Cleanup on unmount
			return () => {
				socketConnection.close(); // Ensure this is void
			};
		} else if (socket) {
			socket.close();
			setSocket(null);
		}
	}, [authUser]);
	

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
