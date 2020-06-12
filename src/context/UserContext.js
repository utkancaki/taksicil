import React, { useContext, useState } from "react";

export const UserContext = React.createContext({
  user: { email: "" },
  setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState({ email: "" });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
