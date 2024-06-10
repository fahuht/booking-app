import React, { useState } from 'react'
import { Modal, Input, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { createCategory } from '../../action/CategoryAction'

const ModalAddCategory = (props) => {
  const { isOpenModal, setIsOpenModal } = props
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.categoryReducer.loading)

  const [dataRequest, setDataRquest] = useState({
    name: '',
    code: "",
  })

  const handleCancel = () => {
    setIsOpenModal(false)
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
    dispatch(createCategory(dataRequest))
  }

  return (
    <Modal
      open={isOpenModal}
      onCancel={() => handleCancel()}
      title="Thêm danh mục"
      okText="Thêm"
      cancelText="Hủy"
      onOk={() => handleCreateCategory()}
    >
      <div className="d-flex flex-column gap-3 p-3">
        <Input
          name="name"
          placeholder="Nhập tên danh mục"
          type="text"
          onChange={(e) => handleChange(e)}
        />
        <Input
          name="code"
          placeholder="Nhập mã danh mục"
          type="text"
          onChange={(e) => handleChange(e)}
        />
        
      </div>
    </Modal>
  )
}

export default ModalAddCategory
