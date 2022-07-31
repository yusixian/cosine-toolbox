/*
 * @Author: cos
 * @Date: 2022-05-10 22:31:15
 * @LastEditTime: 2022-06-19 02:17:48
 * @LastEditors: cos
 * @Description:
 * @FilePath: \byte-search\src\components\Toolbar\index.tsx
 */
import React from 'react';
import { UserOutlined, LogoutOutlined, StarOutlined } from '@ant-design/icons';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { Button } from 'antd';
import { clearUserCache } from 'redux/userSlice';
import localStorageUtil from 'utils/localStorageUtil';
import { useNavigate } from 'react-router-dom';
import { getCollections } from 'services/api';
const Toolbar = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector<RootState, User | null>((state) => state.user.userCache);
  const handleLogout = () => {
    console.log('登出！');
    dispatch(clearUserCache(null));
    localStorageUtil.clear('token');
  };

  const handleShowCollections = async () => {
    console.log('展示收藏夹！');
    const collections = await getCollections();
    console.log(collections);
  };
  const handleGoLogin = () => {
    navigate('/login');
  };
  return (
    <div className="toolbar">
      {userInfo && (
        <>
          <div className="toolbar-tool">
            {userInfo.username}
            <UserOutlined style={{ fontSize: 32 }} />
          </div>
          <div className="toolbar-tool" onClick={handleShowCollections}>
            收藏夹
            <StarOutlined style={{ fontSize: 32 }} />
          </div>
          <div className="toolbar-tool" onClick={handleLogout}>
            <span>登出</span>
            <LogoutOutlined style={{ fontSize: 32 }} />
          </div>
        </>
      )}
      {!userInfo && (
        <div className="toolbar-tool" onClick={handleGoLogin}>
          还未登录？前往登录
        </div>
      )}
    </div>
  );
});
export default Toolbar;
