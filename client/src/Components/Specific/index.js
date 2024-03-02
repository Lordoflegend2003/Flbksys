import React, { useState, useEffect } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import Navbarr from "../Navbar/Navbar";
import Footerr from "../Footer.js/Footerr";

import FBSLogo from "../../flight add.jpg";

export default function Userpage() {
  const [userTickets, setUserTickets] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || {});
  const emaill = user.email;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketEndpoint = `${process.env.REACT_APP_TICKETS}/flights-tickets/${emaill}`;
        const response = await axios.get(ticketEndpoint);
        setUserTickets(response.data);
        localStorage.setItem("tickets", JSON.stringify(response.data));
      } catch (err) {
        console.log(`Error fetching tickets: ${err}`);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = async (flightNumber) => {
    try {
      const ticketEndpoint = `${process.env.REACT_APP_TICKETS}/${emaill}/${flightNumber}`;
      const response = await axios.delete(ticketEndpoint);

      if (response.status === 200) {
        alert("Ticket deleted successfully");
        setUserTickets((prevTickets) =>
          prevTickets.filter(
            (userTickets) => userTickets.flightnumber !== flightNumber
          )
        );
      }
    } catch (err) {
      console.log(`Error deleting the ticket: ${err}`);
    }
  };

  const exportToPdf = () => {
    console.log("clicked");
    const element = document.getElementById("flight-details");
    html2pdf(element);
  };

  return (
    <>
      <Navbarr />
      <h1 className="text-center font-medium text-3xl">User Tickets</h1>
      <div className="flex flex-row justify-evenly p-10">
        {userTickets.map((ticket, index) => (
          <div
            key={index}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Flight Number : {ticket.flightnumber}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Booked Seats: {ticket.bookedseats}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Destination: {ticket.destination}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Arrival: {ticket.arrival}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Date: {ticket.date}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Time: {ticket.time}
            </p>
            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleDelete(ticket.flightnumber)}
            >
              Delete Ticket
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={exportToPdf}
        >
          Download as PDF
        </button>
      </div>

      <Footerr />
    </>
  );
}
