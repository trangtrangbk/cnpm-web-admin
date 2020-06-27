import React, { useEffect, useRef, useState } from "react";
import { Modal, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../../../assets/modal.css";
import request from "../../../request";
import { useSelector } from "react-redux";
import actions from "../../../redux/actions"
import { useDispatch } from "react-redux";
import * as types from "../../../redux/constants"

function EditAdminModal({ handleClose, status, roles,fetchList }) {

  const dispatch = useDispatch();


  const [selectedRoles, setSelectedRoles] = useState([]);
  const admin = useSelector(store =>store.admin.selectedAdmin)
  const [isSending, setIsSending] = useState(false);
  const [defaultRole,setDefaultRole] = useState([]);
  useEffect(()=>{
    let deRole = [];
    try {
      deRole = roles.filter(rolex =>admin.role.includes(rolex.code))
    } catch (error) {
      deRole = []
    }
    setDefaultRole(deRole)
  },[admin])

  const handleEditAdmin = e=>{
    e.preventDefault();
    setIsSending(true)
    request().patch(`/admin/accounts/changeRole/${admin._id}`,{
      "role" : selectedRoles
    }).then(res=>{
      fetchList()
      dispatch(actions.closeModal(types.CLOSE_MODAL_ADD_ADMIN))
      setIsSending(true)
    }).catch(err =>  setIsSending(false))
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
                <button type="submit" disabled={isSending} className="btn btn-primary">
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
