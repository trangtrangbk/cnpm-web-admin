import React, { useEffect } from "react";
import { Modal } from "@material-ui/core";
import "../../../assets/modal.css";
import moment from "moment";
import Carousel from "react-material-ui-carousel";
import numeral from 'numeral'

function AddUserModal({ handleClose, status, news }) {
  console.log(news);
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
        style={{ maxWidth: "1000px",overflow : "auto", maxHeight : "900px" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{news.title}</h2>
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
              <h3 style={{fontStyle : "italic"}}>
              Ngày đăng:  {moment(news.createDay).format("DD/MM/YYYY hh:mm:ss")}
              </h3>
              <br />
             <h3 style={{fontStyle : "italic", marginBottom: "20px"}}>
             Người đăng: {news.user && news.user.name}</h3>
              <Carousel>
                {news.picture && news.picture.map((item) => (
                  <img src= {item} width = "900px"/>
                ))}
              </Carousel>
              <div>
                {news.description}
              </div>
              <div>
                Diện tích: {news.area} (m2)
              </div>
              <div>
                Giá phòng: {numeral(news.price).format('0,0')} vnd
              </div>
              <div>
                Liên hệ: {news.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddUserModal;
