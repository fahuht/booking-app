import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import categoryImg01 from '../../assets/image/category-01.png'
import categoryImg02 from '../../assets/image/category-02.png'
import categoryImg03 from '../../assets/image/category-03.png'
import categoryImg04 from '../../assets/image/category-04.png'
import '../Category/Category.css'

const categoryData = [
  {
    display: 'Đồ ăn',
    imgUrl: categoryImg01,
  },

  {
    display: 'Đồ uống',
    imgUrl: categoryImg03,
  },
  {
    display: 'Các loại bánh',
    imgUrl: categoryImg02,
  },

  {
    display: 'Món chay',
    imgUrl: categoryImg04,
  },
]
const Category = () => {
  return (
    <Container className="mt-2">
      <Row>
        {categoryData.map((item, index) => (
          <Col lg="3" md="4">
            <div className="category__item d-flex align-items-center">
              <div className="category_img">
                <img src={item.imgUrl} alt="categoryImg" />
              </div>
            </div>
            <h6>{item.display}</h6>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Category
