import React from 'react';
import {
  DataTable,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableToolbar,
  TableToolbarContent,
} from 'carbon-components-react';

const EmployeeTable = ({ rows, headers }) => {
  return (
    <DataTable
      rows={rows}
      headers={headers}
      render={({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getBatchActionProps,
        onInputChange,
      }) => (
        
        <TableContainer
          title="Employees"
          description="List Employees">
            
          <TableToolbar>
            <TableToolbarContent>
            
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map(header => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                  <React.Fragment key={row.id}>
                      <TableRow {...getRowProps({row})}>

                      {row.cells.map(cell => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                      </TableRow>
                      
                  </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  );
};
export default EmployeeTable;
