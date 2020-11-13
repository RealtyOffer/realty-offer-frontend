import React, { FunctionComponent } from 'react';
import { useTable, usePagination } from 'react-table';
import styled from 'styled-components';

import { quarterSpacer, baseSpacer } from '../styles/size';
import { baseBorderStyle } from '../styles/mixins';
import { lightestGray, offWhite } from '../styles/color';
import Button from './Button';
import FlexContainer from './FlexContainer';

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
  hasPagination?: boolean;
};

const StyledTable = styled.table`
  margin-bottom: ${baseSpacer};
  width: 100%;
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

const Table: FunctionComponent<TableProps> = ({ columns, data, hasPagination }) => {
  const {
    getTableProps,
    getTableBodyProps,
    page,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );
  const pageOrRows = hasPagination ? page : rows;

  return (
    <>
      <StyledTable {...getTableProps()}>
        <thead>
          <StyledTr>
            {columns.map((column) => (
              <StyledTh key={column.header}>{column.header}</StyledTh>
            ))}
          </StyledTr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {pageOrRows.map((row) => {
            prepareRow(row);
            return (
              <StyledTr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => {
                  // if cell.
                  return (
                    <StyledTd {...cell.getCellProps()} key={cell.getCellProps().key}>
                      {String(cell.getCellProps().key).includes('action') ? (
                        <>
                          {cell.row.original.actions &&
                            cell.row.original.actions.length > 0 &&
                            cell.row.original.actions.map((action: TableActionType) => {
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
                                  <Button
                                    type="link"
                                    key={action.label}
                                    to={action.to}
                                    color="text"
                                  >
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
      {hasPagination && (
        <FlexContainer justifyContent="space-evenly">
          <Button
            type="button"
            color="primaryOutline"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {'<<'}
          </Button>
          <Button
            type="button"
            color="primaryOutline"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {'<'}
          </Button>
          <span>
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
          <Button
            type="button"
            color="primaryOutline"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {'>'}
          </Button>
          <Button
            type="button"
            color="primaryOutline"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </Button>
        </FlexContainer>
      )}
    </>
  );
};

export default Table;
