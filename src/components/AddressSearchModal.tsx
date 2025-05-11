"use client";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

// Giả lập API địa chỉ
const mockAddresses = [
  "123 Lý Thường Kiệt, Q.10, TP.HCM",
  "456 Trần Hưng Đạo, Q.5, TP.HCM",
  "789 Phan Văn Trị, Gò Vấp, TP.HCM",
  "12 Lê Văn Việt, Q.9, TP.Thủ Đức",
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (address: string) => void;
}

export default function AddressSearchModal({ open, onClose, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (!search) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      const filtered = mockAddresses.filter((addr) =>
        addr.toLowerCase().includes(search.toLowerCase())
      );
      setResults(filtered);
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [search]);

  const handleSelect = (address: string) => {
    onSelect(address);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Tìm kiếm địa chỉ giao hàng
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <List dense>
          {results.length > 0 ? (
            results.map((item, i) => (
              <ListItemButton key={i} onClick={() => handleSelect(item)}>
                <ListItemText primary={item} />
              </ListItemButton>
            ))
          ) : (
            <Box textAlign="center" py={2} color="text.secondary">
              Không tìm thấy địa chỉ phù hợp.
            </Box>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
}
