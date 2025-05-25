'use client';

import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

export type UserContext = {
    user: string | null,
    storeUser: (val: string) => void
}

const initContext: UserContext = {
    user: "",
    storeUser: (val: string) => {}
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

    return <userContext.Provider value={{ user, storeUser }}>{children}</userContext.Provider>
}