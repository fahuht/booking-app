import { Input, Modal, } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearStateCategory, updateCategory } from '../../action/CategoryAction'

const ModalEditCategory = (props) => {
  const { isOpenModalEdit, setIsOpenModalEdit, itemCategory } = props

  const dispatch = useDispatch()
  const { isUpdateCategorySucces } = useSelector((state) => state.categoryReducer)

  const [dataRequest, setDataRquest] = useState({
    categoryId: itemCategory._id,
    name: itemCategory.name || '',
    code: itemCategory.code || '',
  })

  useEffect(() => {
    if (isUpdateCategorySucces) {
      handleCancel()
      dispatch(clearStateCategory())
    }
  }, [isUpdateCategorySucces])

  const handleCancel = () => {
    setIsOpenModalEdit(false)
  }

  // hàm bắt giá trị khi nhập input text
  const handleChange = (e) => {
    const newDataRequest = {
      ...dataRequest,
      [e.target.name]: e.target.value,
    }
    setDataRquest(newDataRequest)
  }

  // hàm call api tạo sản phẩm
  const handleCreateCategory = () => {
    dispatch(updateCategory(dataRequest))
  }

  return (
    <Modal
      open={isOpenModalEdit}
      onCancel={() => handleCancel()}
      title="Sửa danh mục"
      okText="Sửa"
      cancelText="Hủy"
      onOk={() => handleCreateCategory()}
    >
      <div className="d-flex flex-column gap-3 p-3">
        <Input
          name="name"
          value={dataRequest.name}
          placeholder="Nhập tên danh mục"
          type="text"
          onChange={(e) => handleChange(e)}
        />
        <Input
          name="code"
          value={dataRequest.code}
          placeholder="Nhập mã danh mục"
          type="text"
          onChange={(e) => handleChange(e)}
        />
      </div>
    </Modal>
  )
}

export default ModalEditCategory
