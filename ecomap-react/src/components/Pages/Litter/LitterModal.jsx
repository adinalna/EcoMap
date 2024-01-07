import React from 'react';
import { Modal, IconButton, Typography, Chip, Sheet, Table } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Hidden } from '@mui/material';
import { format } from 'date-fns';

export default function LitterModal({
  open,
  handleClose,
  currentIndex,
  litter,
  bucketUrl
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
        m: '20px',
      }}
    >
      <div>
        {litter && (
          <>
            <Sheet color="neutral" variant="plain"
              sx={{
                maxwidth: "700px",
                p: 4,
                borderRadius: "5px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px'
              }}>
              <div
                style={{
                  display: 'block',
                }}
              >
                {litter.media[currentIndex].mediaType === 'image' && (
                  <img
                    src={`${bucketUrl}/${litter.media[currentIndex].path}`}
                    alt=""
                    style={{
                      maxWidth: '100%',
                      maxHeight: '380px',
                    }}
                  />
                )}
                {litter.media[currentIndex].mediaType === 'video' && (
                  <video
                    controls
                    style={{
                      maxWidth: '100%',
                      maxHeight: '380px',
                    }}
                  >
                    <source
                      src={`${bucketUrl}/${litter.media[currentIndex].path}`}
                      type="video/mp4"
                    />
                  </video>
                )}
              </div>


              <Table color="success" variant="outlined" sx={{ width: "700px" }}>
                <tbody>
                  <tr>
                    <th style={{ width: "15%" }}>Country:</th>
                    <td>{litter.country}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "15%"}}>Address:</th>
                    <td style={{ width: "15%", maxheight: "65px", overflowX: "hidden", overflowY: "auto" }}>{litter.address}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "15%" }}>Picked Up:</th>
                    <td>{litter.pickedUp ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "15%" }}>Date Created</th>
                    <td style={{ width: "15%" }}>{format(new Date(litter.dateCreated), 'MMMM d, yyyy h:mm a')}</td>
                  </tr>
                  <tr>
                    <th style={{ width: "15%" }}>{"Tag(s):"}</th>
                    <td style={{ width: "15%", height: "65px", overflowX: "hidden", overflowY: "auto" }}>
                      {litter.litterTags.map((tag, index) => (
                        <span key={index}>{tag.titleValue}{index < litter.litterTags.length - 1 ? ', ' : ''}</span>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Sheet>
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
          </>
        )}
      </div>
    </Modal>
  );
}
