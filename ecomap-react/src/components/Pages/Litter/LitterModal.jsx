import React from 'react';
import { Modal, IconButton, Typography } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function LitterModal({
  open,
  handleClose,
  handlePrevImage,
  handleNextImage,
  currentIndex,
  modalContent,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        {modalContent && (
          <>
            <div
              style={{
                display: 'block',
              }}
            >
              {modalContent.medias[currentIndex].type === 'image' && (
                <img
                  src={modalContent.medias[currentIndex].src}
                  alt=""
                  style={{
                    maxWidth: '100%',
                    maxHeight: '550px',
                  }}
                />
              )}
              {modalContent.medias[currentIndex].type === 'video' && (
                <video
                  controls
                  style={{
                    maxWidth: '100%',
                    maxHeight: '550px',
                  }}
                >
                  <source
                    src={modalContent.medias[currentIndex].src}
                    type="video/mp4"
                  />
                </video>
              )}
            </div>

            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '15%',
                transform: 'translateY(-50%)',
                color: 'white',
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                top: '50%',
                right: '15%',
                transform: 'translateY(-50%)',
                color: 'white',
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>

            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                color: 'white',
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h5"
              id="modal-title"
              sx={{ mt: 2, color: 'white' }}
            >
              {modalContent.title}
            </Typography>
          </>
        )}
      </div>
    </Modal>
  );
}
