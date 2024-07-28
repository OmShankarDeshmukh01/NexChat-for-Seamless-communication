import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useAppStore } from "@/store";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
    const { userInfo } = useAppStore();
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
    const { userInfo } = useAppStore();
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? <Navigate to="/chat" /> : children;
};

const App = () => {
    const { userInfo, setUserInfo } = useAppStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = Cookies.get('jwt');
                if (token) {
                    const response = await apiClient.get(GET_USER_INFO, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserInfo(response.data.user);
                }
            } catch (err) {
                console.log({ err });
            } finally {
                setLoading(false);
            }
        };

        if (!userInfo) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, [userInfo, setUserInfo]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
                <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="*" element={<Navigate to={userInfo?.profileSetup ? "/chat" : "/profile"} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;