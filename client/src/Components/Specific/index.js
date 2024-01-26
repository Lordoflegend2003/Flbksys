import Navbarr from "../Navbar/Navbar"
import axios from 'axios';
import { useState, useEffect } from "react";
import Footerr from "../Footer.js/Footerr"

export default function Userpage(){
    const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        const tickets = process.env.REACT_APP_TICKETS;
        const userId = '123'; 
        const response = await axios.get(tickets);
        setUserTickets(response.data); 
      } catch (error) {
        console.error('Error fetching user tickets:', error);
      }
    };

    fetchUserTickets();
  }, []);

  return (
    <>
    <Navbarr/>
    <div>
      <h1>User Tickets</h1>
      <ul>
        {userTickets.map((ticket) => (
          <li key={ticket.id}>
            {/* Display ticket information */}
            <p>Ticket ID: {ticket.id}</p>
            <p>Flight Number: {ticket.flightNumber}</p>
            <p>Departure: {ticket.departure}</p>
            <p>Destination: {ticket.destination}</p>
            {/* Add other ticket details you want to display */}
          </li>
        ))}
      </ul>
    </div>
    <Footerr/>
    </>
  );
};