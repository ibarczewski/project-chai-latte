const AppConsts = {
  userManagement: {
    defaultAdminUserName: 'admin',
  },
  localization: {
    defaultLocalizationSourceName: 'ReactCafeTracker',
  },
  authorization: {
    encrptedAuthTokenName: 'enc_auth_token',
  },
  User: {
    UserId: 'UserId',
  },
  appBaseUrl: process.env.REACT_APP_APP_BASE_URL,
  remoteServiceBaseUrl: process.env.REACT_APP_REMOTE_SERVICE_BASE_URL,
};
export default AppConsts;
