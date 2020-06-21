import React, { useEffect, useRef, useState } from "react";
import { Modal, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../../../assets/modal.css";
import request from "../../../request";
import { useSelector } from "react-redux";

function EditAdminModal({ handleClose, status, roles }) {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const admin = useSelector(store =>store.admin.selectedAdmin)
  const [defaultRole,setDefaultRole] = useState([]);
  useEffect(()=>{
    setDefaultRole(roles.filter(rolex =>admin.role.includes(rolex.code)))
  },[admin])
  console.log(roles,admin,defaultRole)
  const handleEditAdmin = e=>{
    e.preventDefault();
    request().patch(`/admin/accounts/${admin._id}`,{
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
            <h5 className="modal-title">Edit Admin</h5>
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
            <form onSubmit={handleEditAdmin}>
              <TextField
                id="outlined-basic"
                label="name"
                variant="outlined"
                fullWidth
                margin="dense"
                disabled
                value = {admin.name}
              />
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                fullWidth
                margin="dense"
                disabled
                value = {admin.email}
              />
              <Autocomplete
                style={{ margin: "15px 0px" }}
                multiple
                id="tags-outlined"
                onChange={(e, value) => setSelectedRoles(value.map(e=>e.code))}
                options={roles}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                defaultValue= {defaultRole}
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

export default EditAdminModal;
