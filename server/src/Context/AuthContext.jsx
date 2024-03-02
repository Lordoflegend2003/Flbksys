import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tickets, setTickets] = useState([]); // Add tickets state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedTickets = JSON.parse(localStorage.getItem("tickets"));

    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }

    if (storedTickets) {
      setTickets(storedTickets);
    }
  }, []);

  const login = ({ userdata }) => {
    setIsLoggedIn(true);
    setUser(userdata);
    localStorage.setItem("user", JSON.stringify(userdata));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser([]);
    localStorage.removeItem("user");
    localStorage.removeItem("tickets");
  };

  const addTicket = (ticket) => {
    setTickets([...tickets, ticket]);
    localStorage.setItem("tickets", JSON.stringify([...tickets, ticket]));
  };

  const removeTicket = (ticketId) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        isLoggedIn,
        tickets,
        addTicket,
        removeTicket,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
