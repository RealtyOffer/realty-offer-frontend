import React, { FunctionComponent } from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';

import { quarterSpacer, baseSpacer } from '../styles/size';
import { baseBorderStyle } from '../styles/mixins';
import { lightestGray, offWhite } from '../styles/color';
import Button from './Button';

type TableActionType = {
  to?: string;
  label: string;
  onClick?: () => void;
};

type TableProps = {
  columns: Array<{
    header: string;
    accessor: string;
  }>;
  data: Array<any>;
  actions?: Array<TableActionType>;
};

const StyledTable = styled.table`
  margin-bottom: ${baseSpacer};
`;

const StyledTr = styled.tr`
  border: ${baseBorderStyle};
  &:hover {
    background-color: ${offWhite};
  }
`;

const StyledTd = styled.td`
  padding: ${quarterSpacer};
  border: ${baseBorderStyle};
`;

const StyledTh = styled.th`
  padding: ${quarterSpacer};
  font-weight: bold;
  border: ${baseBorderStyle};
  background-color: ${lightestGray};
`;

const Table: FunctionComponent<TableProps> = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <StyledTable {...getTableProps()}>
      <thead>
        <StyledTr>
          {columns.map((column) => (
            <StyledTh key={column.header}>{column.header}</StyledTh>
          ))}
        </StyledTr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <StyledTr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => {
                // if cell.
                return (
                  <StyledTd key={cell.getCellProps().key} {...cell.getCellProps()}>
                    {String(cell.getCellProps().key).includes('action') ? (
                      <>
                        {cell.row.original.actions.map((action: TableActionType) => {
                          if (action.onClick) {
                            return (
                              <Button
                                type="button"
                                key={action.label}
                                onClick={action.onClick}
                                color="text"
                              >
                                {action.label}
                              </Button>
                            );
                          }
                          if (action.to) {
                            // TODO: more styling options like icon only button, colored button
                            return (
                              <Button type="link" key={action.label} to={action.to} color="text">
                                {action.label}
                              </Button>
                            );
                          }
                          return null;
                        })}
                      </>
                    ) : (
                      cell.value
                    )}
                  </StyledTd>
                );
              })}
            </StyledTr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default Table;
