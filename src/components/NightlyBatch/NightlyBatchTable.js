import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


 const rows = [
  {batchId:1, quotationTime: "20-5-2021 12:00", symbolListState: "AA,IBM,JWT", 
    Runs: [{runId: 1, startTime: "20-3-2021 5pm", endTime: "30-2-2021 6pm",runFor: "AA ABC BB IBM", notFetchedSymbols: "IBM", status: "progress" }]},
{batchId:2, quotationTime: "20-5-2021 12:00", symbolListState: "AA,IBM,JWT",  
    Runs: [{runId: 1, startTime: "20-3-2021 5pm", endTime: "30-2-2021 6pm", runFor: "AA ABC BB IBM", notFetchedSymbols: "IBM", status: "fail" },
        {runId: 2, startTime: "20-3-2021 5pm", endTime: "30-2-2021 6pm", runFor: "AA ABC BB IBM", notFetchedSymbols: "IBM", status: "progress" }]},
{batchId:3,quotationTime: "20-5-2021 12:00", symbolListState: "AA,IBM,JWT",
     Runs: [{runId: 1, startTime: "20-3-2021 5pm", endTime: "30-2-2021 6pm",runFor: "AA ABC BB IBM", notFetchedSymbols: "IBM", status: "progress" },
            {runId: 2, startTime: "20-3-2021 5pm", endTime: "30-2-2021 6pm",runFor: "AA ABC BB IBM", notFetchedSymbols: "IBM", status: "progress" }]},
{batchId:4,quotationTime: "20-5-2021 12:00", symbolListState: "AA,IBM,JWT",
            Runs: [{runId: 1, startTime: "20-3-2021 5pm", endTime: "30-2-2021 6pm",runFor: "AA ABC BB IBM", notFetchedSymbols: "IBM", status: "fail" },
                   {runId: 2, startTime: "20-3-2021 5pm", endTime: "30-2-2021 6pm",runFor: "AA ABC BB IBM", notFetchedSymbols: "IBM", status: "progress" }]}
                ];



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.batchId}
        </TableCell>
        <TableCell align="right">{row.quotationTime}</TableCell>
        <TableCell align="right">{row.symbolListState}</TableCell>
        {/* <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                Runs
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Run Id</TableCell>
                    <TableCell>Start</TableCell>
                    <TableCell align="right">Run For</TableCell>
                    <TableCell align="right">Failed</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Runs.map((RunsRow) => (
                    <TableRow key={RunsRow.runId}>
                      <TableCell component="th" scope="row">
                        {RunsRow.runId}
                      </TableCell>
                      <TableCell>{RunsRow.startTime}</TableCell>
                      <TableCell align="right">{RunsRow.endTime}</TableCell>
                      <TableCell align="right">{RunsRow.runFor}</TableCell>
                      <TableCell align="right">{RunsRow.notFetchedSymbols}</TableCell>
                      <TableCell align="right">{RunsRow.status}</TableCell>
                      {/* <TableCell align="right">
                        {Math.round(RunsRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    quotationTime: PropTypes.string.isRequired,
    // carbs: PropTypes.number.isRequired,
    symbolListState: PropTypes.string.isRequired,
    Runs: PropTypes.arrayOf(
      PropTypes.shape({
        runId: PropTypes.number.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        runFor: PropTypes.string.isRequired,
        notFetchedSymbols: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
      }),
    ).isRequired,
    batchId: PropTypes.number.isRequired,
    // price: PropTypes.number.isRequired,
    // protein: PropTypes.number.isRequired,
  }).isRequired,
};





export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Batch Id</TableCell>
            <TableCell align="right">Quotation Time</TableCell>
            <TableCell align="right">Symbols&nbsp;</TableCell>
            {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.batchId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
