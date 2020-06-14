import React, { useEffect } from "react";
import { Modal } from "@material-ui/core";
import "../../../assets/modal.css";
import moment from "moment";

function AddUserModal({ handleClose, status, news }) {
  return (
    <Modal
      open={status}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div
        className="modal-dialog"
        role="document"
        style={{ maxWidth: "1000px" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{news.title}</h5>
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
            <div className="new-info">
              <span>
                {moment(news.createDay).format("DD/MM/YYYY hh:mm:ss")}
              </span>
              by <span>{news.id_account}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddUserModal;
