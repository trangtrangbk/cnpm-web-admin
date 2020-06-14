import React, { useEffect } from "react";
import { Modal, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../../../assets/modal.css";

function AddUserModal({ handleClose, status }) {
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 }]
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
            <form noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label="usename"
                variant="outlined"
                fullWidth
                margin="dense"
              />
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                fullWidth
                margin="dense"
              />
              <Autocomplete
                style={{margin : "15px 0px"}}
                multiple
                id="tags-outlined"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Role"
                    placeholder="Favorites"
                  />
                )}
              />
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
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
        </div>
      </div>
    </Modal>
  );
}

export default AddUserModal;
