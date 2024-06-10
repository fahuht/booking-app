import React, { useEffect, useState } from 'react'
import { Modal, Checkbox, Card } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LIST_PERMISSION } from '../../constants/constants'
import { addPermission } from '../../action/UserAction'
const ModalChangePermission = (props) => {
  const { isOpenModal, setIsOpenModal, selectedItem } = props
  const dispatch = useDispatch()
  // const listCategory = useSelector(
  //   (state) => state.categoryReducer.listCategory,
  // )

  const [dataRequest, setDataRquest] = useState({
    userId: selectedItem?._id || '',
    listPermission: [],
  })

  const [listPermission, setListPermission] = useState([])

  useEffect(() => {
    setListPermission(LIST_PERMISSION)
    setDataRquest({
      ...dataRequest,
      listPermission: selectedItem?.listPermission || [],
      isAdmin: false
    })
  }, [])

  const handleCancel = () => {
    setIsOpenModal(false)
  }

  // hàm call api tạo sản phẩm
  const handleAddPermission = () => {
    dispatch(addPermission(dataRequest))
  }

  const onChange = (checkedValues) => {
    setDataRquest({
      ...dataRequest,
      listPermission: checkedValues,
    })
  }

  const onSetAdmin = (e) => {
    if (e.target.checked) {
      setDataRquest({
        ...dataRequest,
        listPermission: LIST_PERMISSION.map(item => item.value),
        isAdmin: true
      })
      setListPermission(
        LIST_PERMISSION.map((item) => {
          return { ...item, disabled: true }
        }),
      )
    } else {
      setDataRquest({
        ...dataRequest,
        listPermission: [],
        isAdmin: false
      })
      setListPermission(
        LIST_PERMISSION.map((item) => {
          return { ...item, disabled: false }
        }),
      )
    }
  }

  console.log(listPermission);

  return (
    <Modal
      open={isOpenModal}
      onCancel={() => handleCancel()}
      title="Chỉnh sửa quyền"
      okText="Xác nhận"
      cancelText="Hủy"
      onOk={() => handleAddPermission()}
    >
      <div className="d-flex flex-column gap-3 p-3">
        <Card
          title={`${selectedItem?.firstname || ''} ${
            selectedItem?.lastname || ''
          }`}
          extra={<Checkbox onChange={onSetAdmin}>Là quản trị viên</Checkbox>}
          // style={{
          //   width: 300,
          // }}
        >
          <Checkbox.Group
            value={dataRequest.listPermission || []}
            options={listPermission}
            onChange={onChange}
          />
        </Card>
      </div>
    </Modal>
  )
}

export default ModalChangePermission
