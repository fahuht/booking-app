import Helmet from '../components/Helmet/Helmet'
import { Link } from 'react-router-dom'
import AppSection from '../components/app-Section/AppSection'
import { Container } from 'reactstrap'
import '../pages/page-style/Contact.css'
import contactbgImg from '../assets/image/contact_background.jpg'

const Contact = () => {
  return (
    <Helmet title="lien-he">
      <AppSection />
      <Container>
        <div className="container_contact">
          <div className="mt-5 d-flex gap-5 ">
            <div className="contact_img w3-col m6 w3-padding-large w3-hide-small">
              <img
                src={contactbgImg}
                className="w3-round w3-image w3-opacity-min"
                alt="Table Setting"
                width="600"
                height="750"
              />
            </div>
            <div className="w3-col m6 w3-padding-large">
              <h1>Mặt hàng kinh doanh</h1>
              <br />
              <h6>
                Đồ ăn hàng ngày, đồ ăn vặt, các món chay, bánh các loại, đồ uống
              </h6>
              <h6>
                Nguyên liệu tươi ngon nguồn gốc nhập rõ ràng, đảm bảo an toàn vệ
                sinh thực phẩm.
              </h6>
            </div>
          </div>
        </div>
        <div className="left">
          <div className="w3-col m6 w3-padding-large">
            <h1>Thông tin liên hệ</h1> <br />
            <h6>Mỹ Đình, Nam Từ Liêm Hà Nội</h6>
            <h6>Điện thoại: 0375493608</h6>
            <h6>Email: 0375493608</h6>
          </div>
          <h6>
            Fanpage:
            <span>
              {' '}
              <Link to=" https://www.linkedin.com">
                <i class="ri-facebook-circle-fill"></i>
              </Link>{' '}
            </span>
          </h6>
          <h6>
            Instagram:
            <span>
              {' '}
              <Link to=" https://www.linkedin.com">
                <i class="ri-instagram-fill"></i>
              </Link>{' '}
            </span>
          </h6>
          <h6>
            Youtube:
            <span>
              {' '}
              <Link to=" https://www.linkedin.com">
                <i class="ri-youtube-fill"></i>
              </Link>{' '}
            </span>
          </h6>
        </div>
      </Container>
    </Helmet>
  )
}

export default Contact
