import React from 'react';
import { Alert } from 'antd';
import { useDispatch } from 'react-redux';
export default function AlertPop(props) {
  return (
    <Alert
      message={props.message}
      description={props.description}
      type={props.type}
      closable
      onClose={props.onClose}
      showIcon
      style={{ marginBottom: '20px' }}
    />
  );
}
