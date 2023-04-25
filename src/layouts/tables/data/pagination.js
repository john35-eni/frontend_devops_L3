/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
import MDPagination from "components/MDPagination";
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import { useEffect, useMemo, useState } from "react";

// eslint-disable-next-line react/function-component-definition, react/prop-types
const PaginationComponent = ({ total = 0, itemsPerPage = 10, currentPage = 1, onPageChange }) => {
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (total > 0 && itemsPerPage > 0) setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);
  const paginationItems = useMemo(() => {
    const pages = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <MDPagination item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
          {i}
        </MDPagination>
      );
    }
    return pages;
  }, [totalPages, currentPage]);
  if (totalPages === 0) return null;
  return (
    <MDBox
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
    >
      <MDPagination variant="gradient" color="info">
        <MDPagination
          item
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
        </MDPagination>
        {paginationItems}
        <MDPagination
          item
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
        </MDPagination>
      </MDPagination>
    </MDBox>
  );
};

export default PaginationComponent;
