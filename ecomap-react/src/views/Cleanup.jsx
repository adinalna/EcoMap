import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Maps from "../components/Pages/Cleanup/Maps";
import axiosClient from "../axios-client.js";
import axios from "axios";
import "../style.css";

// Set the app element for react-modal
Modal.setAppElement("#root");

const Cleanup = () => {
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [additionalModalIsOpen, setAdditionalModalIsOpen] = useState(false);
  const [cleanupEvents, setCleanupEvents] = useState([]);
  const [joinModalIsOpen, setJoinModalIsOpen] = useState(false);

  const openJoinModal = () => {
    setJoinModalIsOpen(true);
    setCreateModalIsOpen(false);
    setAdditionalModalIsOpen(false);
    const userId = 1;
    // Fetch cleanup events when the modal is opened
    axios
      .get(`http://localhost:8080/api/cleanup/filteredList?userID=${userId}`)
      .then((response) => {
        setCleanupEvents(response.data);
        setJoinModalIsOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching cleanup events:", error);
      });
  };

  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [xCoordinate, setXCoordinate] = useState("");
  const [yCoordinate, setYCoordinate] = useState("");
  const [privacyType, setType] = useState(true);
  const [specificCleanup, setSpecificCleanup] = useState([]);
 
  const handleSearch = async (eventName) => {
    try {
      // Check if the event name is empty
      if (!eventName) {
        alert("Please enter an event code");
        return;
      }
      // Make a GET request using Axios
      const response = await axios.get(
        `http://localhost:8080/api/cleanup/findSpecific?cleanupID=${eventName}`
      );
  
      // Check if the response contains cleanup data
      if (response.data) {
        console.log("Cleanup data:", response.data);
        setSpecificCleanup([response.data]);
      } else {
        // If no cleanup data is found, show an alert
        alert("No cleanup data found for the given ID");
      }
    } catch (error) {
      // Handle errors
      console.error(
        "Error searching cleanup event:",
        error.response ? error.response.data : error.message
      );
    }
  
    console.log("Searching for:", eventName);
    // Add the rest of your search logic here
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanupData = {
      name: eventName,
      location_x: xCoordinate,
      location_y: yCoordinate,
      description: description,
      date: date,
      image: null,
      isPublic: privacyType,
    };

    try {
      // Make a POST request using Axios
      const response = await axios.post(
        "http://localhost:8080/api/cleanup/create",
        cleanupData
      );
      alert("Cleanup event created successfully", response.data);
      // Handle the response as needed
      console.log("Cleanup event created successfully:", response.data);
    } catch (error) {
      // Handle errors
      console.error(
        "Error creating cleanup event:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleJoinEvent = async (cleanupId) => {
    const userId = 1;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/usercleanup/find?userId=${userId}&cleanupId=${cleanupId}`
      );
      alert("User has successfully joined the Cleanup", response.data);
      // Update the frontend by removing the joined event
      setCleanupEvents((prevCleanupEvents) =>
        prevCleanupEvents.filter((cleanup) => cleanup.id !== cleanupId)
      );
    } catch (error) {
      console.error(
        "Error joining cleanup event:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const openCreateModal = () => {
    setCreateModalIsOpen(true);
    setJoinModalIsOpen(false);
    setAdditionalModalIsOpen(false);
  };

  const openAdditionalModal = () => {
    setAdditionalModalIsOpen(true);
    setCreateModalIsOpen(false);
    setJoinModalIsOpen(false);
  };

  const closeModals = () => {
    setCreateModalIsOpen(false);
    setJoinModalIsOpen(false);
    setAdditionalModalIsOpen(false);
  };

  const smallCloseModal = () => {
    setCreateModalIsOpen(true);
    setJoinModalIsOpen(false);
    setAdditionalModalIsOpen(false);
  };

  const handleCoordinateChange = (newXCoordinate, newYCoordinate) => {
    setXCoordinate(newXCoordinate);
    setYCoordinate(newYCoordinate);
  };

  return (
    <div className="cleanup-container">
      <div className="cleanup-buttons">
        <button onClick={openCreateModal}>Create a Cleanup</button>
        <button onClick={openJoinModal}>Join a Cleanup</button>
      </div>

      <div className="dual-modals-container">
        <Modal
          isOpen={createModalIsOpen || additionalModalIsOpen}
          onRequestClose={closeModals}
          contentLabel="Create Cleanup Modal"
          className="cleanup-modal"
          style={{
            overlay: {
              display: "flex",
            
            },
            content: {
              width: "80%",
              maxWidth: "800px",
            },
          }}
        >
          <div>
            <h2>Create a Cleanup</h2>
            <form onSubmit={handleSubmit}>
              {/* Existing form fields */}
              <label>
                Event Name:
                <input
                  type="text"
                  name="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label>
                Description:
                <textarea
                  rows="4"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <label>
                <button type="button" onClick={openAdditionalModal}>
                  Select Location
                </button>
              </label>
              <br />
              <div>
                <label>
                  X-Coordinate:
                  <input
                    type="text"
                    name="xCoordinate"
                    value={xCoordinate}
                    readOnly
                  />
                </label>
                <label>
                  Y-Coordinate:
                  <input
                    type="text"
                    name="yCoordinate"
                    value={yCoordinate}
                    readOnly
                  />
                </label>
              </div>
              <div>
                <label>
                  Type:
                  <select
                    name="privacyType"
                    value={privacyType}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value={true}>Public</option>
                    <option value={false}>Private</option>
                  </select>
                </label>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>

          <div>
            <Modal
              isOpen={additionalModalIsOpen}
              onRequestClose={smallCloseModal}
              contentLabel="Additional Modal"
              className="cleanup-modalMap"
            >
              {/* Additional Modal Content */}
              {additionalModalIsOpen && (
                <div>
                  {/* Include the App component with the map */}
                  <Maps onCoordinateChange={handleCoordinateChange} />
                </div>
              )}
            </Modal>
          </div>
        </Modal>

        <Modal
          isOpen={joinModalIsOpen}
          onRequestClose={() => setJoinModalIsOpen(false)}
          contentLabel="Join Cleanup Modal"
          className="cleanup-modal"
        >
          <h2>Join a Cleanup</h2>
          <label className="search-container">
            <span style={{ display: 'flex', alignItems: 'center' }}>
              Search Code:
              <input
                type="text"
                name="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                style={{ marginRight: '10px', marginBottom: '0' }}
              />
            </span>
            <button onClick={() => handleSearch(eventName)}>
              Search
            </button>
          </label>


           
          
          <table className="cleanup-listing">
  <thead>
    <tr>
      <th className="centered">Event Name</th>
      <th className="centered">Date</th>
      <th className="centered">Description</th>
      <th className="centered">Action</th>
    </tr>
  </thead>
  <tbody>
    {specificCleanup.length > 0 ? (
      specificCleanup.map((cleanup) => (
        <tr key={cleanup.id}>
          <td className="centered">{cleanup.name}</td>
          <td className="centered">{cleanup.date}</td>
          <td className="centered">{cleanup.description}</td>
          <td className="centered">
            <button onClick={() => handleJoinEvent(cleanup.id)}>
              Join
            </button>
          </td>
        </tr>
      ))
    ) : cleanupEvents.length > 0 ? (
      cleanupEvents.map((cleanup) => (
        <tr key={cleanup.id}>
          <td className="centered">{cleanup.name}</td>
          <td className="centered">{cleanup.date}</td>
          <td className="centered">{cleanup.description}</td>
          <td className="centered">
            <button onClick={() => handleJoinEvent(cleanup.id)}>
              Join
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" className="centered">
          There is no available Cleanup at the moment.
        </td>
      </tr>
    )}
  </tbody>
</table>

        </Modal>
      </div>
    </div>
  );
};

export default Cleanup;
