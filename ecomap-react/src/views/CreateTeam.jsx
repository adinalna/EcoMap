import React, { useState } from 'react';

const CreateTeam = () => {
  const [teamType, setTeamType] = useState('public'); // 'public' or 'private'
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({}); // Error handling

  // Handlers for input changes
  const handleTeamTypeChange = (e) => setTeamType(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleIdentifierChange = (e) => setIdentifier(e.target.value);

  const clearErrors = () => setErrors({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // TODO: Implement the logic for creating a team

    setProcessing(false);
  };

  return (
    <div style={{ margin: "10px 200px" }}>
      <h1 className='mb-4'>Create a Team</h1>
      <p className='mb-3'>You are allowed to create 9 teams.</p>
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