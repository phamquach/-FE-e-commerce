"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
} from "@mui/material";
import AddressSearchModal from "./AddressSearchModal";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
  onclose: () => void;
  open: boolean;
  handleData: (address: userInformationBuy) => void;
  userData: userInformationBuy | null;
}

function PopupCustomer({ open, onclose, handleData, userData }: IProps) {
  const [dataUser, setDataUser] = React.useState<userInformationBuy>({
    name: userData?.name ?? "",
    address: userData?.address ?? "",
    phone: userData?.phone ?? "",
  });

  const setName = (name: string) => setDataUser((pre) => ({ ...pre, name }));

  const setAddress = (address: string) =>
    setDataUser((pre) => ({ ...pre, address }));

  const setPhone = (phone: string) => setDataUser((pre) => ({ ...pre, phone }));

  const onClickSubmit = () => {
    handleData(dataUser);
    onclose();
  };

  return (
    <Dialog open={open} onClose={onclose} fullWidth maxWidth="sm">
      <IconButton
        sx={{ position: "absolute", right: 2, top: 2 }}
        onClick={onclose}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Nhập tên của bạn"
          size="small"
          onChange={(e) => setName(e.target.value)}
          value={dataUser.name}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Nhập số điện thoại"
          size="small"
          onChange={(e) => setPhone(e.target.value)}
          value={dataUser.phone}
        />
        <AddressSearchModal
          onSelect={setAddress}
          address={userData?.address ?? ""}
        />
      </DialogContent>

      <Button
        variant="outlined"
        color="info"
        onClick={onClickSubmit}
        sx={{ width: "max-content", margin: 'auto'}}
      >
        Xác Nhận
      </Button>
      <br />
    </Dialog>
  );
}

export default PopupCustomer;
