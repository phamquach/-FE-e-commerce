"use client";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

// Giả lập API địa chỉ
const mockAddresses = [
  "123 Lý Thường Kiệt, Q.10, TP.HCM",
  "456 Trần Hưng Đạo, Q.5, TP.HCM",
  "789 Phan Văn Trị, Gò Vấp, TP.HCM",
  "12 Lê Văn Việt, Q.9, TP.Thủ Đức",
];

interface Props {
  onSelect: (address: string) => void;
  address: string;
}

export default function AddressSearchModal({ onSelect, address }: Props) {
  const [search, setSearch] = useState(address);
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
    setSearch(address);
  };

  return (
    <>
      <TextField
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tìm kiếm địa chỉ..."
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
    </>
  );
}
