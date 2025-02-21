import { createContext } from "react";
import { trains } from "../assets/assets";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const value = {
        trains
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider