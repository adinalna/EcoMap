import React, { useState } from 'react';
import { Grid, Card, CardCover, CardContent, Typography, IconButton } from '@mui/joy';
import { Button } from 'react-bootstrap';
import LitterModal from './LitterModal.jsx';

export default function LitterList({ litterList }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div>
      <Grid container spacing={2}>
        {litterList.map((litter, index) => (
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
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <CardCover>
                {litter.medias.map((media, mediaIndex) => (
                  <div
                    key={mediaIndex}
                    style={{
                      display: mediaIndex === currentIndex ? 'block' : 'none',
                    }}
                  >
                    {media.type === 'image' && (
                      <img
                        src={media.src}
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
                    {media.type === 'video' && (
                      <video
                        ref={(videoRef) => {
                          if (videoRef) {
                            if (mediaIndex === currentIndex) {
                              if (isHovered) {
                                videoRef.play(); 
                              } else {
                                videoRef.pause();
                                videoRef.currentTime = 0;
                              }
                            }
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
                        <source src={media.src} type="video/mp4" />
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
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'right',
                  width: '100%',
                  height: '100%',
                }}
              >
                <p
                  style={{ color: '#fff' }}
                >{`1/${litter.medias.length}`}</p>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    bottom: 0,
                  }}
                >
                  <Typography
                    level="body-lg"
                    fontWeight="lg"
                    textColor="#fff"
                  >
                    {litter.title}
                  </Typography>
                  <Button
                    variant="light"
                    onClick={() => handleCardClick(litter, index)}
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <LitterModal
        open={openModal}
        handleClose={handleCloseModal}
        handlePrevImage={handlePrevImage}
        handleNextImage={handleNextImage}
        currentIndex={currentIndex}
        modalContent={modalContent}
      />
    </div>
  );
}
