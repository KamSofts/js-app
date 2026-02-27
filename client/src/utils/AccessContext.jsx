import { createContext, useState, useEffect, useContext } from "react";
import api from "./api";

export const AccessContext = createContext(null);
// export const AccessContext = createContext({
//     user: null,
//     fetched: false,
//     login: async () => false
// });

export const AccessProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [fetched, setFetched] = useState(false);
    const login = async (data) => {
        let success = false;
        try {
            const result = await api.post("/auth/login", data);
            if (result.data.message === "Login success") {
                await fetchUser();
                success = true;
            }
        } catch (error) {
            setUser(null);
            console.log(error);
        }
        return success;
    };

    const fetchUser = async () => {
        try {
            const result = await api.get("/auth/access");
            setUser(result.data);
        } catch (error) {
            setUser(null);
            console.log(error);
        } finally {
            setFetched(true);
        }
    };

    const logout = async () => {
        try {
            await api.get("/auth/logout");
            setUser(null);
        } catch (error) {
            setUser(null);
            console.log(error);
        }
    };

    useEffect(() => { fetchUser(); }, []);

    return <AccessContext.Provider value={{ user, fetched, login, logout }}>{children}</AccessContext.Provider>
};

export const useAccess = () => useContext(AccessContext);
