export const URL_SERVER = "http://localhost:5000";

export const LIST_PERMISSION = [
  {
    label: "Quản lý sản phẩm",
    value: "QL_SAN_PHAM",
  },
  {
    label: "Quản lý đơn hàng",
    value: "QL_DON_HANG",
  },
  {
    label: "Quản lý danh mục",
    value: "QL_DANH_MUC",
  },
];

export const convertSize = (sizeField) => {
  switch (sizeField) {
    case "sizeM":
      return "M";
    case "sizeL":
      return "L";
    case "sizeS":
      return "S";
    default:
      return "";
  }
};
