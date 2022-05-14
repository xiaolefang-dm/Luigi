import React from 'react';
import { LoginPanel } from '../../../../common/login-panel/login-panel.js'
import { ReactSVG } from 'react-svg'

const LoginPage = ({ loginProcessing }) => {
  return <div className="login">
    <LoginPanel
      loginProcessing={loginProcessing}
      requireName={true}
      requirePasswd={true}
      requireRole={false}
      Title={"小虎岛会议配置系统"}
      roleOptions={[]}
      logo={<ReactSVG src='../assets/icons/tiger.svg' />}
    />
  </div>
}

export default LoginPage;