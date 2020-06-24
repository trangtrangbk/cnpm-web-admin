import React, { useEffect } from "react";
import { Modal } from "@material-ui/core";
import "../../../assets/modal.css";
import moment from "moment";
import Carousel from "react-material-ui-carousel";
import numeral from "numeral";

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
        style={{ maxWidth: "1000px", overflow: "auto", maxHeight: "900px" }}
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
            <div className="new-info" style={{ textAlign: "center" }}>
              <span style={{ fontStyle: "italic" }}>
                Ngày đăng:{" "}
                {moment(news.createDay).format("DD/MM/YYYY hh:mm:ss")}
              </span>
              <br />
              <span style={{ fontStyle: "italic", marginBottom: "20px" }}>
                Người đăng: {news.user && news.user.name}
              </span>
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Carousel>
                  {news.picture &&
                    news.picture.map((item) => (
                      <img src={item} width="600px" />
                    ))}
                </Carousel>
              </div>
              <div style={{ textAlign: "center" }}>{news.description}</div>
              <div style={{ width: "50%", margin: "auto" }}>
                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    margin: "20px 0",
                  }}
                >
                  <div>Diện tích: </div>
                  <div>{news.area} (m2)</div>
                </div>
                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    margin: "20px 0",
                  }}
                >
                  <div>Giá phòng:</div>
                  <div>{numeral(news.price).format("0,0")} vnd</div>
                </div>
                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    margin: "20px 0",
                  }}
                >
                  <div>Liên hệ:</div>
                  <div>{news.phone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddUserModal;
