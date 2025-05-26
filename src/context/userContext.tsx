'use client';

import React, { createContext, useEffect, useState } from "react";

export type UserContext = {
    user: string | null,
    storeUser: (val: string) => void
    removeUser: () => void
}

const initContext: UserContext = {
    user: "",
    storeUser: () => {},
    removeUser: () => {}
}

const userContext = createContext<UserContext>(initContext);

export default userContext;

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const storeUser = (val: string) => {
        localStorage.setItem("user", JSON.stringify(val));
        setUser(val);
    }

    const removeUser = () => {
        localStorage.removeItem("user");
        setUser(null)
    }

    return <userContext.Provider value={{ user, storeUser, removeUser }}>{children}</userContext.Provider>
}