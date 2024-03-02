import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./mainpage.css";
import { AuthContext } from "../../Context/AuthContext";
import Footerr from "../Footer.js/Footerr";
import img from "../../mark-olsen-K5j1KgecVC8-unsplash.jpg";

const MyComponent = () => {
  const navigate = useNavigate();

  const { isLoggedIn, login, logout, user } = useContext(AuthContext);

  const curuser = JSON.parse(localStorage.getItem("user")) || {};

  const curusermail = curuser.email;

  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  // const [setSeats, setSelectedSeats] = useState("");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [flights, setFlights] = useState([]);
  const [id, setId] = useState("");

  const [userName, setUserName] = useState("");
  const [tickets, setTickets] = useState(0);

  const flightdata = process.env.REACT_APP_FLIGHT_DATA;

  const finduser = process.env.REACT_APP_TICKETS;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(flightdata);

        const response2 = await axios.get(
          `${finduser}/userdetails/${curusermail}`
        );

        // console.log(response2.data.username);

        setUserName(response2.data.username);

        console.log(userName);

        setFlights(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchData();
  }, []);

  // const date = new Date(selectedTime);
  // const day = date.getDate().toString().padStart(2, '0');
  // const month = (date.getMonth() + 1).toString().padStart(2, '0');
  // const year = date.getFullYear();
  // const  = `${day}/${month}/${year}`;

  const handleSeatReservation = (flights) => {
    navigate("../booktickets", { state: { flights } });
  };

  useEffect(() => {
    // Filtering flights based on criteria
    const filteredData = flights.filter((flight) => {
      const timeMatch = selectedTime ? flight.time === selectedTime : true;
      const dateMatch = selectedDate ? flight.date === selectedDate : true;
      const departureMatch = departure
        ? flight.departure.includes(departure.toLowerCase())
        : true;
      const destinationMatch = destination
        ? flight.destination.toLowerCase().includes(destination.toLowerCase())
        : true;
      const flightNumberMatch = flightNumber
        ? flight.flightNumber.toLowerCase().includes(flightNumber.toLowerCase())
        : true;
      return (
        timeMatch &&
        dateMatch &&
        departureMatch &&
        destinationMatch &&
        flightNumberMatch
      );
    });

    setFilteredFlights(filteredData);
  }, [
    selectedTime,
    selectedDate,
    departure,
    destination,
    flightNumber,
    flights,
  ]);

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleDepartureChange = (e) => {
    setDeparture(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleFlightNumberChange = (e) => {
    setFlightNumber(e.target.value);
  };

  const handleModalSubmit = async () => {
    try {
      // Make an API call to store data in the database
      const bookingsData = process.env.REACT_APP_BOOKING_NEW;
      const response = await axios.post(bookingsData, {
        flightNumber: flightNumber,
        userName: userName,
        tickets: tickets,
      });

      console.log("Data stored successfully:", response.data);
      // You may perform additional actions upon successful data storage
    } catch (error) {
      console.error("Error storing data:", error);
      // Handle error while storing data
    }
  };

  const renderSearchBar = () => {
    return (
      <div className="flex justify-evenly mb-4 mt-7 mr-5 ml-5 ">
        <input
          type="text"
          placeholder="Flight Number"
          value={flightNumber}
          onChange={handleFlightNumberChange}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Departure"
          value={departure}
          onChange={handleDepartureChange}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={handleDestinationChange}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          min={new Date().toISOString().split("T")[0]}
          className="p-2 border border-gray-300 rounded-lg"
        />

        <input
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          min={
            new Date()
              .toLocaleTimeString("en-US", { hour12: false })
              .split(":")[0] + ":00"
          }
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>
    );
  };

  return isLoggedIn ? (
    <div className="h-100vh">
      <Navbar />
      <div styles={{ backgroundImage: `url(${img})` }}>
        <h1 className="text-center text-2xl py-5">
          Welcome to Airways India {userName} !!
        </h1>
        <h5 className="text-center text-2xl py-5">Filter Flights</h5>
        {/* <img src={img} alt="" className="w-full h-20 z-" /> */}
      </div>
      {renderSearchBar()}
      <h5 className="text-center text-2xl py-5">Current Flights</h5>
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
              <tr
                key={flight.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {/* Flight details */}
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${flight.id}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`checkbox-table-search-${flight.id}`}
                      className="sr-only"
                    >
                      Checkbox
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {flight.departure}
                </td>
                <td className="px-6 py-4">{flight.destination}</td>
                <td className="px-6 py-4">{flight.flight_number}</td>
                <td className="px-6 py-4">{flight.date}</td>
                <td className="px-6 py-4">{flight.time}</td>
                <td className="px-6 py-4">{flight.seats}</td>
                {/* Button to book a seat */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleSeatReservation(flight)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Book Seat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footerr />
    </div>
  ) : (
    navigate("/")
  );
};

export default MyComponent;
