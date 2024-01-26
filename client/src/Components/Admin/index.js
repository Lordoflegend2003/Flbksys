import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footerr from "../Footer.js/Footerr";
import Navbarr from "../Navbar/Navbar";

// Styles for links
const linkStyle = {
  textDecoration: "none",
  margin: "0 10px",
};

// Style for link container
const linkContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  marginTop: "20px",
};

export default function Admin() {
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSeats, setSelectedSeats] = useState('');
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [flights, setFlights] = useState([]);
  const [id, setId] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(process.env.REACT_APP_FLIGHT_DATA);
          setFlights(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching flights:', error);
        }
      };

      fetchData();
    }, []);
    



    const handleSeatReservation = (id, availableSeats) => {
      const seatsToBook = prompt(`Enter seats to book (up to ${availableSeats}):`, '1');
      if (seatsToBook !== null && !isNaN(seatsToBook)) {
        const seats = parseInt(seatsToBook);
        const updatedFlights = flights.map((flight) =>
          flight.id === id ? { ...flight, seats: Math.max(0, Math.min(flight.seats - seats, availableSeats)) } : flight
        );
        setFlights(updatedFlights);
        alert(`Successfully booked ${seats} seat(s) for Flight ID ${id}`);
      }
    };

    const handleDeleteFlight = async (id) => {
      try {
        await axios.delete(`REACT_APP_FLIGHT_DATA_ID`);
        const updatedFlights = flights.filter((flight) => flight.id !== id);
        setFlights(updatedFlights);
        alert(`Successfully deleted Flight ID ${id}`);
      } catch (error) {
        console.error('Error deleting flight:', error);
      }
    };


    useEffect(() => {
      // Filtering flights based on criteria
      const filteredData = flights.filter((flight) => {
        const timeMatch = selectedTime ? flight.time === selectedTime : true;
        const dateMatch = selectedDate ? flight.date === selectedDate : true;
        const departureMatch = departure ? flight.departure.toLowerCase().includes(departure.toLowerCase()) : true;
        const destinationMatch = destination ? flight.destination.toLowerCase().includes(destination.toLowerCase()) : true;
        const flightNumberMatch = flightNumber ? flight.flightNumber.toLowerCase().includes(flightNumber.toLowerCase()) : true;
        return timeMatch && dateMatch && departureMatch && destinationMatch && flightNumberMatch;
      });

      setFilteredFlights(filteredData);
    }, [selectedTime, selectedDate, departure, destination, flightNumber, flights]);


  return (
    <>
      <Navbarr />
      <h1 className="max-w-lg text-3xl font-semibold leading-normal text-center text-gray-900 dark:text-white text-center">
        Welcome to admin panel
      </h1>
      <h1 className="max-w-lg text-3xl font-semibold leading-normal text-center text-gray-900 dark:text-white text-center">
        Current Scheduled Flights
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      Checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Departure
                </th>
                <th scope="col" className="px-6 py-3">
                  Destination
                </th>
                <th scope="col" className="px-6 py-3">
                  Flight Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Seats
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Mapping filtered flights data */}
              {filteredFlights.map((flight) => (
        <tr key={flight.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {/* Flight details */}
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${flight.id}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor={`checkbox-table-search-${flight.id}`} className="sr-only">
                        Checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {flight.departure}
                  </td>
                  <td className="px-6 py-4">
                    {flight.destination}
                  </td>
                  <td className="px-6 py-4">
                    {flight.flight_number}
                  </td>
                  <td className="px-6 py-4">
                    {flight.date}
                  </td>
                  <td className="px-6 py-4">
                    {flight.time}
                  </td>
                  <td className="px-6 py-4">
                    {flight.seats}
                  </td>
                  {/* Button to book a seat */}
                  <td className="px-6 py-4">
            <button onClick={() => handleDeleteFlight(flight.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
              Delete
            </button>
          </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      <div style={linkContainer}>
        <Link
          style={linkStyle}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          to="./nb"
        >
          Add new Flight
        </Link>
   
      </div>
      <Footerr />
    </>
  );
}
