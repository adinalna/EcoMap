import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import LitterFilter from "../components/Pages/Litter/LitterFilter.jsx";
import LitterList from "../components/Pages/Litter/LitterList.jsx";
import { Chip, Stack } from '@mui/material';
import { Typography, Sheet, Modal, ModalDialog, ModalClose, Table } from '@mui/joy';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function LitterGallery() {
  const [litterData, setLitterData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [trendingTagData, setTrendingTagData] = useState([]);

  useEffect(() => {
    fetchLitterList();
    fetchTagList();
    fetchTrendingTagList();
  }, []);

  useEffect(() => {
    // This useEffect runs whenever litterData changes
    if (!initialLoad) {
      handleFilterChange({ litterPickedUp: null, selectedTags: [] });
    } else {
      setInitialLoad(false);
    }
  }, [litterData, initialLoad]);

  const fetchLitterList = async () => {
    try {
      const response = await axiosClient.get("/litter/all", { timeout: 5000 });
      const list = response.data;
      // console.log(list);
      setLitterData(list);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTagList = async () => {
    try {
      const response = await axiosClient.get("/tag/all", { timeout: 5000 });
      const list = response.data;
      // console.log(list);
      setTagData(list);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTrendingTagList = async () => {
    try {
      const response = await axiosClient.get("/tag/trending/all", { timeout: 5000 });
      const list = response.data;
      console.log(list);
      setTrendingTagData(list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (filters) => {
    const { litterPickedUp, selectedTags } = filters;

    let updatedData = litterData;

    if (litterPickedUp !== "All") {
      const pickedUpValue = litterPickedUp === "pickedUp";
      updatedData = updatedData.filter((litter) => litter.pickedUp === pickedUpValue);
    }

    if (selectedTags.length > 0) {
      updatedData = updatedData.filter((litter) =>
        selectedTags.some((tag) => litter.litterTags.some((litterTag) => litterTag.tagId === tag.id))
      );
    }

    setFilteredData(updatedData);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [selectedTagType, setSelectedTagType] = useState("");

  const handleChipClick = (tagType) => {
    if (tagType === "week") {
      setModalData(trendingTagData.week);
    } else if (tagType === "month") {
      setModalData(trendingTagData.month);
    } else if (tagType === "year") {
      setModalData(trendingTagData.year);
    } else if (tagType === "ever") {
      setModalData(trendingTagData.ever);
    }

    setSelectedTagType(tagType);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setModalOpen(false);
  };
  return (
    <div style={{ margin: "10px 200px" }}>
      <h1>Litter Gallery</h1>
      <Sheet variant="outlined" color="success" sx={{ p: 1, borderRadius: "5px" }}>
        <Stack direction="column" spacing={1} alignItems="center" justifyContent="center">
          <Typography variant="h6" color="textSecondary">
            <TrendingUpIcon style={{ marginRight: '8px' }} /> Trending Tags
          </Typography>
          <Stack direction="row" spacing={4} justifyContent="center" sx={{ overflowX: "auto", overflowY: "hidden" }}>
            {['week', 'month', 'year', 'ever'].map((tagType) => (
              <Chip
                key={tagType}
                label={tagType === 'ever' ? 'All Time' : `Last ${tagType.charAt(0).toUpperCase() + tagType.slice(1)}`}
                color="success"
                variant="outlined"
                onClick={() => handleChipClick(tagType)}
                sx={{ width: 200, backgroundColor: "#edfced" }}
              />
            ))}
          </Stack>
        </Stack>
      </Sheet>
      <LitterFilter tags={tagData} onFilterChange={handleFilterChange} />
      <LitterList litterList={filteredData} type={"gallery"} />

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <ModalDialog
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ModalClose />
          <h5>{`Most used tags ${selectedTagType === 'ever' ? 'of all time' : `this ${selectedTagType}`}`}</h5>
          <Sheet variant="outlined" color="success" sx={{ p: 2, borderRadius: '5px', minHeight: '150px', maxHeight: '350px', width: '550px', overflow: 'auto', }}>
            <Table stickyHeader>
              <thead>
                <tr>
                  <th style={{ width: '12%' }}>No.</th>
                  <th style={{ width: '60%' }}>Title</th>
                  <th style={{ width: '18%' }}>Group</th>
                </tr>
              </thead>
              <tbody>
                {modalData.map((tag, index) => (
                  <tr key={index}>
                    <td style={{ width: '12%' }}>{index + 1}</td>
                    <td style={{ width: '60%' }}>{tag.titleValue}</td>
                    <td style={{ width: '18%' }}>{tag.group}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
        </ModalDialog>
      </Modal>
    </div>
  );
}
