import React, { useState } from 'react';
import Modal from 'react-modal';
import Maps from '../components/Pages/Cleanup/Maps';
import '../style.css';

const Cleanup = () => {
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [joinModalIsOpen, setJoinModalIsOpen] = useState(false);
  const [additionalModalIsOpen, setAdditionalModalIsOpen] = useState(false);
  const [xCoordinate, setXCoordinate] = useState("");
  const [yCoordinate, setYCoordinate] = useState("");


  const openCreateModal = () => {
    setCreateModalIsOpen(true);
    setJoinModalIsOpen(false);
    setAdditionalModalIsOpen(false);
  };

  const openJoinModal = () => {
    setJoinModalIsOpen(true);
    setCreateModalIsOpen(false);;
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
              display: 'flex',
              alignItems: 'center', // Center content vertically
              justifyContent: 'center', // Center content horizontally
            },
            content: {
              display: 'flex',
              flexDirection: 'row',
              width: '80%',
              maxWidth: '800px',
            },
          }}
        >
          <div>
            <h2>Create a Cleanup</h2>
            <form>
              {/* Existing form fields */}
              <label>
                Event Name:
                <input type="text" />
              </label>
              <label>
                Date:
                <input type="date" />
              </label>
              <label>
                Description:
                <textarea rows="4" />
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
                  <input type="text" value={xCoordinate} readOnly />
                </label>
                <label>
                  Y-Coordinate:
                  <input type="text" value={yCoordinate} readOnly />
                </label>
              </div>
              <div>
                <label>
                  Type:
                  <select>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
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
        </Modal>

        
      </div>
    </div>
  );
};

export default Cleanup;
