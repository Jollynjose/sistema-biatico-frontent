import React, { FC, ReactNode, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
  TablePagination,
  Box,
} from '@mui/material';

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  collapsibleContent?: (row: T) => ReactNode;
  addCreateButton?: boolean;
  onCreate?: () => void;
}

const DataTable: FC<DataTableProps<any>> = ({
  data,
  columns,
  collapsibleContent,
  addCreateButton,
  onCreate,
}) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
    setExpandedRow(null);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setExpandedRow(null);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column.header}</TableCell>
              ))}
              {collapsibleContent && (
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: '8px',
                    }}
                  >
                    Acciones
                    {addCreateButton && (
                      <Button
                        type="button"
                        onClick={() => {
                          onCreate?.();
                        }}
                        variant="outlined"
                        size="small"
                      >
                        Crear
                      </Button>
                    )}
                  </Box>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <React.Fragment key={index + page * rowsPerPage}>
                <TableRow>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {column.render
                        ? column.render(row)
                        : (row[column.accessor] as ReactNode)}
                    </TableCell>
                  ))}
                  {collapsibleContent && (
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => toggleRow(index + page * rowsPerPage)}
                        size="small"
                      >
                        {expandedRow === index + page * rowsPerPage
                          ? 'Cerrar'
                          : 'Editar'}
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
                {collapsibleContent && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                    >
                      <Collapse
                        in={expandedRow === index + page * rowsPerPage}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div style={{ margin: '16px 0' }}>
                          {collapsibleContent(row)}
                        </div>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[8, 16, 32]}
        labelRowsPerPage="Filas por página"
      />
    </>
  );
};

export default DataTable;
