import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("admintoken") || "");
  const [trains, setTrains] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllTrains = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/admin/trains`);
      if (data.success) {
        setTrains(data.trains);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const searchTrains = async (key) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/admin/searchTrain/${key}`);
      if (data.success) {
        setTrains(data.trains);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const searchBookings = async (key) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/admin/bookings/${key}`);
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const getAllBookings = async () => {
    if (!adminToken) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/admin/bookings`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminToken) {
      getAllBookings();
    }
  }, [adminToken]);

  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    trains,
    getAllTrains,
    bookings,
    getAllBookings,
    loading,
    searchTrains,
    searchBookings
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
