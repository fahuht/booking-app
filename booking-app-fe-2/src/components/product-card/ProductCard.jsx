import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../product-card/ProductCard.css";
import CardModal from "../CardModal/CardModal";
import FoodIcon from "../../assets/image/food-icon.png";
import addIcon from "../../assets/image/add_icon_green.png";

const ProductCard = (props) => {
  const { _id, title, image, priceBySize } = props.item;
  const { item } = props;

  const user = useSelector((state) => state.authReducer.authData);
  const navigate = useNavigate();

  const [openCardModal, setOpenCardModal] = useState(false);

  const handleAddCart = () => {
    if (!user) {
      navigate("/dang-nhap");
    } else {
      setOpenCardModal(true);
    }
  };

  return (
    <div className="food_item ">
      <div className="food-item-img-container">
        <img
          src={(image && image.url) || FoodIcon}
          alt="product___image"
          className="food-item-image"
        />
        <img
          className="add"
          onClick={() => handleAddCart()}
          src={addIcon}
          alt=""
        />
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{title}</p>
          {/* <span
            onClick={() =>
              navigate(`/foods/${_id}`, { state: { product: item } })
            }
          >
            <p>{title}</p>
          </span> */}
        </div>
        <p className="food-item-price">{priceBySize.sizeS} VND</p>
      </div>
      {openCardModal && (
        <CardModal
          openCardModal={openCardModal}
          setOpenCardModal={setOpenCardModal}
          item={item}
        />
      )}
    </div>
  );
};
export default ProductCard;
