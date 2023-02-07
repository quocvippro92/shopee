import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-3 col-sm-12 footer-item">
            <div class="item">
              <Link  to="/product-exchange" className="item-color">
                <i class="fa fa-clock-o clock" aria-hidden="true"></i>
                <div>
                  <p>
                    <h5>6 ngày đổi sản phẩm</h5>
                  </p>
                  <h6>Đổi trả sản phẩm trong 6 ngày</h6>
                </div>
              </Link>
            </div>
          </div>
          <div className="col col-md-3 col-sm-12  footer-item" >
            <div class="item">
              <Link  to="/product-phone" className="item-color">
                <i class="fa fa-volume-control-phone" aria-hidden="true"></i>
                <div>
                  <p>
                    <h5>Hotline 1800 6650</h5>
                  </p>
                  <p><h6>8h00 - 21h00, T2 - CN nghỉ Tết Âm lịch</h6></p>
                </div>
              </Link>
            </div>
          </div>
          <div className="col col-md-3 col-sm-12 footer-item">
            <div class="item">
              <Link  to="/product-truck" className="item-color">
              <i class="fa fa-truck" aria-hidden="true"></i>
                <div>
                  <p>
                    <h5>Vận Chuyển</h5>
                  </p>
                  <h6>đồng giá 25k trên toàn quốc</h6>
                </div>
              </Link>
            </div>
          </div>
          <div className="col col-md-3 col-sm-12  footer-item">
            <div class="item">
              <Link  to="/product-fa-home" className="item-color">
              <i class="fa fa-home" aria-hidden="true"></i>
                <div>
                  <p>
                    <h5>Hệ Thống Cửa Hàng</h5>
                  </p>
                  <h6>gần 60 cửa hàng trên toàn quốc</h6>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div class="row end">
          <div className="col col-md-4 col-sm-12 ">
            <div className="item-item">
              <h3>QH-SHOP</h3>
              <h6>Sang trọng</h6>
              <h6>Ứng dụng ở mức giá tầm trung</h6>
            </div>
          </div>
          <div className="col col-md-4 col-sm-12">
            <div className="item-item">
              <h3>Hổ-Trợ-Khách-Hàng</h3>
              <h6>Chính sách vận chuyển</h6>
              <h6>Chính sách đổi trả</h6>
              <h6>phương thức thanh toán</h6>
            </div>
          </div>
          <div className="col col-md-4 col-sm-12">
            <div className="item-item">
              <h3>SOCIAL NETWORK</h3>
              <div className="social-network">
              <i class="fa fa-instagram" aria-hidden="true"></i>
              <i class="fa fa-facebook" aria-hidden="true"></i>
              <i class="fa fa-youtube-play" aria-hidden="true"></i>
              <i class="fa fa-twitter" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="copyright">
                <span>©2020 QH-SHOP.VN</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
