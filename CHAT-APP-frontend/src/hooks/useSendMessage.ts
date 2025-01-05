import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext"; // Add this import

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const { authUser } = useAuthContext(); // Add this hook

    const sendMessage = async (messageText: string) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ 
                    message: messageText,
                    // Include any other necessary fields
                }),
            });

            const data = await res.json();
            console.log("Server response:", data);

            if (data.error) throw new Error(data.error);

            // Create a properly structured message object
            const newMessage = {
                message: messageText,
                senderId: authUser?._id,  // Now authUser is available
                createdAt: new Date().toISOString(),
                _id: data._id || Date.now().toString(),
                // Add other fields as needed
            };

            setMessages([...messages, newMessage]);
        } catch (error:any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;