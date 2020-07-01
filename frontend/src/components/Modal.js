import React from "react";

// @Material UI
import { styled } from '@material-ui/core/styles';
import { Modal, Fade, Backdrop } from "@material-ui/core";
  
const PaperModal = styled("div")(({theme}) => ({
  width: "65%",
  justifySelf: "center",
  alignSelf: "flex-start",
  margin: "35px auto",
  backgroundColor: "#fff",
  outline: "none",
  padding: "30px",
  boxSizing:"border-box",
  borderRadius:"5px"
}));

const MaterialModal = ({ open, handleClose, children }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      className="modal"
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      style={{overflow:"auto"}}
      BackdropProps={{
        timeout: 600
      }}
    >
      <Fade in={open}>
        <PaperModal className="paper">{children}</PaperModal>
      </Fade>
    </Modal>
  );
};

export default MaterialModal;