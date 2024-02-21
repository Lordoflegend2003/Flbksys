import Navbarr from "../Navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import Footerr from "../Footer.js/Footerr";

export default function Userpage() {
  const [userTickets, setUserTickets] = useState([]);

  const handledelete = async (e) => {
    e.preventDefault();
    try{
      const ticket = process.env.REACT_APP_TICKETS + "123";
      const response = await axios.delete(ticket);
      console.log(response.data);
    }
    catch(err){
      console.log(`error deleting the ticket: ${err}`);
    }

  }

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        const tickets = process.env.REACT_APP_TICKETS + "123";
        const response = await axios.get(tickets);
        setUserTickets(response.data);
      } catch (error) {
        console.error("Error fetching user tickets:", error);
      }
    };

    fetchUserTickets();
  }, []);

  return (
    <>
      <Navbarr />
      <div>
        <h1 className="text-center font-medium text-3xl">User Tickets</h1>
        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Abcdefg
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            New York
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400" p>
            Los Angeles
          </p>
          <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
          onClick={(e) => handledelete(e)}
          >
            Delete Ticket
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
      <Footerr />
    </>
  );
}
