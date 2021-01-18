import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import React from "react";
import { FUNCTIONS } from "../../../data/functions";

export default class FunctionTable extends React.Component {
  state = {
    rows: [],
  };

  componentDidMount = () => {
    this.updateRows();
  };

  updateRows = () => {
    const rows = [];
    Object.keys(FUNCTIONS)
      .slice(0, 100)
      .map((addr) => {
        rows.push({
          name: FUNCTIONS[addr].name, //
          commit: FUNCTIONS[addr].commit,
        });
      });
    this.setState({ rows });
  };

  renderTableBody = () => {
    return this.state.rows.map((row) => {
      return (
        <TableRow key={row.name}>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell>{row.commit ? row.commit + 1 : null}</TableCell>
        </TableRow>
      );
    });
  };

  render() {
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Commit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}
