import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Custom hook
const useUser = () => {
  const userContext = useContext(AuthContext);

  return userContext;
};

export default useUser;
