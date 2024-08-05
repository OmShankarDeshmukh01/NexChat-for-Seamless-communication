import { useSocket } from "@/context/SocketContext";
import { useAppStore } from "@/store";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

const MessageBar = () => {
    const { selectedChatType, selectedChatData, userInfo } = useAppStore();
    const socket = useSocket();
    const emojiRef = useRef(null);
    const [message, setMessage] = useState("");
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setEmojiPickerOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [emojiRef]);

    const handleAddEmoji = (emoji) => {
        setMessage((msg) => msg + emoji.emoji);
    };

    const handleSendMessage = () => {
        if (selectedChatType === "contact" && socket) {
            socket.emit("sendMessage", {
                sender: userInfo.id,
                content: message,
                recipient: selectedChatData._id,
                messageType: "text",
                fileUrl: undefined,
            });
            setMessage(""); // Clear the input field after sending the message
        }
    };

    return (
        <div className="h-[10vh] bg-[#050406] flex justify-center items-center px-8 gap-6">
            <div className="flex-1 flex bg-[#2a2b33] rounded-full items-center gap-5 pr-5">
                <input
                    type="text"
                    className="flex-1 p-4 bg-transparent rounded-full focus:border-none focus:outline-none"
                    placeholder="Enter Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="text-neutral-500 focus:border-none focus:outline-none hover:text-white duration-300 transition-all">
                    <GrAttachment className="text-2xl" />
                </button>
                <div className="relative">
                    <button
                        className="text-neutral-500 focus:border-none focus:outline-none hover:text-white duration-300 transition-all"
                        onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                    >
                        <RiEmojiStickerLine className="text-2xl" />
                    </button>
                    {emojiPickerOpen && (
                        <div className="absolute bottom-16 right-0" ref={emojiRef}>
                            <EmojiPicker
                                theme="dark"
                                onEmojiClick={handleAddEmoji}
                                autoFocusSearch={false}
                            />
                        </div>
                    )}
                </div>
            </div>
            <button
                className="bg-[#6a7bbd] rounded-full flex items-center justify-center p-4 focus:border-none hover:bg-[#4c64a6] focus:outline-none focus:text-white duration-300 transition-all shadow-lg"
                onClick={handleSendMessage}
            >
                <IoSend className="text-2xl text-white" />
            </button>
        </div>
    );
};

export default MessageBar;
