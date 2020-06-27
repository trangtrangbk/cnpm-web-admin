import React, { useEffect, useState } from "react";
import { Modal, Avatar, Typography } from "@material-ui/core";
import "../../../assets/modal.css";
import moment from "moment";
import Carousel from "react-material-ui-carousel";
import numeral from "numeral";
import request from "../../../request";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getInitials } from "../../../helpers";

function ViewNewsModal({ handleClose, status, news }) {
  console.log(news);
  const [listCmt, setListCmt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (news._id) {
      setIsLoading(true);
      request()
        .get(`/comment/${news._id}`)
        .then((res) => {
          console.log(res);
          setListCmt(res.data);
          setIsLoading(false);
        })
        .catch((err) => setIsLoading(false));
    }
  }, [news]);

  const onRemoveCmt = (id) => {
    request()
      .delete(`/comment/${id}`)
      .then((res) => {
        setListCmt(listCmt.filter((cmt) => cmt._id != id));
      })
      .catch((err) => console.log(err));
  };
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
            {listCmt.length !== 0 && (
              <div className="comment">
                {isLoading ? (
                  <div style={{ textAlign: "center" }}>
                    <CircularProgress />
                  </div>
                ) : (
                  listCmt.map((cmt, index) => (
                    <>
                      <div
                        style={{
                          padding: "10px 0",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={cmt.avatar}
                            style={{ marginRight: "7px" }}
                          >
                            {getInitials(cmt.nameWriter)}
                          </Avatar>
                          <Typography
                            variant="body1"
                            style={{ color: "#2673b7" }}
                          >
                            {cmt.nameWriter}
                          </Typography>
                          <div style={{ fontSize: "16px", marginLeft: "20px" }}>
                            <span>{cmt.comment}</span>
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: "20px",
                            color: "#ccc",
                            padding: "15px",
                            cursor: "pointer",
                          }}
                          onClick={() => onRemoveCmt(cmt._id)}
                        >
                          x
                        </span>
                      </div>
                        <div
                          style={{ height: "1px", backgroundColor: "#ccc" }}
                        ></div>
                    </>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ViewNewsModal;
