import React, { useState } from 'react';
import axios from 'axios';

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [privacyType, setType] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const teamData = {
      name: teamName,
      isPublic: privacyType,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/team/create",
        teamData
      );
      alert("Team created successfully", response.data);
      setTeamName('');
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Assuming the backend sends a status code of 400 for a name conflict
            alert("A team with this name already exists. Please choose a different name.");
        } else {
            console.error("Error creating team:", error);
            alert("An error occurred while creating the team.");
        }
        setTeamName('');
      }
  };

  return (
    <div style={{ margin: "10px 200px" }}>
      <h1 className='mb-4'>Create a Team</h1>
      <div className='card p-3 mb-4' style={{ backgroundColor: '#f0faf0' }}>
        <form onSubmit={handleSubmit}>
          <div className='form-group mb-3'>
            <label htmlFor='teamName' className='form-label'>Team Name</label>
            <input
              id='teamName'
              className='form-control'
              type='text'
              placeholder='Team Name'
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='teamType' className='form-label'>Type</label>
            <select 
              id='teamType'
              className='form-select' 
              value={privacyType} 
              onChange={(e) => setType(e.target.value === 'true')}
            >
              <option value='true'>Public</option>
              <option value='false'>Private</option>
            </select>
          </div>
          <button 
            className='btn btn-dark' 
            type='submit'
            style={{ width: '100%' }}
          >
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;
