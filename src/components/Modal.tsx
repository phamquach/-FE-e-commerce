import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Image from "next/image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  p: 4,
  border: "none",
  ":focus-visible": { outline: "none" },
};

export default function BasicModal({
  openModal,
  setOpenModal,
  src,
  alt,
}: {
  openModal: boolean;
  setOpenModal: () => void;
  src: string;
  alt: string;
}) {
  const handleClose = () => setOpenModal();

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: "contain" }}
            sizes="700px"
          />
        </Box>
      </Modal>
    </div>
  );
}
