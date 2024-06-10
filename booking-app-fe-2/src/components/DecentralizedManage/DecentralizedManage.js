import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  approveUser,
  clearStateUser,
  deleteUser,
  getListUser,
} from '../../action/UserAction'
import { Button, Pagination, Table, Input, notification } from 'antd'
import Loading from '../Loading/Loading'
import ModalChangePermission from './ModalChangePermission'
import { LIST_PERMISSION } from '../../constants/constants'
const { Search } = Input

const DecentralizedManage = () => {
  const dispatch = useDispatch()
  const listUser = useSelector((state) => state.userReducer.listUser)
  const { isDeleteUserSuccess, isUpdatePermissionSuccess, loading } =
    useSelector((state) => state.userReducer)
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description,
    })
  }
  const baseRequest = {
    page: 1,
    size: 5,
  }
  const [dataRequest, setDataRquest] = useState(baseRequest)
  const [selectedItem, setSelectedItem] = useState({})
  const [openModalChangePermission, setOpenModalChangePermission] =
    useState(false)

  useEffect(() => {
    if (isDeleteUserSuccess)
      openNotificationWithIcon('success', 'Xoá thành công', '')
    dispatch(
      getListUser({
        ...dataRequest,
      }),
    )
    dispatch(clearStateUser())
  }, [isDeleteUserSuccess])

  useEffect(() => {
    if (isUpdatePermissionSuccess)
      openNotificationWithIcon('success', 'Cập nhật quyền thành công', '')
    dispatch(
      getListUser({
        ...dataRequest,
      }),
    )
    dispatch(clearStateUser())
    setSelectedItem({})
    setOpenModalChangePermission(false)
  }, [isUpdatePermissionSuccess])

  useEffect(() => {
    dispatch(
      getListUser({
        ...dataRequest,
      }),
    )
    dispatch(clearStateUser())
  }, [])

  const handleOpenModalEditPermission = (record) => {
    setSelectedItem(record)
    setOpenModalChangePermission(true)
  }

  const columns = [
    {
      title: 'Tên người dùng',
      align: '',
      // dataIndex: 'title',
      key: 'username',
      render: (record) => {
        return (
          <div className="d-flex flex-column">
            <span>
              {`${record?.firstname || ''} ${record?.lastname || ''}`}
            </span>
          </div>
        )
      },
    },
    {
      align: '',
      title: 'Email/Tài khoản ',
      // dataIndex: 'price',
      key: 'price',
      render: (record) => {
        return (
          <div className="d-flex flex-column">
            {record && <span>{record.username}</span>}
          </div>
        )
      },
    },
    {
      title: 'Quyền',
      align: 'center',
      //   dataIndex: 'permission',
      key: 'permission',
      render: (record) => {
        return (
          <div className="d-flex flex-column">
            {record?.listPermission.map((permission) => {
              return <span>{LIST_PERMISSION.find(item => item.value === permission).label}</span>
            })}
          </div>
        )
      },
    },
    {
      title: 'Thao tác',
      align: 'center',
      key: 'actions',
      render: (record) => {
        return (
          <div>
            <div className="d-flex justify-content-center gap-1">
              <Button
                onClick={() => {
                  handleOpenModalEditPermission(record)
                }}
              >
                Sửa quyền
              </Button>
              <Button
                onClick={() => dispatch(deleteUser({ userId: record._id }))}
              >
                Xóa
              </Button>
            </div>
          </div>
        )
      },
    },
  ]

  const handlePageChange = (page) => {
    const newDataRequest = {
      ...dataRequest,
      page,
    }
    setDataRquest(newDataRequest)
    dispatch(
      getListUser({
        ...newDataRequest,
      }),
    )
  }

  const onSearch = (value, _e, info) => {
    const newDataRequest = {
      ...dataRequest,
      keySearch: value,
    }
    setDataRquest(newDataRequest)
    dispatch(
      getListUser({
        ...newDataRequest,
      }),
    )
  }

  return (
    <div className="">
      {contextHolder}
      <div className="mt-3">
        <div className="mb-3">
          <Search
            placeholder="Tìm kiếm người dùng"
            onSearch={onSearch}
            // enterButton
            style={{
              width: 500,
            }}
          />
        </div>
        <Table
          dataSource={listUser && listUser.data}
          columns={columns}
          pagination={false}
        />
        <div className="d-flex justify-content-center mt-2">
          <Pagination
            current={dataRequest.page}
            pageSize={dataRequest.size}
            total={(listUser && listUser.totalElement) || 0}
            onChange={(page) => handlePageChange(page)}
          />
        </div>
      </div>
      <Loading isLoading={loading} />
      {openModalChangePermission && (
        <ModalChangePermission
          isOpenModal={openModalChangePermission}
          setIsOpenModal={setOpenModalChangePermission}
          selectedItem={selectedItem}
        />
      )}
    </div>
  )
}

export default DecentralizedManage
