import { createContext, useEffect, useState } from "react";
// import { trains } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const [trains, setTrains] = useState([])

    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false)

    const [userData, setUserData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllTrains = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/trains")
            if (data.success) {
                setTrains(data.trains)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const loadUserProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/user/profile", {
                headers: { token }
            })
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAllTrains()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfile()
        } else {
            setUserData(false)
        }
    }, [token])

    const value = {
        trains,
        getAllTrains,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfile
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider