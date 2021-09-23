import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  Grid, Table, TableHeaderRow, PagingPanel, Toolbar, SearchPanel, TableFilterRow,
  ExportPanel, TableGroupRow,
  GroupingPanel,
  DragDropProvider, TableColumnResizing
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState, IntegratedSorting, PagingState, SearchState, FilteringState, IntegratedFiltering, DataTypeProvider,
  IntegratedPaging, GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import { useState, useRef, useCallback, useEffect } from 'react';
import saveAs from 'file-saver';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { CurrencyEditorBase } from './CurrencyEditorBase';
import SaveUserPrefButton from './SaveUserPrefButton';
import ApplyUserPrefButton from './ApplyUserPrefButton';
import * as Handlers from './handleScrollbarFunctions';
import { RangeSlider, InputNumber, InputGroup } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { getScrollBarRange } from './getScrollBarRange';
import { useHistory } from 'react-router-dom';
const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'StockList.xlsx');
  });
};



export const modifyTradabledata = (data) => {

  for (var i = 0; i < data.length; i++) {
    if (data[i].tradeable === true) data[i].tradeable = "Yes";
    else data[i].tradeable = "No";
  }
  return data;
};


const styles = theme => ({
  root: {
    margin: theme.spacing(0),
  },
  numericInput: {
    fontSize: '14px',
    textAlign: 'left',
    width: '100%',
  },
});

const CurrencyEditor = withStyles(styles)(CurrencyEditorBase);

