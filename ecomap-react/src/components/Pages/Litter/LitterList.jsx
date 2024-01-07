import React, { useState } from 'react';
import { Grid, Card, CardCover, CardContent, Typography, IconButton, Chip } from '@mui/joy';
import Pagination from '@mui/material/Pagination';
import { Button } from 'react-bootstrap';
import LitterModal from './LitterModal.jsx';
import LitterTagModal from './LitterTagModal.jsx';

export default function LitterList({ litterList, type }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [page, setPage] = useState(1);
  const cardsPerRow = 3;
  const rowsPerPage = 3;

  const BUCKET_URL = import.meta.env.VITE_APP_SUPABASE_STORAGE_BUCKET_URL;

  const handleCardClick = (litter, index) => {
    setModalContent({ ...litter, index });
    setOpenModal(true);
  };

  const handleNextImage = () => {
    if (modalContent && modalContent.medias && modalContent.medias.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % modalContent.medias.length);
    }
  };

  const handlePrevImage = () => {
    if (modalContent && modalContent.medias && modalContent.medias.length > 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? modalContent.medias.length - 1 : prevIndex - 1
      );
    }
  };

  const handleCloseModal = () => {
    setModalContent(null);
    setCurrentIndex(0);
    setOpenModal(false);
  };

  const isGalleryType = type === 'gallery';
  const ModalComponent = isGalleryType ? LitterModal : LitterTagModal;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * rowsPerPage * cardsPerRow;
  const endIndex = startIndex + rowsPerPage * cardsPerRow;

  return (
    <div>
      <Grid container spacing={2}>
        {litterList.slice(startIndex, endIndex).map((litter, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
          >
            <Card
              sx={{
                position: 'relative',
                width: '100%',
                height: '300px',
                borderRadius: '5px',
                cursor: 'default',
              }}
              onMouseEnter={() => setHoveredCardIndex(index)}
              onMouseLeave={() => setHoveredCardIndex(null)}
            >
              <CardCover>
                {litter.media.map((litterMedia, mediaIndex) => (
                  <div
                    key={mediaIndex}
                    style={{
                      display: mediaIndex === currentIndex ? 'block' : 'none',
                    }}
                  >
                    {litterMedia.mediaType === 'image' && (
                      <img
                        src={`${BUCKET_URL}/${litterMedia.path}`}
                        loading="lazy"
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '5px',
                        }}
                      />
                    )}
                    {litterMedia.mediaType === 'video' && (
                      <video
                      ref={(videoRef) => {
                        if (videoRef && index === hoveredCardIndex && mediaIndex === currentIndex) {
                          videoRef.play();
                        } else if (videoRef) {
                          videoRef.pause();
                          videoRef.currentTime = 0;
                        }
                      }}
                      loop
                      muted
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '5px',
                        }}
                      >
                        <source src={`${BUCKET_URL}/${litterMedia.path}`} type="video/mp4" />
                      </video>
                    )}
                  </div>
                ))}
              </CardCover>
              <CardContent
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 2,
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  justifyContent: 'space-between',
                  alignItems: 'right',
                  width: '100%',
                  height: '100%',
                }}
              >
                {/* <p
                  style={{ color: '#fff' }}
                >{`1/${litter.medias.length}`}</p> */}
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    bottom: 0,
                  }}
                >
                  <Chip variant="soft" color="success">
                    {litter.country}
                  </Chip>
                  {/* <Typography
                    level="body-lg"
                    fontWeight="lg"
                    textColor="#fff"
                  >
                    {litter.country}
                  </Typography> */}
                  <Button
                    variant="dark"
                    onClick={() => handleCardClick(litter, index)}
                  >
                    {type === "gallery" ? "View" : "Tag Litter"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          color="success"
          count={Math.ceil(litterList.length / (rowsPerPage * cardsPerRow))}
          page={page}
          onChange={handlePageChange}
        />
      </div>

      <ModalComponent
        open={openModal}
        handleClose={handleCloseModal}
        currentIndex={currentIndex}
        litter={modalContent}
        bucketUrl={BUCKET_URL}
      />
    </div>
  );
}
