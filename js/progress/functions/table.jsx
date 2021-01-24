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
  formatFunctionName = (name) => {
    const limit = 40;
    if (name.length > limit) {
      return name.slice(0, limit - 3) + "...";
    }
    return name;
  };
  renderTableBody = () => {
    return this.props.funcs.slice(0, this.props.limit).map((addr) => {
      return (
        <TableRow key={FUNCTIONS[addr].name}>
          <TableCell component="th" scope="row">
            {this.formatFunctionName(FUNCTIONS[addr].name)}
          </TableCell>
          <TableCell>{FUNCTIONS[addr].lines}</TableCell>
          <TableCell>
            {FUNCTIONS[addr].commit ? FUNCTIONS[addr].commit + 1 : null}
          </TableCell>
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
              <TableCell>Name {this.props.limit}</TableCell>
              <TableCell>Lines</TableCell>
              <TableCell>Commit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}
