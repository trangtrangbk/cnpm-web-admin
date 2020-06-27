import React, { useEffect, useRef, useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../../../assets/modal.css";
import request from "../../../request";
import actions from "../../../redux/actions"
import { useDispatch } from "react-redux";
import * as types from "../../../redux/constants"

function AddAdminModal({ handleClose, status, roles, fetchList}) {

  const dispatch = useDispatch();

  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [err, setErr] = useState("");
  const handleAddAdmin = e=>{
    e.preventDefault();
    setIsSending(true)
    request().post("/register",{
      email,
      password,
      isAdmin : true,
      name: username,
      "role" : selectedRoles
    }).then(res =>{
      fetchList()
      dispatch(actions.closeModal(types.CLOSE_MODAL_ADD_ADMIN))
      setIsSending(false)
    })
    .catch(err =>{
      setErr("Something went wrong! Please try it later");
      setIsSending(false)
    })
  }
  console.log("add admin", isSending)

  return (
    <Modal
      open={status}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Admin</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" onClick={handleClose}>
                &times;
              </span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddAdmin}>
              <p style={{color : "red", padding : "10px 0"}}>{err}</p>
              <TextField
                id="outlined-basic"
                label="name"
                variant="outlined"
                fullWidth
                margin="dense"
                onChange = {e=>setUsername(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                fullWidth
                margin="dense"
                onChange = {e=>setEmail(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="password"
                type="password"
                onChange = {e=>setPassword(e.target.value)}
                variant="outlined"
                fullWidth
                margin="dense"
              />
              <Autocomplete
                style={{ margin: "15px 0px" }}
                multiple
                id="tags-outlined"
                onChange={(e, value) => setSelectedRoles(value.map(e=>e.code))}
                options={roles}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Role"
                    placeholder="Choose roles"
                  />
                )}
              />
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <Button type="submit" disabled={isSending} className="btn btn-primary">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddAdminModal;
