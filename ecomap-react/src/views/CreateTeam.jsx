import React, { useState, useEffect } from 'react';
import axiosClient from "../axios-client.js";

const CreateTeam = () => {
  const [teamType, setTeamType] = useState('public'); // 'public' or 'private'
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({}); // Error handling
  const [successMessage, setSuccessMessage] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  // Clear the timeout when the component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  // Handlers for input changes
  const handleTeamTypeChange = (e) => setTeamType(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleIdentifierChange = (e) => setIdentifier(e.target.value);

  const clearErrors = () => setErrors({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    clearErrors();
    setSuccessMessage('');

    const payload = {
        name,
        isPublic: teamType === 'public',
        uniqueIdentifier: teamType === 'private' ? identifier : '',
    };

    console.log('Sending POST request to:', `${import.meta.env.VITE_API_BASE_URL}/api/teams`, payload);

    try {
      const response = await axiosClient.post('/teams', payload);
      console.log('Response:', response.data);
      // Display success message and reset form fields
      setSuccessMessage(`Team "${response.data.name}" created successfully!`);
      setName('');
      setIdentifier('');
      setTeamType('public');

      // Clear the success message after 5 seconds
      const newTimeoutId = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      setTimeoutId(newTimeoutId); // Save the timeout id
    } catch (error) {
        console.error('Error:', error);
        setErrors(error.response?.data?.errors || { generic: 'An error occurred.' });
    } finally {
        setProcessing(false);
    }
};

  return (
    <div style={{ margin: "10px 200px" }}>
      <h1 className='mb-4'>Create a Team</h1>
      <p className='mb-3'>You are allowed to create 9 teams.</p>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <div className='card p-3 mb-4' style={{ backgroundColor: '#f0faf0' }}>
      <form onSubmit={handleSubmit}>
        <div className='form-group mb-3'>
          <label htmlFor='teamType' className='form-label'>What kind of team would you like to create?</label>
          <select 
            id='teamType'
            className='form-select' 
            value={teamType} 
            onChange={handleTeamTypeChange}
          >
            <option value='public'>Public Team</option>
            <option value='private'>Private Team</option>
          </select>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor='teamName' className='form-label'>Team Name</label>
          <input
            id='teamName'
            className='form-control'
            type='text'
            placeholder='Awesome Team'
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        {teamType === 'private' && (
          <div className='form-group mb-3'>
            <label htmlFor='teamIdentifier' className='form-label'>Unique Team Identifier</label>
            <input
              id='teamIdentifier'
              className='form-control'
              type='text'
              placeholder='Awesome2023'
              value={identifier}
              onChange={handleIdentifierChange}
              required
            />
          </div>
        )}
        <button 
          className={`btn ${processing ? 'btn-secondary' : 'btn-dark'} `} 
          type='submit' 
          disabled={processing}
          style={{ width: '100%' }} // Ensures the button is the same width as the form elements
        >
          {processing ? 'Creating...' : 'Create Team'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateTeam;