import axios from 'axios';
import AppConsts from './../lib/appconst';
import { Modal } from 'antd';
import { L } from 'src/lib/abpUtility';
const qs = require('qs');
import $ from 'jquery';

const http = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  timeout: 30000,
  paramsSerializer: function(params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use( 
  function(config) {
    if (!!abp.auth.getToken()) {
      config.headers.common['Authorization'] = 'Bearer ' + abp.auth.getToken();
    }
    debugger;
    $("#loading").show();
    config.headers.common['.AspNetCore.Culture'] = abp.utils.getCookieValue('Abp.Localization.CultureName');
    config.headers.common['Abp.TenantId'] = abp.multiTenancy.getTenantIdCookie();
   
    return config;
  },
  function(error) {    
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    $("#loading").hide();
    return response;
  },
  error => {
    if (!!error.response && !!error.response.data.error && !!error.response.data.error.message && error.response.data.error.details) {     
      // Modal.error({
      //   title: error.response.data.error.message,
      //   content: error.response.data.error.details,
      // });      
      //alert(JSON.stringify(error));
      console.log(error);
      $("#loading").hide();
      return Promise.resolve(error);

    } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
      Modal.error({
        title: L('LoginFailed'),
        content: error.response.data.error.message,
      });
      $("#loading").hide();
      console.log(error);

     // alert(JSON.stringify(error));
    } else if (!error.response) {
     // Modal.error({ content: L('UnknownError') });
     $("#loading").hide();
      Modal.error({ content:  JSON.stringify(error.response)});
     // alert(JSON.stringify(error));
      console.log(error);

    }
    
    setTimeout(() => {}, 1000);

    return Promise.reject(error);
  }
);

export default http;
