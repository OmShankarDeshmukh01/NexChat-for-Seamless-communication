import ProfileInfo from "./components/profile-info";
import logo from "/public/vite.png";
import logoText from "/public/NexChat-removebg.png";

const ContactsContainer = () => {
    return (
        <div className="relative w-full sm:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#0e0e10] border-r-2 border-[#2f303b]">
            <div className="pt-3">
                <Logo />
            </div>
            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Direct Messages" />
                </div>
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
        <div className="flex p-8 justify-start items-center gap-4">
            <img src={logoText} alt="NexChat Logo Text" width="300" height="20" /> {/* Adjust the width and height as needed */}
        </div>
    );
};

const Title = ({ text }) => {
    return (
        <h6 className="uppercase tracking-widest text-[#6a7bbd] pl-10 font-light text-opacity-90 text-sm">{text}</h6>
    );
};
