import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewTeam = () => {
  const [userTeams, setUserTeams] = useState([]);
  const userId = 1;

  useEffect(() => {
    // Fetch teams the user has joined when the component mounts
    fetchUserTeams();
  }, []);

  const fetchUserTeams = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/team/userTeams`, {
        params: { userId }
      });
      setUserTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleUnjoinTeam = async (teamId) => {
    try {
      await axios.post(`http://localhost:8080/api/team/unjoin`, null, {
        params: { userId, teamId }
      });
      // Remove the team from the state
      setUserTeams(userTeams.filter((team) => team.id !== teamId));
      alert("You have successfully left the team.");
    } catch (error) {
      console.error("Error unjoining team:", error);
      alert("An error occurred while trying to leave the team.");
    }
  };
  
  return (
    <div style={{ margin: "10px 200px" }}>
      <h1 className='mb-4'>My Teams</h1>
      <div className='table-responsive'>
        <table className='table'>
        <thead style={{ backgroundColor: '#f0faf0' }}>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Team Name</th>
              <th scope='col' className='text-end'>Action</th>
            </tr>
          </thead>
          <tbody>
            {userTeams.map((team, index) => (
              <tr key={team.id}>
                <th scope='row'>{index + 1}</th>
                <td>{team.name}</td>
                <td className='text-end'>
                  <button 
                    className='btn btn-dark'
                    onClick={() => handleUnjoinTeam(team.id)}
                  >
                    Leave Team
                  </button>
                </td>
              </tr>
            ))}
            {userTeams.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center">You have not joined any teams.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTeam;
