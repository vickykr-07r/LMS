import { useContext, useEffect } from "react";
import { ServerContext } from "../Context/Context.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userSlice.js";
const GetCurrentUser = () => {
  const { serverurl } = useContext(ServerContext);
          const dispatch=useDispatch()
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get(`${serverurl}/api/user/getcurrent`,{ withCredentials: true });
       dispatch(setUserData(res.data));
      } catch (error) {
        console.error(
          error.response?.data?.message || error.message
        );
      }
    };

    getCurrentUser();
  }, [serverurl]);

  return null;
};

export default GetCurrentUser;
