import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { CREATE_CHANNEL_ROUTE, GET_ALL_CONTACTS_ROUTES } from "@/utils/constants";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";
import { ScrollArea } from "@/components/ui/scroll-area";

const CreateChannel = () => {
    const { setSelectedChatType, setSelectedChatData, addChannel } = useAppStore();
    const [newChannelModel, setNewChannelModel] = useState(false);
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [channelName, setChannelName] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES, { withCredentials: true });
                setAllContacts(response.data.contacts);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };
        getData();
    }, []);

    const createChannel = async () => {
        try {
            if (selectedContacts.length > 0 && channelName) {
                const response = await apiClient.post(CREATE_CHANNEL_ROUTE, {
                    name: channelName,
                    members: selectedContacts.map((contact) => contact.value),
                }, { withCredentials: true });

                if (response.status === 201) {
                    setChannelName("");
                    setSelectedContacts([]);
                    setNewChannelModel(false);
                    addChannel(response.data.channel);
                }
            }
        } catch (error) {
            console.error('Error creating channel:', error);
        }
    };

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
                            onClick={() => setNewChannelModel(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
                        Create New Channel
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Dialog open={newChannelModel} onOpenChange={setNewChannelModel}>
                <DialogContent className="bg-[#181920] border-none text-white w-[90vw] md:w-[70vw] lg:w-[50vw] xl:w-[400px] h-[70vh] md:h-[50vh] flex flex-col rounded-3xl shadow-2xl p-6">
                    <DialogHeader className="flex flex-col items-center mb-4">
                        <DialogTitle className="text-2xl md:text-3xl font-semibold">
                            Create New Channel
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-400">
                           Add contact to make a Channel.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center w-full mb-6">
                        <Input
                            placeholder="Channel Name"
                            className="rounded-full p-4 w-full h-14 border-none shadow-sm focus:ring-2 focus:ring-[#3b82f6] text-black bg-white placeholder-gray-500"
                            onChange={(e) => setChannelName(e.target.value)}
                            value={channelName}
                        />
                    </div>
                    <div className="flex flex-col items-center w-full mb-6">
                        <MultipleSelector 
                            className="rounded-full p-4 w-full  border-none shadow-sm focus:ring-2 focus:ring-[#3b82f6] text-black bg-white placeholder-gray-500" 
                            defaultOptions={allContacts} 
                            placeholder="Search Contacts" 
                            value={selectedContacts} 
                            onChange={setSelectedContacts} 
                            emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600">No results found!</p>} 
                        />
                    </div>
                    <div className="w-full">
                        <Button 
                            className="w-full h-14 bg-[#3b82f6] hover:bg-blue-800 rounded-full transition-all duration-300"
                            onClick={createChannel}
                        >
                            Create Channel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateChannel;
