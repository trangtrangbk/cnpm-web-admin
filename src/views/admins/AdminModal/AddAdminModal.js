import React, { useEffect } from "react";
import { Modal, FormGroup, Button, Input } from "@material-ui/core";
import "./adminmodal.css"
function AddUserModal({ handleClose, status }) {
  const referLink = window.location.href;
  console.log("modal");
  return (
    <Modal
      open={status}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" onClick={handleClose}>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick = {handleClose}
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
