import { createContext } from "react";
export const ServerContext=createContext();
export function Context({children}){
    const serverurl="http://localhost:8080"
    const value={
        serverurl,
    }
    return(
        <ServerContext.Provider value={value}>
        {children}
        </ServerContext.Provider>
    )
}