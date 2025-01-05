import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        if (!selectedConversation?._id) return;
    
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:8000/api/messages/${selectedConversation._id}`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();
    
                if (!Array.isArray(data)) {
                    throw new Error("Invalid messages response");
                }
    
                setMessages(data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        getMessages();
    }, [selectedConversation?._id, setMessages]);
    
	return { messages, loading };
};
export default useGetMessages;