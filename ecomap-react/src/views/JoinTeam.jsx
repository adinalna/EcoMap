import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JoinTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [teamEvents, setTeamEvents] = useState([]);
  const [specificTeam, setSpecificTeam] = useState([]);
  const [uniqueIdentifier, setUniqueIdentifier] = useState('');

  useEffect(() => {
    // Fetch public teams when the component mounts
    refreshPublicTeams();
  }, []);

  const handleSearch = async () => {
    const userId = 1;
    try {
        const response = await axios.get(
            `http://localhost:8080/api/team/findPrivateByUniqueIdentifier?uniqueIdentifier=${uniqueIdentifier}`
        );
        setSpecificTeam([response.data]);
        setTeamEvents([]);
    } catch (error) {
        if (error.response && error.response.status === 404) {
          alert("No such private team exists.");
        } else {
          console.error("Error searching for team:", error.message);
        }
      }
      setUniqueIdentifier('');
    };

  const handleJoinTeam = async (teamId, isPrivate = false) => {
    const userId = 1;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/userteam/find?userId=${userId}&teamId=${teamId}`
      );
      alert("User has successfully joined the Team", response.data);
      if (isPrivate) {
        setSpecificTeam([]);
        refreshPublicTeams();
      }
      setTeamEvents(prev => prev.filter(team => team.id !== teamId));
    } catch (error) {
      console.error("Error joining team:", error.message);
    }
  };

  const refreshPublicTeams = async () => {
    const userId = 1;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/team/filteredList?userID=${userId}`
      );
      setTeamEvents(response.data);
    } catch (error) {
      console.error("Error fetching public teams:", error);
    }
  };

  return (
    <div style={{ margin: "10px 200px" }}>
      <h1 className='mb-4'>Join a Team</h1>

      {/* Private Team Join Form */}
      <div className='card p-3 mb-4' style={{ backgroundColor: '#f0faf0' }}>
        <div className='mb-3'>
          <label htmlFor='joinIdentifier' className='form-label'>Enter Unique Identifier</label>
          <input
            type='text'
            className='form-control'
            id='joinIdentifier'
            placeholder='Enter Unique Identifier'
            value={uniqueIdentifier}
            onChange={(e) => setUniqueIdentifier(e.target.value)}
          />
        </div>
        <div className='d-grid'>
          <button 
            className='btn btn-dark'
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Specific Team Search Result */}
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Team Name</th>
              <th scope='col' className='text-end'>Action</th>
            </tr>
          </thead>
          <tbody>
            {specificTeam.length > 0 && specificTeam.map((team, index) => (
              <tr key={team.id}>
                <th scope='row'>{index + 1}</th>
                <td>{team.name}</td>
                <td className='text-end'>
                  <button 
                    className='btn btn-dark'
                    onClick={() => handleJoinTeam(team.id, true)}
                  >
                    Join Team
                  </button>
                </td>
              </tr>
            ))}
            {specificTeam.length === 0 && teamEvents.map((team, index) => (
              <tr key={team.id}>
                <th scope='row'>{index + 1}</th>
                <td>{team.name}</td>
                <td className='text-end'>
                  <button 
                    className='btn btn-dark'
                    onClick={() => handleJoinTeam(team.id)}
                  >
                    Join Team
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JoinTeam;
