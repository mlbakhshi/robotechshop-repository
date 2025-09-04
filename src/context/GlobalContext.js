import { createContext, useState, useContext } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [globalValue, setGlobalValue] = useState("http://localhost:8080");
    // const [globalValue, setGlobalValue] = useState("");

    return (
        <GlobalContext.Provider value={{ globalValue, setGlobalValue }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);