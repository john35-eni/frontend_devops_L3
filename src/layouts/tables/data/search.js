/* eslint-disable import/no-unresolved */
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
/* eslint-disable react/function-component-definition */
// eslint-disable-next-line react/prop-types
const SearchComponent = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
      <MDBox width="12rem" ml="auto">
        <MDInput
          placeholder="Rechercher..."
          size="small"
          value={search}
          onChange={(e) => onInputChange(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </MDBox>
    </MDBox>
  );
};
export default SearchComponent;
