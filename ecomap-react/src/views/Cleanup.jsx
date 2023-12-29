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
    // Fetch cleanup events when the modal is opened
    axios
      .get("http://localhost:8080/api/cleanup/list")
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
        // Access cleanup and user from the response data
        const { cleanup, user } = response.data;
        alert("User has successfully joined the Cleanup", cleanup, user);
        console.log(cleanup, user);
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
              alignItems: "center", // Center content vertically
              justifyContent: "center", // Center content horizontally
            },
            content: {
              display: "flex",
              flexDirection: "row",
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
              className="cleanup-modal"
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
          <table className="cleanup-listing">
            <thead>
              <tr>
                <th className="centered">Cleanup ID</th>
                <th>Event Name</th>
                <th className="centered">Date</th>
                <th className="centered">Action</th>
              </tr>
            </thead>
            <tbody>
              {cleanupEvents.map((cleanup) => (
                <tr key={cleanup.id}>
                  <td className="centered">{cleanup.id}</td>
                  <td>{cleanup.name}</td>
                  <td>{cleanup.date}</td>
                  <td>
                    <button onClick={() => handleJoinEvent(cleanup.id)}>
                      Join
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal>
      </div>
    </div>
  );
};

export default Cleanup;
