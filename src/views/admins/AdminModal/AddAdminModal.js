import React, { useEffect } from "react";
import { Modal } from "@material-ui/core";

import "./adminmodal.css"
function AddUserModal({ handleClose, status }) {
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
            <h5 className="modal-title">Modal title</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" onClick={handleClose}>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
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
