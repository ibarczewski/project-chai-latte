import * as React from 'react';
// import DocumentTitle from 'react-document-title';
// import { Switch, Redirect } from 'react-router-dom';
// import utils from 'src/utils/utils';
//import { appRouters } from '../Router/router.config';
// import logo from "src/Content/images/logo.png";
// import mobile_logo from "src/Content/images/mobile_logo.png";
// import DefaultLoggedIn_Profile from "src/Content/images/LoggedIn_Profile.svg";
// import Find from "src/Content/images/Find.png";
// import Feed from "src/Content/images/Feed.png";
// //import $ from 'jquery';
import * as $ from "jquery"
//import $ = require("jquery");

import AuthenticationStore from 'src/stores/authenticationStore';
import { FormComponentProps } from 'antd/lib/form';
import Stores from 'src/stores/storeIdentifier';
import { inject, observer } from 'mobx-react';
import { Form } from 'antd';
import { CreateOrUpdateUserInput } from 'src/services/user/dto/createOrUpdateUserInput';

import UserStore from 'src/stores/userStore';
import { EntityDto } from 'src/services/dto/entityDto';
import AppConsts from 'src/lib/appconst';
//import ProtectedRoute from 'src/components/Router/ProtectedRoute';
import AppComponentBase from 'src/components/AppComponentBase';



export interface IAppLayoutProps extends FormComponentProps {
  authenticationStore?: AuthenticationStore;
  // sessionStore?: SessionStore;
  // accountStore?: AccountStore;
  history: any;
  location: any;
  userStore : UserStore;
}

@inject(Stores.AuthenticationStore, Stores.SessionStore, Stores.AccountStore,Stores.UserStore)
@observer
class AppLayout extends AppComponentBase<IAppLayoutProps> {
  SingleUser?: CreateOrUpdateUserInput;
  EntityDto? : number;

 
  showLogin(){
    $('.show_body').slideToggle(500);
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
    const { loginModel } = this.props.authenticationStore!;
    await this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        await this.props.authenticationStore!.login(values);
        sessionStorage.setItem('rememberMe', loginModel.rememberMe ? '1' : '0');
        const { state } = this.props.location;
        window.location = state ? state.from.pathname : '/';
      }
    });
  };

  async componentWillMount(){    
    if(abp.utils.getCookieValue(AppConsts.User.UserId) != null){
     
     await this.LoadUser({id: Number(abp.utils.getCookieValue(AppConsts.User.UserId))});
     //this.forceUpdate();
    }      
  }

  public async LoadUser(entityDto : EntityDto) {
         this.SingleUser = await this.props.userStore.get(entityDto);
         return this.SingleUser; 
   }

  render() {
    
    // const {
    //   location: { pathname },
    // } = this.props;


      return (

        <div>

        </div>
        
        
      //   <div>
      // <meta charSet="utf-8" />
      // <meta name="viewport" content="width=device-width, initial-scale=1" />
      // <title> Login</title>
      // <DocumentTitle title={utils.getPageTitle(pathname)}></DocumentTitle>
      // {/* <link media="all" rel="stylesheet" type="text/css" href="css/main.css" /> */}
      
      // {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwjbZH91bjIqgbDFvsYHZ1vpKJME89kZQ&libraries=places&callback=initMap" async defer></script> */}

      // <div id="wrapper" className="desktop_login" ref="mainPanel">


        
      // <header id="header">
      //   <nav className="navbar navbar-expand-lg navbar-light">
      //     <div className="container-fluid">
      //       <a className="navbar-brand for_desktop" href="#" onClick={() =>this.props.history.push("/user/Desktop_Login")}>
      //         <img src={logo} alt="image" />
      //         <span>CafeTracker</span>
      //       </a>
      //       <a className="navbar-brand for_mobile" href="#" onClick={() =>this.props.history.push("/user/Desktop_Login")}>
      //         <img src={mobile_logo} alt="image" />
      //       </a>
      //       <div className="collapse navbar-collapse" id="navbarSupportedContent">
      //         <ul className="navbar-nav ml-auto">
      //           <li className="nav-item"><a onClick={() =>this.props.history.push("/user/Desktop_Login")} className="nav-link" href="#">Find</a></li>
      //           <li className="nav-item"><a className="nav-link" href="#" onClick={() =>this.props.history.push("/#/viewprofile")}>Profile</a></li>
      //           <li className="nav-item"><a className="nav-link" href="#" onClick={() => this.props.history.push("/Rating?placeid=zydcv   ")}>Profile</a></li>
      //           <li className="nav-item profile_img"><a className="nav-link" href="#"><img style={{ height: '60px', width: '60px' }} id="ImageIDToDisplayProfile" src={DefaultLoggedIn_Profile} alt="image" /></a></li>
      //         </ul>
      //       </div>
      //     </div>
      //   </nav>
      // </header> 
      //          {/* <Switch>
      //        {userRouter
      //         .filter((item: any) => !item.isLayout)
      //          .map((item: any, index: number) => (
      //            <Route key={index} path={item.path} component={item.component} exact={item.exact} />
      //          ))}
      //        <Redirect from="/user" to="/user/login" />
      //      </Switch> */}
      //      <Switch>
      //         {appRouters
      //           .filter((item: any) => !item.isLayout)
      //           .map((route: any, index: any) => (
      //             <ProtectedRoute key={index} path={route.path} component={route.component} permission={route.permission} />
      //           ))}
      //         <Redirect from="/" to="/user/Desktop_Login" />
      //       </Switch>
      //   <footer id="footer">
      //     <ul className="footer_nav">
      //       <li><a href="/register"><span><img src={Feed} alt="image" /> </span>Register</a></li>
      //       <li><a href="/user/login"><span><img src={Find} alt="image" /> </span>Log In</a></li>
      //     </ul>
      //   </footer>
      // </div>
      // </div>
            
            )
  }
}

export default Form.create()(AppLayout);