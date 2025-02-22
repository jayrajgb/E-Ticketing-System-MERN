import { createContext } from "react";

export const TrainContext = createContext()

const TrainContextProvider = (props) => {
    const value = {

    }
    return (
        <TrainContext.Provider value={value}>
            {props.children}
        </TrainContext.Provider>
    )
}

export default TrainContextProvider