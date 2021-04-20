import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Modal, message, Tooltip,
} from 'antd';
import { DeleteTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import Axios from 'axios';

const { confirm } = Modal;
function DeleteModal({
  uid, handleDelete, refreshData, pleaseLogin,
}, props) {
  // const [show, setShow] = useState(false)
  function showDeleteConfirm() {
    confirm({
      title: 'Do you want to delete this restaurant ?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        handleDelete(uid);
      },

    });
  }
  const successfulDelete = () => {
    message.success('Restaurant Deleted');
  };
  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const history = useHistory();
  function handleDelete(id) {
    console.log('uid:-', id);
    Axios.delete(`http://localhost:1337/api/restaurant?uid=${id}`, {
    headers:headers.headers,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);

        if (res.data.status == 300 && res.data.message == 'Please Login') {
          history.push('/restaurants');
          pleaseLogin();
        } if (res.data.status == 401 && res.data.message == 'Please login.') {
          history.push('/restaurants');
          pleaseLogin();
        } else {
          refreshData();
          successfulDelete();
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <Tooltip title="Delete Restaurant" placement="topLeft"><DeleteTwoTone onClick={showDeleteConfirm} /></Tooltip>

    </div>
  );
}

export default DeleteModal;
