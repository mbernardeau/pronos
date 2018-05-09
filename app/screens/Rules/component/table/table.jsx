import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

const RuleTable = ({ header, rows }) => (
  <Table>
    <TableHead>
      <TableRow>
        {map(header, (headerCol, index) => <TableCell key={index}>{headerCol}</TableCell>)}
      </TableRow>
    </TableHead>
    <TableBody>
      {map(rows, (row, index) => (
        <TableRow key={index}>
          {map(row, (col, id) => <TableCell key={id}>{col}</TableCell>)}
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

RuleTable.defaultProps = {
  header: [],
  rows: [[]],
}

RuleTable.propTypes = {
  header: PropTypes.arrayOf(PropTypes.node),
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)),
}

export default RuleTable
