import React, { useState, useEffect } from "react";
import { makeStyles, MenuItem } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import request from "../../request";
import DataChart from "react-apexcharts";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(12),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: theme.palette.success.dark,
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const [totalData, setTotalData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  console.log();
  const option = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "T1",
        "T2",
        "T3",
        "T4",
        "T5",
        "T6",
        "T7",
        "T8",
        "T9",
        "T10",
        "T11",
        "T12",
      ],
    },
    stroke: {
      curve: "smooth",
    },
  };
  const series = [
    {
      name: "series-1",
      data:
        chartData.length > 0
          ? chartData.filter((chart) => chart.year == year)[0].data
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  useEffect(() => {
    request()
      .get("/admin/statistic/counttotal")
      .then((res) => setTotalData(res.data));
    request()
      .get("/admin/statistic/countNewsByMonth")
      .then((res) => setChartData(res.data));
  }, []);

  console.log(totalData, chartData);
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    TOTAL NEWS
                  </Typography>
                  {totalData.totalNews ? (
                    <Typography variant="h3">{totalData.totalNews}</Typography>
                  ) : (
                    <CircularProgress />
                  )}
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <LibraryBooksIcon className={classes.icon} />
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    TOTAL USER
                  </Typography>
                  {totalData.totalUser ? (
                    <Typography variant="h3">{totalData.totalUser}</Typography>
                  ) : (
                    <CircularProgress />
                  )}
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <PeopleIcon className={classes.icon} />
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    TOTAL ADMIN
                  </Typography>
                  {totalData.totalAdmin ? (
                    <Typography variant="h3">{totalData.totalAdmin}</Typography>
                  ) : (
                    <CircularProgress />
                  )}
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <PermContactCalendarIcon className={classes.icon} />
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item lg={2} sm={2} xl={2} xs={2}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {chartData.map((data) => (
                <MenuItem value={data.year}>{data.year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={9} sm={9} xl={9} xs={12}>
          <DataChart options={option} series={series} type="area" width="80%" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
