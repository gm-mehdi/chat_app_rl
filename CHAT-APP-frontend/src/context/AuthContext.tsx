import React, { createContext, useContext, useState } from "react";

interface AuthUser {
    _id: string;
    fullName: string;
    username: string;
    profilePic: string;
    token: string;
}

interface AuthContextType {
    authUser: AuthUser | null;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storedUser = localStorage.getItem("chat-user");
    const [authUser, setAuthUser] = useState<AuthUser | null>(
        storedUser ? JSON.parse(storedUser) : null
    );

    const value = React.useMemo(
        () => ({ authUser, setAuthUser }), 
        [authUser]
    );
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};