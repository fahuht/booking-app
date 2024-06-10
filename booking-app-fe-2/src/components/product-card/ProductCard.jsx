import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import '../product-card/ProductCard.css'
import CardModal from '../CardModal/CardModal'
import FoodIcon from '../../assets/image/food-icon.png'

const ProductCard = (props) => {
  const { _id, title, image, priceBySize } = props.item
  const { item } = props

  const user = useSelector((state) => state.authReducer.authData)
  const navigate = useNavigate()

  const [openCardModal, setOpenCardModal] = useState(false)

  const handleAddCart = () => {
    if (!user) {
      navigate('/dang-nhap')
    } else {
      setOpenCardModal(true)
    }
  }
  return (
    <div className="product_item d-flex flex-column ">
      <div className="product_image">
        <img src={image && image.url || FoodIcon} alt="product___image" className="w-50" />
      </div>
      <div className="product__content">
        <h5>
          <span
            onClick={() =>
              navigate(`/foods/${_id}`, { state: { product: item } })
            }
          >
            {title}
          </span>
        </h5>
        <div className="d-flex align-items-content justify-content-between ">
          <span className="product__price">{priceBySize.sizeS}đ</span>
          <button className="addtoCart_btn" onClick={() => handleAddCart()}>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      {openCardModal && (
        <CardModal
          openCardModal={openCardModal}
          setOpenCardModal={setOpenCardModal}
          item={item}
        />
      )}
    </div>
  )
}
export default ProductCard
