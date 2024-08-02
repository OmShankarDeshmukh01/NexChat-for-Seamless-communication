import { useAppStore } from "@/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { colors } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import profileBg from "@/assets/profile.png";

const Profile = () => {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useAppStore();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [selectedColor, setSelectedColor] = useState(0);

    const saveChanges = async () => {
        // save changes logic here
    };

    return (
        <div className="bg-[#E3F2FF] h-[100vh] w-[100vw] flex items-center justify-center">
            <div className="h-[80vh] border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl flex flex-col items-center justify-center relative" style={{ backgroundImage: `url(${profileBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute top-5 left-5">
                    <div className="rounded-full border-2 border-gray-700 p-2 cursor-pointer" onClick={() => navigate(-1)}>
                        <IoArrowBack className="text-4xl lg:text-6xl text-black/90" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center justify-center w-full px-5">
                    <div className="flex flex-col items-center">
                        <div
                            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center mx-auto"
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-gray-700 shadow-lg shadow-gray-500/50">
                                {image ? (
                                    <AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-black" />
                                ) : (
                                    <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                                        {firstName ? firstName.charAt(0) : userInfo.email.charAt(0)}
                                    </div>
                                )}
                            </Avatar>
                            {hovered && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full">
                                    {image ? (
                                        <FaTrash className="text-white text-3xl cursor-pointer" />
                                    ) : (
                                        <FaPlus className="text-white text-3xl cursor-pointer" />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex gap-5 mt-5">
                            {colors.map((color, index) => (
                                <div 
                                    className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 border-2 border-gray-700 ${selectedColor === index ? "bg-opacity-70" : ""}`} 
                                    key={index} 
                                    onClick={() => setSelectedColor(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 text-black items-center justify-center w-full">
                        <Input placeholder="Email" type="email" disabled value={userInfo.email} className="rounded-full p-6 bg-[#2c2e3b] text-white border-none w-full md:w-3/4" />
                        <Input placeholder="First Name" type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} className="rounded-full p-6 bg-[#2c2e3b] text-white border-none w-full md:w-3/4" />
                        <Input placeholder="Last Name" type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} className="rounded-full p-6 bg-[#2c2e3b] text-white border-none w-full md:w-3/4" />
                    </div>
                </div>
                <Button className="rounded-full p-6 bg-[#6a7bbd] transition-all duration-300 hover:bg-[#4c64a6] active:scale-95 mt-5" onClick={saveChanges}>
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default Profile;