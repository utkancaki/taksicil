import React, { useContext, useState } from "react";

// you can define default values for code editor intellisense
// but it also good practice
// and use same obj in - see (1). for intellisense
export const UserContext = React.createContext({
  user: { email: "" },
  setUser: () => {},
});

// custom hook - it much faster to import only useUserContext
// instead of useContext(UserContext) every time
export const useUserContext = () => useContext(UserContext);

// but be awair. every component that uses this context, even if it
// uses only "set" function or another key (ex name, id)
// will be rerender.
// unless it works smoothly - it's ok i guess
// thats why redux or mobx - better for complex states
// also you can do optimization yourself

//also you can use useReducer instead useState - as you wish
export const UserContextProvider = (props) => {
  const { children } = props;
  //                                  (1)
  const [user, setUser] = useState({ email: "" });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