function GridView({ data, preference, loadingStatus, ErrorStatus, isHavingPreference }) {



  const exporterRef = useRef(null);
  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);



  const columns = [

    { name: 'createdAt', title: 'Date' },
    { name: 'regularMarketPrice', title: 'Market Price' },
    { name: 'region', title: 'Region' },
    { name: 'quoteType', title: 'QuoteType' },
    { name: 'regularMarketChange', title: 'Market Change' },
    { name: 'regularMarketChangePercentage', title: 'Market Change Percentage' },
    { name: 'regularMarketDayHigh', title: 'Market Day High' },
    { name: 'regularMarketDayLow', title: 'Market Day Low' },
    { name: 'regularMarketVolume', title: 'Market Volume' },
    { name: 'regularMarketOpen', title: 'Market Open' },
    { name: 'trailingPE', title: 'Trailing PE' },
    { name: 'priceToSales', title: 'Price To Sales' },
    { name: 'forwardPE', title: 'Forward PE' },
    { name: 'tradeable', title: 'Tradeable' },
    { name: 'symbol', title: 'Symbol Id' },
  ];

  const [columnWidths, setColumnWidths] = useState([
    { columnName: 'createdAt', width: 180 },
    { columnName: 'marketQuoteId', width: 180 },
    { columnName: 'regularMarketPrice', width: 190 },
    { columnName: 'region', width: 110 },
    { columnName: 'quoteType', width: 135 },
    { columnName: 'regularMarketChange', width: 210 },
    { columnName: 'regularMarketChangePercentage', width: 280 },
    { columnName: 'regularMarketDayHigh', width: 210 },
    { columnName: 'regularMarketDayLow', width: 210 },
    { columnName: 'regularMarketVolume', width: 210 },
    { columnName: 'regularMarketOpen', width: 190 },
    { columnName: 'trailingPE', width: 140 },
    { columnName: 'priceToSales', width: 150 },
    { columnName: 'forwardPE', width: 140 },
    { columnName: 'tradeable', width: 140 },
    { columnName: 'symbol', width: 140 },
  ]);


  const [tableColumnExtensions] = useState([

    { columnName: 'createdAt', align: 'center', groupingEnabled: false },
    { columnName: 'marketQuoteId', align: 'center' },
    { columnName: 'regularMarketPrice', align: 'center', groupingEnabled: false },
    { columnName: 'region', align: 'center' },
    { columnName: 'quoteType', align: 'center' },
    { columnName: 'regularMarketChange', align: 'center', groupingEnabled: false },
    { columnName: 'regularMarketChangePercentage', align: 'center', groupingEnabled: false },
    { columnName: 'regularMarketDayHigh', align: 'center', groupingEnabled: false },
    { columnName: 'regularMarketDayLow', align: 'center', groupingEnabled: false },
    { columnName: 'regularMarketVolume', align: 'center', groupingEnabled: false },
    { columnName: 'regularMarketOpen', align: 'center', groupingEnabled: false },
    { columnName: 'trailingPE', align: 'center', groupingEnabled: false },
    { columnName: 'priceToSales', align: 'center', groupingEnabled: false },
    { columnName: 'forwardPE', align: 'center', groupingEnabled: false },
    { columnName: 'tradeable', align: 'center' },
    { columnName: 'symbol', align: 'center', groupingEnabled: false },

  ]);

  const [rows, setRows] = useState([]);



  const [filters, setFilters] = useState(preference.filters);
  const [sorting, setSorting] = useState(preference.sorting);
  const [currentPage, setCurrentPage] = useState(preference.currentPage);
  const [pageSize, setPageSize] = useState(preference.pageSize);
  const [pageSizes] = useState([5, 10, 15]);
  const [searchValue, setSearchState] = useState("");
  const [groups, setGroups] = useState(preference.groups);
  const [currencyColumns] = useState(["marketQuoteId", "regularMarketPrice", "regularMarketChange", "regularMarketChangePercentage", "regularMarketDayHigh", "regularMarketDayLow", "regularMarketVolume", "regularMarketOpen", "trailingPe", "priceToSales", "forwardPe", "symbolId"]);
  const [currencyFilterOperations] = useState([
    "equal",
    "notEqual",
    "greaterThan",
    "greaterThanOrEqual",
    "lessThan",
    "lessThanOrEqual",
  ]);


  const [fullRangeOfScollbar, setFullRangeOfScrollbar] = useState(getScrollBarRange(data));
  const [MarketPrice, setMarketPrice] = useState(fullRangeOfScollbar.fullRangeOfMarketPrice);
  const [MarketHigh, setMarketHigh] = useState(fullRangeOfScollbar.fullRangeOfMarketHigh);
  const [MarketOpen, setMarketOpen] = useState(fullRangeOfScollbar.fullRangeOfMarketOpen);
  const [MarketLow, setMarketLow] = useState(fullRangeOfScollbar.fullRangeOfMarketLow);



  const CurrentUserDefinedStates = {
    sorting: sorting,
    currentPage: currentPage,
    pageSize: pageSize,
    MarketPrice: MarketPrice,
    MarketHigh: MarketHigh,
    MarketLow: MarketLow,
    MarketOpen: MarketOpen,
    filters: filters,
    groups: groups
  }

  useEffect(() => {
    setRows(modifyTradabledata(data));
    setFilters(preference.filters);
    setSorting(preference.sorting);
    setCurrentPage(preference.currentPage);
    setPageSize(preference.pageSize);
    setGroups(preference.groups);
    setFullRangeOfScrollbar(getScrollBarRange(data));

  }, [data, preference]);

  useEffect(() => {
    if (isHavingPreference == 0) {
      setMarketPrice(fullRangeOfScollbar.fullRangeOfMarketPrice);
      setMarketHigh(fullRangeOfScollbar.fullRangeOfMarketHigh);
      setMarketLow(fullRangeOfScollbar.fullRangeOfMarketLow);
      setMarketOpen(fullRangeOfScollbar.fullRangeOfMarketOpen);
    }
    else {
      setMarketPrice(preference.MarketPrice);
      setMarketHigh(preference.MarketHigh);
      setMarketLow(preference.MarketLow);
      setMarketOpen(preference.MarketOpen);
    }
  }, [fullRangeOfScollbar, isHavingPreference]);


  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
  });
  const classes = useStyles();
  const history = useHistory();
  var Email = localStorage.getItem("Email");
  if (Email === null || Email === undefined) {
    history.push("/");
    return (<></>);
  }
  return (
    <div data-testid="priceGrid" className="flex-container">
      <div className="left" >
        <div className={classes.root}>

          <Typography id="range-slider" gutterBottom>
            Market Price Range
            </Typography>
          <Slider
            min={fullRangeOfScollbar.fullRangeOfMarketPrice[0]}
            max={fullRangeOfScollbar.fullRangeOfMarketPrice[1]}
            value={MarketPrice}
            onChange={(event, newRange) => {
              const newRows = Handlers.handleMarketPrice(newRange, data);
              setRows(newRows);
              setMarketPrice(newRange);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
          <InputGroup>
            <InputNumber
              min={fullRangeOfScollbar.fullRangeOfMarketPrice[0]}
              max={fullRangeOfScollbar.fullRangeOfMarketPrice[1]}
              value={MarketPrice[0]}
              onChange={(RangeValue) => {
                const newRows = Handlers.handleMarketPriceLowerLimit(RangeValue, data, MarketPrice[1]);
                setRows(newRows);
                setMarketPrice([RangeValue, MarketPrice[1]]);
              }}
            />
            <InputGroup.Addon>to</InputGroup.Addon>
            <InputNumber
              min={fullRangeOfScollbar.fullRangeOfMarketPrice[0]}
              max={fullRangeOfScollbar.fullRangeOfMarketPrice[1]}
              value={MarketPrice !== undefined ? MarketPrice[1] : fullRangeOfScollbar.fullRangeOfMarketPrice[1]}
              onChange={(RangeValue) => {
                const newRows = Handlers.handleMarketPriceUpperLimit(RangeValue, data, MarketPrice[0]);
                setRows(newRows);
                setMarketPrice([MarketPrice[0], RangeValue]);
              }}
            />
          </InputGroup>
          <hr />
          <Typography id="range-slider" gutterBottom>
            Market Open Range
          </Typography>
          <Slider
            min={fullRangeOfScollbar.fullRangeOfMarketOpen[0]}
            max={fullRangeOfScollbar.fullRangeOfMarketOpen[1]}
            value={MarketOpen}
            onChange={(event, newRange) => {
              const newRows = Handlers.handleMarketOpen(newRange, data);
              setRows(newRows);
              setMarketOpen(newRange);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"

          />
          <InputGroup>
            <InputNumber
              min={fullRangeOfScollbar.fullRangeOfMarketOpen[0]}
              max={fullRangeOfScollbar.fullRangeOfMarketOpen[1]}
              value={MarketOpen !== undefined ? MarketOpen[0] : 0}
              onChange={(RangeValue) => {
                const newRows = Handlers.handleMarketOpenLowerLimit(RangeValue, data, MarketOpen[1]);
                setRows(newRows);
                setMarketOpen([RangeValue, MarketOpen[1]]);
              }}
            />
            <InputGroup.Addon>to</InputGroup.Addon>
            <InputNumber
              min={fullRangeOfScollbar.fullRangeOfMarketOpen[0]}
              max={fullRangeOfScollbar.fullRangeOfMarketOpen[1]}
              value={MarketOpen !== undefined ? MarketOpen[1] : 400}
              onChange={(RangeValue) => {
                const newRows = Handlers.handleMarketOpenUpperLimit(RangeValue, data, MarketOpen[0]);
                setRows(newRows);
                setMarketOpen([MarketOpen[0], RangeValue]);
              }}
            />
          </InputGroup>
          <hr />
          <Typography id="range-slider" gutterBottom>
            Market High Range
          </Typography>
          <Slider
            min={fullRangeOfScollbar.fullRangeOfMarketHigh[0]}
            max={fullRangeOfScollbar.fullRangeOfMarketHigh[1]}
            value={MarketHigh}
            onChange={(event, newRange) => {
              const newRows = Handlers.handleMarketHigh(newRange, data);
              setRows(newRows);
              setMarketHigh(newRange);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
          <InputGroup>
            <InputNumber
              min={fullRangeOfScollbar.fullRangeOfMarketHigh[0]}
              max={fullRangeOfScollbar.fullRangeOfMarketHigh[1]}
              value={MarketHigh !== undefined ? MarketHigh[0] : 0}
              onChange={(RangeValue) => {
                const newRows = Handlers.handleMarketHighLowerLimit(RangeValue, data, MarketHigh[1]);
                setRows(newRows);
                setMarketHigh([RangeValue, MarketHigh[1]]);
              }}
            />
            <InputGroup.Addon>to</InputGroup.Addon>
            <InputNumber
              min={fullRangeOfScollbar.fullRangeOfMarketHigh[0]}
              max={fullRangeOfScollbar.fullRangeOfMarketHigh[1]}
              value={MarketHigh !== undefined ? MarketHigh[1] : 400}
              onChange={(RangeValue) => {
                const newRows = Handlers.handleMarketHighUpperLimit(RangeValue, data, MarketHigh[0]);
                setRows(newRows);
                setMarketHigh([MarketHigh[0], RangeValue]);
              }}
            />
          </InputGroup>
          <hr />
          <Typography id="range-slider" gutterBottom>
            Market Low Range
            </Typography>
          <Slider
            min={fullRangeOfScollbar.fullRangeOfMarketLow[0]}
            max={fullRangeOfScollbar.fullRangeOfMarketLow[1]}
            value={MarketLow}
            onChange={(event, newRange) => {
              const newRows = Handlers.handleMarketLow(newRange, data);
              setRows(newRows);
              setMarketLow(newRange);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
          <InputGroup>
            <InputNumber
              min={fullRangeOfScollbar.fullRangeOfMarketLow[0]}
              max={fullRangeOfScollbar.fullRangeOfMarketLow[1]}
              value={MarketLow !== undefined ? MarketLow[0] : fullRangeOfScollbar.fullRangeOfMarketLow[0]}
              onChange={(RangeValue) => {
                const newRows = Handlers.handleMarketLowLowerLimit(RangeValue, data, MarketLow[1]);
                setRows(newRows);
                setMarketLow([RangeValue, MarketLow[1]]);
              }}
            />
            <InputGroup.Addon>to</InputGroup.Addon>
            <InputNumber
              min={fullRangeOfScollbar.fullRangeOfMarketLow[0]}
              max={fullRangeOfScollbar.fullRangeOfMarketLow[1]}
              value={MarketLow !== undefined ? MarketLow[1] : fullRangeOfScollbar.fullRangeOfMarketLow[0]}
              onChange={(RangeValue) => {
                const newRows = Handlers.handleMarketLowUpperLimit(RangeValue, data, MarketLow[0]);
                setRows(newRows);
                setMarketLow([MarketLow[0], RangeValue]);
              }}
            />
          </InputGroup>
          <hr />
        </div>
        <SaveUserPrefButton
          CurrentUserDefinedStates={CurrentUserDefinedStates}
          isHavingPreference={isHavingPreference}
          loadingStatus={loadingStatus}
          ErrorStatus={ErrorStatus}
        />
        <br />
        <ApplyUserPrefButton
          loadingStatus={loadingStatus}
          ErrorStatus={ErrorStatus}
        />

      </div>
      <div className="right">
        <Paper>
          <Grid
            rows={rows}
            columns={columns}
          >
            <SearchState
              value={searchValue}
              onValueChange={setSearchState}
            />
            <DataTypeProvider
              for={currencyColumns}
              availableFilterOperations={currencyFilterOperations}
              editorComponent={CurrencyEditor}
            />
            <FilteringState
              filters={filters}
              onFiltersChange={setFilters} />
            <IntegratedFiltering />

            <SortingState
              sorting={sorting}
              onSortingChange={setSorting}
            />
            <IntegratedSorting />
            <DragDropProvider />
            <GroupingState
              grouping={groups}
              onGroupingChange={setGroups}
              columnExtensions={tableColumnExtensions}
            />
            <IntegratedGrouping />
            <PagingState
              currentPage={currentPage}
              onCurrentPageChange={setCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
            <IntegratedPaging />
            <Table columnExtensions={tableColumnExtensions} />
            <TableColumnResizing
              columnWidths={columnWidths}
              onColumnWidthsChange={setColumnWidths}
            // minColumnWidth={ minColumnWidth } 
            />
            <TableHeaderRow showSortingControls />
            <TableGroupRow />
            <TableFilterRow
              showFilterSelector
            />
            <PagingPanel pageSizes={pageSizes} />
            <Toolbar />
            <SearchPanel />
            <GroupingPanel showGroupingControls />
            <ExportPanel startExport={startExport} />

          </Grid>
          <GridExporter
            ref={exporterRef}
            rows={rows}
            columns={columns}
            sorting={sorting}
            onSave={onSave}
          />

        </Paper>
      </div>
    </div>);
};
export default GridView;