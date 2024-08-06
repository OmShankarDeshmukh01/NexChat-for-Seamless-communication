import ProfileInfo from "./components/profile-info";
import logoText from "/public/NexChat-removebg.png";
import NewDm from "./components/new-dm";
import { useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTES } from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "@/components/contact-list";

const ContactsContainer = () => {
    const { setDirectMessagesContacts, directMessagesContacts } = useAppStore();

    useEffect(() => {
        const getContacts = async () => {
            try {
                const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, { withCredentials: true });
                if (response.data.contacts) {
                    setDirectMessagesContacts(response.data.contacts);
                }
            } catch (error) {
                console.error("Failed to fetch contacts:", error);
            }
        };

        getContacts();
    }, [setDirectMessagesContacts]);

    return (
        <div className="relative w-full sm:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#0e0e10] border-r-2 border-[#2f303b]">
            <div className="pt-3">
                <Logo />
            </div>
            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Direct Messages" />
                    <NewDm />
                </div>
                <ContactList contacts={directMessagesContacts} />
            </div>
            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Channels" />
                </div>
            </div>
            <ProfileInfo />
        </div>
    );
};

export default ContactsContainer;

const Logo = () => {
    return (
        <div className="flex p-5 mt-0 justify-start items-center gap-4">
            <img src={logoText} alt="NexChat Logo Text" width="300" height="20" /> {/* Adjust the width and height as needed */}
        </div>
    );
};

const Title = ({ text }) => {
    return (
        <h6 className="uppercase tracking-widest text-[#6a7bbd] pl-10 font-light text-opacity-90 text-sm">{text}</h6>
    );
};