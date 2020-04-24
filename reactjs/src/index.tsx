import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { Provider } from 'mobx-react';
//import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';


import initializeStores from './stores/storeInitializer';
//import * as moment from 'moment';
//import abpUserConfigurationService from 'src/services/abpUserConfigurationService';
//import Utils from 'src/utils/utils';


import "src/Content/css/main.css";
import "src/Content/js/main.js";


// import "src/Content/js/jquery.js";
// import "src/Content/js/bootstrap.js";


//  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwjbZH91bjIqgbDFvsYHZ1vpKJME89kZQ&libraries=places" async defer>
//  </script>



//import $ from 'jquery';



//Utils.setLocalization();

// abpUserConfigurationService.getAll().then(data => {
  // Utils.extend(true, abp, data.data.result);
  // abp.clock.provider = Utils.getCurrentClockProvider(data.data.result.clock.provider);

  // moment.locale(abp.localization.currentLanguage.name);

  // if (abp.clock.provider.supportsMultipleTimezone) {
  //   moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
  // }

  const stores = initializeStores();

  ReactDOM.render(
    <Provider {...stores}>
      {/* <BrowserRouter>
        <App />
      </BrowserRouter> */}
      <HashRouter>
        <App />
      </HashRouter>


      
    </Provider>,
    document.getElementById('root') as HTMLElement
  );

  registerServiceWorker();
// });
