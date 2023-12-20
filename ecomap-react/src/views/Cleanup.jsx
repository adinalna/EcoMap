import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Maps from "../components/Pages/Cleanup/Maps";
import axiosClient from "../axios-client.js";
import "../style.css";

// Set the app element for react-modal
Modal.setAppElement("#root");

const Cleanup = () => {
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [joinModalIsOpen, setJoinModalIsOpen] = useState(false);
  const [additionalModalIsOpen, setAdditionalModalIsOpen] = useState(false);

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
      locationX: xCoordinate,
      locationY: yCoordinate,
      image: null,
      isPublic: privacyType,
    };

    axiosClient
      .post("/cleanup/create", cleanupData)
      .then(({ data }) => {
        // Handle successful response if needed
        console.log("Cleanup created successfully:", data);
      })
      .catch((err) => {
        console.error("Error in create cleanup:", err);

        if (err && err.response && err.response.status === 422) {
          setErrors(err.response.data.message);
        } else {
          // Handle other error cases if needed
        }
      });
  };

  const openCreateModal = () => {
    setCreateModalIsOpen(true);
    setJoinModalIsOpen(false);
    setAdditionalModalIsOpen(false);
  };

  const openJoinModal = () => {
    setJoinModalIsOpen(true);
    setCreateModalIsOpen(false);
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
          onRequestClose={closeModals}
          contentLabel="Join Cleanup Modal"
          className="cleanup-modal"
        >
          <h2>Join a Cleanup</h2>
          {/* Add content for the Join Cleanup modal */}

          {/* Example listing with dummy data */}
          <table className="cleanup-listing">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cleanup Event 1</td>
                <td>2023-01-01</td>
                <td>
                  <button onClick={() => handleJoinEvent(1)}>Join</button>
                </td>
              </tr>
              <tr>
                <td>Cleanup Event 2</td>
                <td>2023-02-15</td>
                <td>
                  <button onClick={() => handleJoinEvent(2)}>Join</button>
                </td>
              </tr>
              {/* Add more rows with dummy data as needed */}
            </tbody>
          </table>
        </Modal>
      </div>
    </div>
  );
};

export default Cleanup;
