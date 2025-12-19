import { useContext, useEffect } from "react";
import { ServerContext } from "../Context/Context.jsx";
import axios from "axios";

const GetCurrentUser = () => {
  const { serverurl } = useContext(ServerContext);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await axios.get(
          `${serverurl}/api/user/getcurrent`,
          { withCredentials: true }
        );
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCurrentUser();
  }, [serverurl]);

  return null;
};

export default GetCurrentUser;
