import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Redirect, Route, Switch, NavLink } from "react-router-dom";
import Dashboard from "./dashboard/Daskboard";
import Account from "./profile";
import UserList from "./users/UserList";
import News from "./news/NewsList";
import AdminList from "./admins/AdminList"
import DashboardIcon from "@material-ui/icons/Dashboard";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import GavelIcon from "@material-ui/icons/Gavel";
import Avatar from "@material-ui/core/Avatar";
import history from "../history";
import "../assets/index.css";
import InputIcon from "@material-ui/icons/Input";

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
    <Route component={News} exact path="/news" />
    <Route component={UserList} exact path="/users" />
    <Route component={AdminList} exact path="/admins" />
    <Route component={Account} exact path="/profile" />
    {/* <Redirect from="/" to="/not-found" /> */}
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
      <div className="sidebar_profile" onClick={() => history.push("/profile")}>
        <div className="center">
          <Avatar
            alt="Remy Sharp"
            src="avatar.png"
            style={{ width: "70px", height: "70px" }}
          />
        </div>
        <div style={{ textAlign: "center" }}>Administrator</div>
      </div>
      <Divider />
      <List>
        <ListItem button key="dashboard" style={{ padding: "0px" }}>
          <NavLink to="/dashboard" className="sidebar_item">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </NavLink>
        </ListItem>

        <ListItem button key="news" style={{ padding: "0px" }}>
          <NavLink to="/news" className="sidebar_item">
            <ListItemIcon>
              <WebAssetIcon />
            </ListItemIcon>
            <ListItemText primary="News" />
          </NavLink>
        </ListItem>

        <ListItem button key="user" style={{ padding: "0px" }}>
          <NavLink to="/users" className="sidebar_item">
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="User" />
          </NavLink>
        </ListItem>

        <ListItem button key="admin" style={{ padding: "0px" }}>
          <NavLink to="/admins" className="sidebar_item">
            <ListItemIcon>
              <SupervisedUserCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </NavLink>
        </ListItem>

        <ListItem button key="role" style={{ padding: "0px" }}>
          <NavLink to="/roles" className="sidebar_item">
            <ListItemIcon>
              <GavelIcon />
            </ListItemIcon>
            <ListItemText primary="Permissons" />
          </NavLink>
        </ListItem>
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
          <IconButton className={classes.signOutButton} color="inherit">
            <InputIcon />
          </IconButton>
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
