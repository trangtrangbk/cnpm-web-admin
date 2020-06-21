import React, { useEffect, useRef, useState } from "react";
import { Modal, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../../../assets/modal.css";
import request from "../../../request";

function AddAdminModal({ handleClose, status, roles }) {
  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const handleAddAdmin = e=>{
    e.preventDefault();
    request().post("/register",{
      email,
      password,
      isAdmin : true,
      name: username,
      "role" : selectedRoles
    })
  }


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
              <TextField
                id="outlined-basic"
                label="usename"
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
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddAdminModal;
