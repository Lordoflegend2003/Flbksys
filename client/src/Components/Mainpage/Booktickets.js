import React, { useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import flightmodule from "../../flight add.jpg";
import { Button } from "flowbite-react";

export default function BookTickets() {
  const navigate = useNavigate();

  const flight = useLocation().state.flights;

  const { tickets, addTicket } = useContext(AuthContext);

  const user = JSON.parse(localStorage.getItem("user") || {});

  // console.log(flight);

  const [totalSeats, setTotalSeats] = useState(0);

  const bookSeats = process.env.REACT_APP_BOOK_SEATS;

  const formattedDate = new Date(flight.date).toLocaleDateString();

  const seatsBooking = async () => {
    if (totalSeats === 0) {
      alert("Please Select number of seats to book");
    }

    if (totalSeats > flight.seats) {
      alert("Not enough seats available");
    }

    if (totalSeats <= flight.seats) {
      alert("Seats booked successfully");
    }

    try {
      const response = await axios.post(bookSeats, {
        useremail: user.email,
        flightID: flight.id,
        flightNumber: flight.flight_number,
        bookedSeats: totalSeats,
        destination: flight.destination,
        arrival: flight.departure,
        date: flight.date,
        time: flight.time,
      });

      console.log("Seats booked successfully:", response.data);

      const newTicket = {
        // Assuming the backend sends a ticketId
        flightNumber: flight.flight_number,
        bookedSeats: totalSeats,
        destination: flight.destination,
        arrival: flight.departure,
        date: flight.date,
        time: flight.time,
      };

      console.log(newTicket);

      const updatedTickets = [...tickets, newTicket];
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));

      addTicket(newTicket);
    } catch (error) {
      console.error("Error booking seats:", error);
    }
  };

  return (
    <div className="">
      <h1 className="text-center text-3xl mb-10">Book Tickets for flight </h1>
      <div className="flex flex-row justify-between">
        <div className="flex-1">
          <div className="">
            <h1 className="text-center text-3xl">Flights Details</h1>
            <div className="flex-1 justify-between ">
              <ul className="m-10">
                <li className="flex justify-around flex-row">
                  <h2 className="text-xl">Flight Number </h2>
                  <h2 className="text-xl">{flight.flight_number} </h2>
                </li>
                <li className="flex justify-around flex-row">
                  <h2 className="text-xl">Destination </h2>
                  <h2 className="text-xl">{flight.destination} </h2>
                </li>
                <li className="flex r justify-around flex-row">
                  <h2 className="text-xl text-center">Arrival</h2>
                  <h2 className="text-xl text-center">{flight.departure} </h2>
                </li>
                <li className="flex justify-around flex-row">
                  <h2 className="text-xl text-center">Date of travel </h2>
                  <h2 className="text-xl">{formattedDate} </h2>
                </li>
              </ul>
            </div>
            <div className="w-full align-middle justify-center">
              <label
                htmlFor="total-seats"
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >
                Tickets You Need
              </label>
              <input
                type="number"
                id="total-seats"
                onChange={(e) => setTotalSeats(e.target.value)}
                value={totalSeats}
                className="mr-10 block w-1/2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />

              <button
                type="submit"
                onClick={seatsBooking}
                class="text-white mt-10 ml-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Book Tickets
              </button>
            </div>
          </div>
        </div>
        <img src={flightmodule} className="w-1/3 h-1/3" />
      </div>
    </div>
  );
}
