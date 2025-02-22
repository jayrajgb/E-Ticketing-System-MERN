import { createContext, useState } from "react";
import axios from "axios";
export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [adminToken, setAdminToken] = useState(localStorage.getItem("admintoken") ? localStorage.getItem("admintoken") : "")

    const [trains, setTrains] = useState([])
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllTrains = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/trains")
            if(data.success){
                setTrains(data.trains)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        adminToken,
        setAdminToken,
        backendUrl,
        trains,
        getAllTrains
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider