import React, { useState } from 'react';
import axios from 'axios';

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [privacyType, setType] = useState(true);
  const [uniqueIdentifier, setUniqueIdentifier] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const teamData = {
      name: teamName,
      isPublic: privacyType,
      uniqueIdentifier: privacyType ? null : uniqueIdentifier,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/team/create",
        teamData
      );
      alert("Team created successfully", response.data);
      setTeamName('');
      setUniqueIdentifier('');
    } catch (error) {
        if (error.response) {
            // Check the response message or status code from the server to decide which alert to display
            if (error.response.data && error.response.data.message) {
              if (error.response.data.message.includes("unique identifier")) {
                alert("A team with this unique identifier already exists. Please choose a different identifier.");
              } else if (error.response.data.message.includes("name")) {
                alert("A team with this name already exists. Please choose a different name.");
              } else {
                // Fallback for other types of errors
                alert(error.response.data.message);
              }
            } else {
              // If the error response doesn't contain a message, log the error and show a generic alert
              console.error("Error creating team:", error);
              alert("An error occurred while creating the team.");
            }
          } else {
            // Handle case when error response is not received
            console.error("Network error or no error response:", error);
            alert("A network error occurred, please try again later.");
          }
          setTeamName('');
          setUniqueIdentifier('');
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
              onChange={(e) => {
                setType(e.target.value === 'true');
                if (e.target.value === 'true') {
                  setUniqueIdentifier('');
                }
              }}
            >
              <option value='true'>Public</option>
              <option value='false'>Private</option>
            </select>
          </div>
          {
            !privacyType && (
              <div className='form-group mb-3'>
                <label htmlFor='uniqueIdentifier' className='form-label'>Unique Identifier</label>
                <input
                  id='uniqueIdentifier'
                  className='form-control'
                  type='text'
                  placeholder='Unique Identifier'
                  value={uniqueIdentifier}
                  onChange={(e) => setUniqueIdentifier(e.target.value)}
                  required
                />
              </div>
            )
          }
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
