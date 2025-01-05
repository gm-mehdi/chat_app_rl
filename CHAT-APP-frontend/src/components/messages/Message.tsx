import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

interface MessageProps {
    message: {
        senderId: string;
        receiverId: string;
        message: string;
        _id: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
        shouldShake?: boolean;
    };
}

const Message: React.FC<MessageProps> = ({ message }) => {
    const { authUser } = useAuthContext() as unknown as { authUser: { _id: string; profilePic: string } };
    const { selectedConversation } = useConversation();

    // Debug logs
    console.log("Full message object:", message);
    console.log("Full authUser object:", authUser);

    // Check if message or authUser is undefined
    if (!message || !authUser) {
        console.log("Message or authUser is undefined");
        return null;
    }

    // Check the actual values before comparison
    const fromMe = message.senderId === authUser._id;
    console.log(`Comparing senderId: ${message.senderId} with authUser._id: ${authUser._id}`);
    console.log(`fromMe result: ${fromMe}`);

    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const shakeClass = message.shouldShake ? "shake" : "";

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Tailwind CSS chat bubble component' src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
                {typeof message.message === 'string' ? message.message : JSON.stringify(message.message)}
            </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
    );
};

export default Message;