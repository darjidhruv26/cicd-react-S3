import React, { useEffect, useMemo, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import {
  MaterialReactTable,
} from "material-react-table";
import "../style.scss";

const ExceptionDetailsHistoryTable = ({chartdata}) => {
  const [data, setdata] = useState(chartdata);
  useEffect(() => {
    if (chartdata || setdata) {
      setdata(chartdata);
    }
  }, [chartdata,setdata]);

  const columns = useMemo(
    () => [
      {
        header: "Exception category",
        accessorKey: "event_template_category",
      },
      {
        header: "Model",
        accessorKey: "model",
        size: 120,
      },
      {
        header: "Site Name",
        accessorKey: "site_name",
        size: 130,
      },
      {
        header: "Equipment ID",
        accessorKey: "equipment_id",
        Cell: ({ cell }) => (
          <>
            <Tooltip title={cell.row.original.price_date}>
              <span>
                {cell?.row?.original?.equipment_id} -{" "}
                {cell?.row?.original?.serial_number}
              </span>
            </Tooltip>
          </>
        ),
      },
      {
        header: "Description",
        accessorKey: "exception_template_name",
        minSize: 280,
        AggregatedCell: ({ cell }) => {
          const subRows = cell?.row?.subRows;
          const sendToPmpCount = subRows.reduce((count, row) => {
            if (
              row?.original?.send_to_pmp === true &&
              row?.original?.pivision_url !== "No pivison url"
            ) {
              count += 1;
            }
            return count;
          }, 0);
          const sendpmptrue = subRows.reduce((count, row) => {
            if (
              row?.original?.is_pmp_fetched === true
            ) {
              count += 1;
            }
            return count;
          }, 0);
          return (
            <>
              {" "}
              Total PI Exception Generated
              <Box
                sx={{
                  color: "info.main",
                  display: "inline",
                  fontWeight: "bold",
                }}
              >
                {` (${cell?.row?.subRows?.length})`}
              </Box>
              <br />
              <br />
              Send To PMP Exceptions
              <Box
                sx={{
                  color: "info.main",
                  display: "inline",
                  fontWeight: "bold",
                }}
              >
                {` (${sendToPmpCount})`}
              </Box>
              <br />
              <br />
              Total PI Exception Present in PMP
              <Box
                sx={{
                  color: "info.main",
                  display: "inline",
                  fontWeight: "bold",
                }}
              >
                {` (${sendpmptrue})`}
              </Box>
            </>
          );
        },
      },
      {
        header: " Event Severity",
        accessorKey: "exception_severity",
      },
      {
        header: "Send To PMP",
        accessorKey: "send_to_pmp",
        Cell: ({ cell }) => (
          <>
            <Tooltip >
              <span>
                {cell?.row?.original?.send_to_pmp.toString()}
              </span>
            </Tooltip>
          </>
        ),
      },
      {
        header: "Is PMP fetched",
        accessorKey: "is_pmp_fetched",
        Cell: ({ cell }) => (
          <>
            <Tooltip >
              <span>
                {cell?.row?.original?.is_pmp_fetched.toString()}
              </span>
            </Tooltip>
          </>
        ),
      },
      {
        header: "Event Start Time",
        accessorKey: "exception_start_time",
      },
      {
        header: "Exception Name",
        accessorKey: "exception_name",
      },
    ],
    []
  );

  return (
    <>
      <div className="alldatatable">
        <MaterialReactTable
          columns={columns}
          data={data}
          enableColumnResizing
          enableGrouping
          enableTopToolbar
          //   enableToolbarInternalActions={false}
          enableStickyHeader
          enableStickyFooter
          enableFullScreenToggle={false}
          //   enableDensityToggle={false}
          initialState={{
            density: "compact",
            expanded: true, //expand all groups by default
            pagination: { pageIndex: 0, pageSize: 20 },
            grouping: ["site_name"],
          }}
          muiTableHeadCellProps={{
            sx: {
              fontSize: {
                xs: "15px",
                sm: "15px",
                md: "15px",
                lg: "15px",
                xl: "15px",
              },
            },
          }}
          muiToolbarAlertBannerChipProps={{ color: "primary" }}
          muiTableContainerProps={{ sx: { maxHeight: 700 } }}
        />
      </div>
    </>
  );
};

export default ExceptionDetailsHistoryTable;
