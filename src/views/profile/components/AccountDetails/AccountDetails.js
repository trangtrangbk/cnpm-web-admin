import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, InputLabel } from '@material-ui/core';
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
  Select,
  MenuItem,
  CircularProgress
} from '@material-ui/core';
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = (props)=> {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [address, setAddress] = useState("");
  const [name, setName]=useState("");
  const[gender,setGender]=useState("");
  const[phoneNumber, setPhoneNumber]=useState("");
  const [isSending, setIsSending] = useState(true);

  const [validate, setValidate] = useState({
    phone: false,
  })
  const ChangeInfor = (e)=>{
//   // coi cai addamin
        e.preventDefault();
        setIsSending(true)
        request().put("/userinfo",{
          address,
          name,
          gender,
          phoneNumber
        }).then(res =>{
          setIsSending(false)
        })
        .catch(err =>console.log(err))
 }

  useEffect(()=>{
  // get use inforx
    const id= JSON.parse(localStorage.getItem('user')).id;
    request().get(`/userinfo/${id}`).then(res=>{
    console.log(res.data)
    const data = res.data
    setAddress(data.address)
    setGender(data.gender)
    setPhoneNumber(data.phoneNumber)
    setIsSending(false)
   })
   request().get(`/accounts/getAccount/${id}`).then(res=>{
     setName(res.data.name)
     setIsSending(false)
   })
},[])

  return (
    <div>
{!isSending ?<Card
      {...rest}
      className={clsx(classes.root, className)}
    >

      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >

              <TextField
                fullWidth
                label="Name"
                margin="dense"
                name="Name"
                onChange={(e)=>setName(e.target.value)}
                required
                value={name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                select
                label="Gender"
                margin="dense"
                name="gender"
                onChange={(e)=>setGender(e.target.value)}
                required
                value={gender}
                variant="outlined"
              >
                <MenuItem value={"true"}>Male</MenuItem>
                <MenuItem value={"false"}>Female</MenuItem>
              </TextField>
           </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phone"
                onChange={(e)=>{
                  setPhoneNumber(e.target.value);
                  if(!isNaN(e.target.value) && e.target.value.length == 10){
                    let v = validate;
                    v.phone = false;
                    setValidate({...v});
                  }else{
                    let v = validate;
                    v.phone = true;
                    setValidate({...v});
                  }
                }}
                required
                type="number"
                value={phoneNumber}
                variant="outlined"
                error={validate.phone}
                helperText={validate.phone?"Invalid format":""}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                margin="dense"
                name="Address"
                onChange={(e)=>setAddress(e.target.value)}
                required
                value={address}
                variant="outlined"
              >
              </TextField>
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={ChangeInfor}
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>:(<div style={{textAlign : "center"}}>
    <CircularProgress />
    </div>)}
    </div>

  );
};
AccountDetails.propTypes = {
  className: PropTypes.string
};
export default AccountDetails