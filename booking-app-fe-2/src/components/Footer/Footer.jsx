import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import logo from "../../assets/image/res-logo.png";
import "../Footer/Footer.css";
const Footer = () => {
  return (
    <footer className="footer-footer">
      <Container className="footer-container">
        <div className="footer-wrapper">
          <Row>
            <Col lg="3" sm="4" md="6">
              <div className="footer-logo">
                <img src={logo} alt="footer-logo" />
                <p>
                  Sự hài lòng của quý khách <br /> là thành công của chúng tôi!
                </p>
              </div>
            </Col>

            <Col lg="3" sm="4" md="6">
              <h5 className="footer_title">Giờ mở cửa</h5>
              <ListGroup className="footer_listgroup">
                <ListGroupItem className="footer_listgroup_item border-0 ps-0">
                  <span>Thứ 2 - Thứ 7</span>
                  <p>Từ 9h -24h</p>
                </ListGroupItem>

                <ListGroupItem className="footer_listgroup_item border-0 ps-0">
                  <span>Phục vụ 24/7</span>
                  <p>Các dịp Lễ-Tết</p>
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col lg="3" sm="4" md="6">
              <ListGroup className="footer_listgroup">
                <h5 className="footer_title">Liên hệ</h5>
                <ListGroupItem className="footer_listgroup_item border-0 ps-0">
                  <p>
                    Địa chỉ: <br /> Thành Phố Hà Nội
                  </p>
                </ListGroupItem>

                <ListGroupItem className="footer_listgroup_item border-0 ps-0">
                  <span>
                    Điện thoại: 0375493608
                    <br />
                  </span>
                  <span>Email: tranghad02@gmail.com</span>
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col lg="3" sm="4" md="6">
              <ListGroup className="footer_listgroup">
                <h5 className="footer_title">Follow us</h5>
                <ListGroupItem className="footer_listgroup_item border-0 ps-0">
                  <div className="social__links d-flex align-items-center gap-4 ">
                    <span>
                      {" "}
                      <Link to="https://www.facebook.com/ducviet260909/">
                        <i class="ri-facebook-line"></i>
                      </Link>{" "}
                    </span>

                    <span>
                      <Link to="https://github.com">
                        <i class="ri-github-line"></i>
                      </Link>
                    </span>

                    <span>
                      {" "}
                      <Link to=" https://www.youtube.com">
                        <i class="ri-youtube-line"></i>
                      </Link>{" "}
                    </span>

                    <span>
                      {" "}
                      <Link to=" https://www.linkedin.com">
                        <i class="ri-linkedin-line"></i>
                      </Link>{" "}
                    </span>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>

          <Row className="copyright_footer mt-5">
            <Col lg="6" md="6">
              <p>Copyright@2023</p>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
