import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Redirect, Route, Switch, NavLink } from "react-router-dom";
import Dashboard from "./dashboard/Daskboard";
import News from "./news/News";
import { Button } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const switchRoutes = (
  <Switch>
    <Redirect exact from="/" to="/dashboard" />
    <Redirect exact from="/login" to="/dashboard" />
    <Route component={Dashboard} exact path="/dashboard" />
    <Route
    component={News}
    exact
    path="/news"
  />
    {/* <Route
    component={UserList}
    exact
    path="/users"
  />
  <Route
    component={AddUser}
    exact
    path="/addUser"
  />
  <Route
    component={EditUser}
    exact
    path="/editUser/:id"
  />
  <Route
    component={Account}
    exact
    path="/account"
  /> */}
    <Redirect from="/" to="/not-found" />
  </Switch>
);
function Index(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <NavLink to="/dashboard">
          <ListItem button key="dashboard">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>

        <NavLink to="/news">
          <ListItem button key="news">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="News" />
          </ListItem>
        </NavLink>

        <NavLink to="/users">
          <ListItem button key="users">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </NavLink>

        <NavLink to="/admins">
          <ListItem button key="admins">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Admins" />
          </ListItem>
        </NavLink>

        <NavLink to="/roles">
          <ListItem button key="roles">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Roles" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome, Admin
          </Typography>
          <Button>Logout</Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {switchRoutes}
      </main>
    </div>
  );
}

export default Index;
