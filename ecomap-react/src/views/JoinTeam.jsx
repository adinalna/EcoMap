import React, { useState, useEffect } from 'react';
import axiosClient from "../axios-client.js";

const JoinTeam = () => {
  const [teams, setTeams] = useState([]);
  const [identifier, setIdentifier] = useState('');
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch public teams from the backend
  useEffect(() => {
    const fetchPublicTeams = async () => {
      try {
        const response = await axiosClient.get('/teams/public'); // Adjust the URL as per your backend API
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching public teams:', error);
        // Handle error
      }
    };

    fetchPublicTeams();
  }, []); // Empty dependency array to run only once on mount

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
    clearErrors();
  };

  const clearErrors = () => {
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    // TODO: Add logic to join a team by identifier
    setProcessing(false);
  };

  const joinPublicTeam = (teamId) => {
    // TODO: Add logic to join a public team
  };

  return (
    <div style={{ margin: "10px 200px" }}>
      <h1 className='mb-4'>Join a Team</h1>

      {/* Private Team Join Form */}
      <div className='card p-3 mb-4' style={{ backgroundColor: '#f0faf0' }}>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='joinIdentifier' className='form-label'>Enter Unique Team Identifier</label>
            <input
              type='text'
              className={`form-control ${errors.identifier ? 'is-invalid' : ''}`}
              id='joinIdentifier'
              placeholder='Enter ID to join'
              value={identifier}
              onChange={handleIdentifierChange}
              required
            />
            {errors.identifier && <div className='invalid-feedback'>{errors.identifier}</div>}
          </div>
          <div className='d-grid'>
            <button 
              className={`btn ${processing ? 'btn-secondary' : 'btn-dark'}`}
              type='submit'
              disabled={processing}
            >
              {processing ? 'Joining...' : 'Join Team'}
            </button>
          </div>
        </form>
      </div>

      {/* Public Teams Table */}
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
            {teams.map((team, index) => (
              <tr key={team.id}>
                <th scope='row'>{index + 1}</th>
                <td>{team.name}</td>
                <td className='text-end'>
                  <button 
                    className='btn btn-dark'
                    onClick={() => joinPublicTeam(team.id)}
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
