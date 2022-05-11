import React from 'react';
import { ReactComponent } from '../../assets/xiaohudao/icons/tiger.svg';
import { LoginPanel } from '../../common/LoginPanel/login-panel.js';

const LoginPage = ({loginProcessing}) => {
  return <div className="login">
    <LoginPanel
      loginProcessing={loginProcessing}
      requireName={true}
      requirePasswd={true}
      requireRole={false}
      Title={"小虎岛会议配置系统"}
      roleOptions={[]}
      ReactComponent={ReactComponent}
    />
  </div>
}

export default LoginPage;