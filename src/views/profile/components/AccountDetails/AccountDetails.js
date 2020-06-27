import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import request from "../../../../request";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
}));

const AccountDetails = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oldpass, setOldPass] = useState("");
  const [newpass, setNewPass] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [isLoadingInfo, setIsLoadingInfo] = useState(true);
  const [messageError, setMessageError] = useState("");
  const [validate, setValidate] = useState({
    phone: false,
  });
  const ChangeInfor = () => {
    if (address === "" || name === "" || gender === "" || phoneNumber === "") {
      console.log(address, name, gender, phoneNumber);
      setMessageError("Need to enter enough information!");
      setMessageSuccess("");
    } else {
      setIsSending(true);
      request()
        .put("/userinfo", {
          address,
          name,
          gender,
          phoneNumber,
        })
        .then((res) => {
          setIsSending(false);
          setMessageSuccess("Update Information successfully");
          setMessageError("");
        })
        .catch((err) => {
          console.log(err);
          setIsSending(false);
        });
    }
  };

  const ChangePassword = () => {
    if (newpass !== "") {
      setIsChangePass(true);
      request()
        .patch("/accounts/changePassword", {
          oldpass,
          newpass,
        })
        .then((res) => {
          setIsChangePass(false);
          setMessageSuccess("Password changed successfully");
          setMessageError("");
          setOldPass("");
          setNewPass("");
        })
        .catch((err) => {
          setIsChangePass(false);
          setMessageError("Old Password not correct!");
          setMessageSuccess("");
        });
    }
  };
  console.log(messageError, messageSuccess);

  useEffect(() => {
    // get use infor
    const id = JSON.parse(localStorage.getItem("user")).id;
    request()
      .get(`/userinfo/${id}`)
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        setAddress(data.address);
        setGender(data.gender);
        setPhoneNumber(data.phoneNumber);
        setIsLoadingInfo(false);
      });
    request()
      .get(`/accounts/getAccount/${id}`)
      .then((res) => {
        setName(res.data.name);
        setIsLoadingInfo(false);
      });
  }, []);

  return (
    <div>
      <Card {...rest} className={clsx(classes.root, className)}>
        {!isLoadingInfo ? (
          <form>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <p style={{ color: "green", padding: "16px" }}>{messageSuccess}</p>
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    margin="dense"
                    name="Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    value={name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Gender"
                    margin="dense"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                    required
                    value={gender}
                    variant="outlined"
                  >
                    <MenuItem value={"true"}>Male</MenuItem>
                    <MenuItem value={"false"}>Female</MenuItem>
                  </TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    margin="dense"
                    name="phone"
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (
                        !isNaN(e.target.value) &&
                        e.target.value.length == 10
                      ) {
                        let v = validate;
                        v.phone = false;
                        setValidate({ ...v });
                      } else {
                        let v = validate;
                        v.phone = true;
                        setValidate({ ...v });
                      }
                    }}
                    required
                    type="number"
                    value={phoneNumber}
                    variant="outlined"
                    error={validate.phone}
                    helperText={validate.phone ? "Invalid format" : ""}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    margin="dense"
                    name="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    value={address}
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Divider />

                <CardActions
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {!isSending ? (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => ChangeInfor()}
                    >
                      Save profile
                    </Button>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <CircularProgress />
                    </div>
                  )}
                </CardActions>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="OldPassword"
                    margin="dense"
                    name="oldpass"
                    onChange={(e) => setOldPass(e.target.value)}
                    required
                    value={oldpass}
                    type="password"
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="NewPassword"
                    margin="dense"
                    name="newpass"
                    type="password"
                    value={newpass}
                    onChange={(e) => setNewPass(e.target.value)}
                    required
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {!isChangePass ? (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => ChangePassword()}
                >
                  Save password
                </Button>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress />
                </div>
              )}
            </CardActions>

            <p style={{ color: "red", padding: "16px" }}>{messageError}</p>
          </form>
        ) : (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        )}
      </Card>
    </div>
  );
};
AccountDetails.propTypes = {
  className: PropTypes.string,
};
export default AccountDetails;
