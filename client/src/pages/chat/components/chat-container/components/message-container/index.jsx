import { useAppStore } from "@/store";
import { useEffect, useRef } from "react";
import moment from "moment";
import { apiClient } from "@/lib/api-client";
import { GET_ALL_MESSAGES_ROUTE, HOST } from "@/utils/constants";
import { MdFolderZip } from "react-icons/md";
import {IoMdArrowRoundDown} from "react-icons/io"

const MessageContainer = () => {
    const scrollRef = useRef();
    const { selectedChatType, selectedChatData, selectedChatMessages, userInfo, setSelectedChatMessages } = useAppStore();

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await apiClient.post(GET_ALL_MESSAGES_ROUTE, { id: selectedChatData._id }, { withCredentials: true });
                if (response.data.messages) {
                    setSelectedChatMessages(response.data.messages);
                }
            } catch (error) {
                console.log({ error });
            }
        };

        if (selectedChatData._id && selectedChatType === "contact") {
            getMessages();
        }
    }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedChatMessages]);

    const checkIfImage = (filePath) => {
        const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
        return imageRegex.test(filePath);
    };

    const renderMessages = () => {
        let lastDate = null;

        return selectedChatMessages.map((message, index) => {
            const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
            const showDate = messageDate !== lastDate;
            lastDate = messageDate;

            return (
                <div key={index}>
                    {showDate && (
                        <div className="text-center text-gray-500 my-2">
                            {moment(message.timestamp).format("LL")}
                        </div>
                    )}
                    {selectedChatType === "contact" && renderDMMessages(message)}
                </div>
            );
        });
    };

    const downloadFile = (file)=>{

    }

    const renderDMMessages = (message) => (
        <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
            {message.messageType === "text" && (
                <div
                    className={`${
                        message.sender !== selectedChatData._id
                            ? "bg-[#4c64a6] text-white/80 rounded-full border-[#010101] "
                            : "bg-[#010101] text-white/80 rounded-full border-white/50"
                    } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
                >
                    {message.content}
                </div>
            )}
            {message.messageType === "file" && (
                <div
                    className={`${
                        message.sender !== selectedChatData._id
                            ? "bg-[#4c64a6] text-white/80 border-[#010101] "
                            : "bg-[#010101] text-white/80 border-white/50"
                    } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
                >
                    {checkIfImage(message.fileUrl) ? (
                        <div className="cursor-pointer">
                            <img src={`${HOST}/${message.fileUrl}`} height={300} width={300} />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-5">
                            <span className="text-white/80 text-3xl bg-black/20 rounded-full p-3">
                                <MdFolderZip />
                            </span>
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {message.fileUrl.split("/").pop()}
                            </span>
                            <span className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300" onClick={()=>downloadFile(message.fileUrl)}> <IoMdArrowRoundDown/></span>
                        </div>
                    )}
                </div>
            )}
            <div className="text-xs text-gray-600">
                {moment(message.timestamp).format("LT")}
            </div>
        </div>
    );

    return (
        <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
            {renderMessages()}
            <div ref={scrollRef} />
        </div>
    );
};

export default MessageContainer;