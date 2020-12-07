import React, { FunctionComponent } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import styled from 'styled-components';

import { quarterSpacer, baseSpacer } from '../styles/size';
import { baseBorderStyle } from '../styles/mixins';
import { lightestGray, offWhite } from '../styles/color';
import Button from './Button';
import FlexContainer from './FlexContainer';

type TableActionType = {
  to?: string;
  label: string;
  icon: JSX.Element;
  color:
    | 'text'
    | 'primary'
    | 'primaryOutline'
    | 'success'
    | 'successOutline'
    | 'danger'
    | 'dangerOutline'
    | 'tertiary'
    | 'inverseOutline';
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
  hasSorting?: boolean;
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

const Table: FunctionComponent<TableProps> = ({ columns, data, hasPagination, hasSorting }) => {
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
    headerGroups,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );
  const pageOrRows = hasPagination ? page : rows;

  return (
    <>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const headerGroupProps = headerGroup.getHeaderGroupProps();
            return (
              <StyledTr key={headerGroupProps.key} {...headerGroupProps}>
                {headerGroup.headers.map((column) => {
                  const thProps = hasSorting
                    ? column.getHeaderProps(column.getSortByToggleProps())
                    : {};
                  return (
                    <StyledTh key={column.header} {...thProps}>
                      {column.header}
                      {hasSorting && (
                        <>
                          {' '}
                          <span>{column.isSorted && column.isSortedDesc && '🔽'}</span>
                          <span>{column.isSorted && !column.isSortedDesc && '🔼'}</span>
                        </>
                      )}
                    </StyledTh>
                  );
                })}
              </StyledTr>
            );
          })}
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
                                    color={action.color || 'text'}
                                    iconLeft={action.icon}
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
                                    color={action.color || 'text'}
                                    iconLeft={action.icon}
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
      {hasPagination && pageOptions.length > 1 && (
        <>
          <FlexContainer justifyContent="space-between">
            <div>
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
            </div>
            <span>
              Page {pageIndex + 1} of {pageOptions.length}
            </span>
            <div>
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
            </div>
          </FlexContainer>
          <p>&nbsp;</p>
        </>
      )}
    </>
  );
};

export default Table;
