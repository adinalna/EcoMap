import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../style.css";

// Set the app element for react-modal
Modal.setAppElement("#root");

const Team = () => {
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [additionalModalIsOpen, setAdditionalModalIsOpen] = useState(false);
  const [teamEvents, setTeamEvents] = useState([]);
  const [joinModalIsOpen, setJoinModalIsOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [privacyType, setType] = useState(true);
  const [specificTeam, setSpecificTeam] = useState([]);

  const openJoinModal = () => {
    setJoinModalIsOpen(true);
    setCreateModalIsOpen(false);
    setAdditionalModalIsOpen(false);
    const userId = 1;
    // Fetch team events when the modal is opened
    axios
      .get(`http://localhost:8080/api/team/filteredList?userID=${userId}`)
      .then((response) => {
        setTeamEvents(response.data);
        setJoinModalIsOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching team events:", error);
      });
  };
 
  const clearSearchInput = () => {
    setTeamName("");
  };

  const handleSearch = async (teamName) => {
    try {
      // Check if the event name is empty
      if (!teamName) {
        alert("Please enter an team name");
        return;
      }
      // Make a GET request using Axios
      const userId = 1;
      const response = await axios.get(
        `http://localhost:8080/api/team/findSpecificByName?teamName=${teamName}&userID=${userId}`
      );
  
      // Check if the response contains cleanup data
      if (response.data) {
        setSpecificTeam([response.data]);
      } else {
        // If no team data is found, show an alert
        alert("You are already a member of this team or no such team exists.");
        setSpecificTeam([]);
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response && error.response.status === 404) {
        alert("You are already a member of this team or no such team exists.");
      } else {
        console.error("Error searching team name:", error.message);
      }
      setSpecificTeam([]);
    }
    clearSearchInput();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const teamData = {
      name: teamName,
      isPublic: privacyType,
    };

    try {
      // Make a POST request using Axios
      const response = await axios.post(
        "http://localhost:8080/api/team/create",
        teamData
      );
      alert("Team created successfully", response.data);
      // Handle the response as needed
      console.log("Team created successfully:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
          alert(error.response.data.message);
      } else {
          console.error("Error creating team:", error);
      }
    }
    clearSearchInput();
  };

  const handleJoinTeam = async (teamId, isPrivate = false) => {
    const userId = 1;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/userteam/find?userId=${userId}&teamId=${teamId}`
      );
      alert("User has successfully joined the Team", response.data);
      // Update the frontend by removing the joined team
      if (isPrivate) {
        setSpecificTeam([]);
        setTeamName("");
        refreshPublicTeams();
      } else {
        setTeamEvents((prevTeamEvents) =>
          prevTeamEvents.filter((team) => team.id !== teamId)
        );
      }
    } catch (error) {
      console.error(
        "Error joining team event:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const refreshPublicTeams = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/team/filteredList?userID=${userId}`
      );
      setTeamEvents(response.data);
    } catch (error) {
      console.error("Error fetching public teams:", error);
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

  return (
    <div className="team-container">
      <div className="team-buttons">
        <button onClick={openCreateModal}>Create a Team</button>
        <button onClick={openJoinModal}>Join a Team</button>
      </div>

      <div className="dual-modals-container">
        <Modal
          isOpen={createModalIsOpen || additionalModalIsOpen}
          onRequestClose={closeModals}
          contentLabel="Create Team Modal"
          className="team-modal"
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
            <h2>Create a Team</h2>
            <form onSubmit={handleSubmit}>
              {/* Existing form fields */}
              <label>
                Team Name:
                <input
                  type="text"
                  name="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </label>
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
        </Modal>

        <Modal
          isOpen={joinModalIsOpen}
          onRequestClose={() => setJoinModalIsOpen(false)}
          contentLabel="Join Team Modal"
          className="team-modal"
        >
          <h2>Join a Team</h2>
          <label className="search-container">
            <span style={{ display: 'flex', alignItems: 'center' }}>
              Search Code:
              <input
                type="text"
                name="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                style={{ marginRight: '10px', marginBottom: '0' }}
              />
            </span>
            <button onClick={() => handleSearch(teamName)}>
              Search
            </button>
          </label>

          <table className="team-listing">
  <thead>
    <tr>
      <th className="centered">Team Name</th>
      <th className="centered">Action</th>
    </tr>
  </thead>
  <tbody>
    {specificTeam.length > 0 ? (
      specificTeam.map((team) => (
        <tr key={team.id}>
          <td className="centered">{team.name}</td>
          <td className="centered">
            <button onClick={() => handleJoinTeam(team.id, true)}>
              Join
            </button>
          </td>
        </tr>
      ))
    ) : teamEvents.length > 0 ? (
      teamEvents.map((team) => (
        <tr key={team.id}>
          <td className="centered">{team.name}</td>
          <td className="centered">
            <button onClick={() => handleJoinTeam(team.id)}>
              Join
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" className="centered">
          There is no available Team at the moment.
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

export default Team;