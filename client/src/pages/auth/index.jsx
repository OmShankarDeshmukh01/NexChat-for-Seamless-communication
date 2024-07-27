import Background from "@/assets/Welcome.mp4";
import Emoji from "@/assets/duck.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {apiClient} from "@/lib/api-client";
import { SIGNUP_ROUTE } from "@/utils/constants";

const Auth = () => {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const validateSignup = () =>{
        if(!email.length){
            toast.error("Email is required !");
            return false;
        }
        if(!password.length){
            toast.error("Password is required !");
            return false;
        }
        if(password !== confirmPassword){
           toast.error("Password and confirm password should be same !") ;
           return false;
        }
        return true;
    };

    const handleLogin = async () => {
        // handle login
    };
    const handleSignup = async () => {
        if(validateSignup()){
            const response  = await apiClient.post(SIGNUP_ROUTE,{email ,password});
            console.log({response});
        }
    };

    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="h-[80vh] border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl flex flex-col md:flex-row" style={{ backgroundColor: '#E3F2FF' }}>
                <div className="flex flex-col gap-10 items-center justify-center p-5 w-full md:w-1/2">
                    <div className="flex items-center justify-center flex-col">
                        <div className="flex items-center justify-center">
                            <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
                            <img src={Emoji} alt="welcome emoji" className="h-[70px] ml-3" />
                        </div>
                        <p className="font-medium text-center">Fill in the details to get started with <b>NexChat</b>!</p>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <Tabs className="w-3/4">
                            <TabsList className="bg-transparent rounded-1xl w-full">
                                <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-1xl w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-blue-800 p-3 transition-all duration-300">Login</TabsTrigger>
                                <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-1xl w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-blue-800 p-3 transition-all duration-300">Signup</TabsTrigger>
                            </TabsList>
                            <TabsContent className="flex flex-col gap-5 mt-5" value="login">
                                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e) => setemail(e.target.value)} />
                                <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Button className="rounded-full p-6" style={{ backgroundColor: '#6a7bbd' }} onMouseOver={(e) => e.target.style.backgroundColor = '#4c64a6'} onMouseOut={(e) => e.target.style.backgroundColor = '#6a7bbd'} onClick={handleLogin}>Login</Button>
                            </TabsContent>
                            <TabsContent className="flex flex-col gap-5" value="signup">
                                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e) => setemail(e.target.value)} />
                                <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Input placeholder="Confirm Password" type="password" className="rounded-full p-6" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
                                <Button className="rounded-full p-6" style={{ backgroundColor: '#6a7bbd' }} onMouseOver={(e) => e.target.style.backgroundColor = '#4c64a6'} onMouseOut={(e) => e.target.style.backgroundColor = '#6a7bbd'} onClick={handleSignup}>Signup</Button>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className="hidden md:flex justify-center items-center w-full md:w-1/2">
                    <video autoPlay loop muted className="h-full w-full object-cover rounded-3xl">
                        <source src={Background} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
};

export default Auth;
