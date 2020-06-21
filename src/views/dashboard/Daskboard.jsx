import React from "react";
import { makeStyles } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";

import { TotalUsers, TasksProgress, TotalProfit } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(12),
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
                  <Typography variant="h3">1,600</Typography>
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
                    TOTAL USER
                  </Typography>
                  <Typography variant="h3">1,600</Typography>
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
                  <Typography variant="h3">1,600</Typography>
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
      </Grid>
    </div>
  );
};

export default Dashboard;
