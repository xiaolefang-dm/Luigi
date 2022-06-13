const APP_ID = '268d1a3bdfb941c18df06bd7d1d6ccc3';
const API_SERVER = 'https://xhd.deepmirror.com.cn:50801';
const agoraTokenServiceRTC = API_SERVER + '/api/rtc-token';
const agoraTokenServiceRTM = API_SERVER + '/api/rtm-token?account=';
const loginService = API_SERVER + '/api/login';
const logoutService = API_SERVER + '/api/logout';
const logNewService = API_SERVER + '/api/log/new';
const logListService = API_SERVER + '/api/log/list';
const cameraAddService = API_SERVER + '/api/camera/add';
const cameraRemoveService = API_SERVER + '/api/camera/remove';
const cameraListService = API_SERVER + '/api/camera/list';
const getPasswdUrl = API_SERVER + '/api/passwd';
const getAdminPasswdUrl = API_SERVER + '/api/adminpasswd';
const changeAdminPasswdUrl = API_SERVER + '/api/setadminpasswd';
const changePasswdUrl = API_SERVER + '/api/setpasswd';

const jsonHeader = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};
const KDXFConfig = {
  hostUrl: 'wss://iat-api.xfyun.cn/v2/iat',
  host: 'iat-api.xfyun.cn',
  appid: '62d97d1e',

  //在控制台-我的应用-语音听写（流式版）获取
  apiSecret: 'YWYzZTU2MThiN2RkZjgzNmExY2MyN2I4',

  //在控制台-我的应用-语音听写（流式版）获取
  apiKey: 'f9a7e7ef97d519c578c332492e52b778',
  uri: '/v2/iat',
  highWaterMark: 1280
};

const postPackage = {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, 
  headers: jsonHeader,
  body: '',
}

export {
  APP_ID, agoraTokenServiceRTM, agoraTokenServiceRTC, loginService,
  logoutService, logNewService, logListService, cameraAddService, cameraRemoveService, cameraListService,
  jsonHeader, KDXFConfig, getPasswdUrl, getAdminPasswdUrl, changeAdminPasswdUrl, postPackage, changePasswdUrl
};
