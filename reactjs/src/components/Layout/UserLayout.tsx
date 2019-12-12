import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { Switch, Route, Redirect } from 'react-router-dom';
import utils from 'src/utils/utils';
import { userRouter } from '../Router/router.config';
//import { Col } from 'antd';
//import './UserLayout.less';
//import Footer from '../Footer';
//import LanguageSelect from '../LanguageSelect';

import logo from "src/Content/images/logo.png";
import mobile_logo from "src/Content/images/mobile_logo.png";
import DefaultLoggedIn_Profile from "src/Content/images/LoggedIn_Profile.svg";
import Find from "src/Content/images/Find.png";
import Feed from "src/Content/images/Feed.png";
import * as $ from "jquery"
import rules from 'src/scenes/Login/index.validation';
import AuthenticationStore from 'src/stores/authenticationStore';
import { FormComponentProps } from 'antd/lib/form';
import Stores from 'src/stores/storeIdentifier';
import { inject, observer } from 'mobx-react';
import { Form } from 'antd';
import { CreateOrUpdateUserInput } from 'src/services/user/dto/createOrUpdateUserInput';

import UserStore from 'src/stores/userStore';
import { EntityDto } from 'src/services/dto/entityDto';
import AppConsts from 'src/lib/appconst';

import AppComponentBase from 'src/components/AppComponentBase';
// import { GetUserRelationshipInput } from 'src/services/user/dto/GetUserRelationshipInput';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';



export interface IUserLayoutProps extends FormComponentProps {
  authenticationStore?: AuthenticationStore;
  // sessionStore?: SessionStore;
  // accountStore?: AccountStore;
  history: any;
  location: any;
  userStore: UserStore;
}

export interface IUserLayoutState {
  userId: number;
  maxResultCount: number;
  skipCount: number;
  filter: string;

}

@inject(Stores.AuthenticationStore, Stores.SessionStore, Stores.AccountStore, Stores.UserStore)
@observer
class UserLayout extends AppComponentBase<IUserLayoutProps, IUserLayoutState> {
  SingleUser?: CreateOrUpdateUserInput;
  EntityDto?: number;

  ListUserWithoutMe: PagedResultDto<CreateOrUpdateUserInput>;
  MyFriendsUser: PagedResultDto<CreateOrUpdateUserInput>;




  Initialstate = {
    userId: 0,
    maxResultCount: 10,
    skipCount: 0,
    filter: '',


  };

  state = this.Initialstate;

  showLogin() {

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

  async componentWillMount() {
    if (abp.utils.getCookieValue(AppConsts.User.UserId) != null) {
      await this.LoadUser({ id: Number(abp.utils.getCookieValue(AppConsts.User.UserId)) });



      this.forceUpdate();
    }
  }

  public async LoadUser(entityDto: EntityDto) {
    this.SingleUser = await this.props.userStore.get(entityDto);
    return this.SingleUser;
  }

  render() {
    const {
      location: { pathname },
    } = this.props;

    // let { from } = this.props.location.state || { from: { pathname: '/' } };
    // if (this.props.authenticationStore!.isAuthenticated) return <Redirect to={from} />;

    const { loginModel } = this.props.authenticationStore!;
    const { getFieldDecorator } = this.props.form;



    if (this.SingleUser != undefined) {
      return (

        <div>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title> Login</title>
          <DocumentTitle title={utils.getPageTitle(pathname)}></DocumentTitle>
          {/* <link media="all" rel="stylesheet" type="text/css" href="css/main.css" /> */}

          {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwjbZH91bjIqgbDFvsYHZ1vpKJME89kZQ&libraries=places&callback=initMap" async defer></script> */}

          <div id="wrapper" className="desktop_login" ref="mainPanel">



            <header id="header">
              <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                  <a className="navbar-brand for_desktop" href="#" onClick={() => this.props.history.push("/Desktop_Login")}>
                    <img src={logo} alt="image" />
                    <span>CafeTracker</span>
                  </a>
                  <a className="navbar-brand for_mobile" href="#" onClick={() => this.props.history.push("/Desktop_Login")}>
                    <img src={mobile_logo} alt="image" />
                  </a>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item"><a onClick={() => this.props.history.push("/Desktop_Login")} className="nav-link" href="#">Find</a></li>
                      <li className="nav-item"><a className="nav-link" onClick={() => this.props.history.push("/viewprofile")}>Profile</a></li>
                      {/* <li className="nav-item"><a className="nav-link" href="/#/viewprofile">Profile</a></li>                */}

                      <li className="nav-item profile_img"><a className="nav-link" href="#"><img src={DefaultLoggedIn_Profile} alt="image" /></a></li>
                    </ul>
                  </div>
                </div>
              </nav>
            </header>
            <Switch>
              {userRouter
                .filter((item: any) => !item.isLayout)
                .map((item: any, index: number) => (
                  <Route key={index} path={item.path} component={item.component} exact={item.exact} />
                ))}
              <Redirect from="/" to="/Desktop_Login" />
            </Switch>


            <footer id="footer">
              <ul className="footer_nav">

                {/* <li><a href="#"><span><img src={Feed} alt="image" /> </span>Feed</a></li>
            <li><a href="#"><span><img src={Find} alt="image" /> </span>Find</a></li>
            <li><a href="#"><span><img src={LoggedIn_Profile} alt="image" /> </span>Profile</a></li> */}

                <li><a onClick={() => this.props.history.push("/register")}><span><img src={Feed} alt="image" /> </span>Register</a></li>
                <li><a onClick={() => this.props.history.push("/login")}><span><img src={Find} alt="image" /> </span>Log In</a></li>
                {/* <li><a href="#"><span><img src={LoggedIn_Profile} alt="image" /> </span>Profile</a></li> */}

              </ul>
            </footer>
          </div>
        </div>

      )
    }
    else
      return (


        <div>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>without login</title>
          <DocumentTitle title={utils.getPageTitle(pathname)}></DocumentTitle>
          {/* <link media="all" rel="stylesheet" type="text/css" href="css/main.css" /> */}

          {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwjbZH91bjIqgbDFvsYHZ1vpKJME89kZQ&libraries=places&callback=initMap" async defer></script> */}

          <div id="wrapper" className="desktop_login" ref="mainPanel">

            <header id="header">
              <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                  <a className="navbar-brand for_desktop" href="#" onClick={() => this.props.history.push("/Desktop_Login")}>
                    <img src={logo} alt="image" />
                    <span>CafeTracker</span>
                  </a>
                  <a className="navbar-brand for_mobile" href="#" onClick={() => this.props.history.push("/Desktop_Login")}>
                    <img src={mobile_logo} alt="image" />
                  </a>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item"><a className="nav-link" onClick={() => this.props.history.push("/register")}>Register</a></li>
                      <li className="nav-item">
                        <a className="nav-link show_login" onClick={this.showLogin} href="#">Log In</a>
                        <div className="clearfix show_body">
                          <div className="card card-body">
                            <form className="web-form" onSubmit={this.handleSubmit}>
                              <div className="row">
                                <div className="col-sm-12">
                                  <div className="input-group">
                                    {/* <input type="text" placeholder="Username" className="form-control" /> */}
                                    {getFieldDecorator('userNameOrEmailAddress', { rules: rules.userNameOrEmailAddress })(
                                      <input type="text" placeholder="" className="form-control" />
                                    )}
                                  </div>
                                  <div className="input-group">
                                    {/* <input type="password" placeholder="Password" className="form-control" /> */}
                                    {getFieldDecorator('password', { rules: rules.password })(
                                      <input type="Password" placeholder="" className="form-control" />
                                    )}
                                  </div>
                                  <div className="form-group check_box">
                                    {/* <input type="checkbox" id="html" /> */}
                                    <input type="checkbox" checked={loginModel.rememberMe} onChange={loginModel.toggleRememberMe} id="html" />
                                    <label htmlFor="html">Remember me</label>
                                  </div>


                                  <input type="Submit" className="btn-web m-t30 m-b30" value="Submit"/>

                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </header>

            <Switch>
              {userRouter
                .filter((item: any) => !item.isLayout)
                .map((item: any, index: number) => (
                  <Route key={index} path={item.path} component={item.component} exact={item.exact} />
                ))}
              <Redirect from="/" to="/Desktop_Login" />
            </Switch>


            <footer id="footer">
              <ul className="footer_nav">

                {/* <li><a href="#"><span><img src={Feed} alt="image" /> </span>Feed</a></li>
            <li><a href="#"><span><img src={Find} alt="image" /> </span>Find</a></li>
            <li><a href="#"><span><img src={LoggedIn_Profile} alt="image" /> </span>Profile</a></li> */}

                <li><a href="#" onClick={() => this.props.history.push("/register")}><span><img src={Feed} alt="image" /> </span>Register</a></li>
                <li><a href="#" onClick={() => this.props.history.push("/login")}><span><img src={Find} alt="image" /> </span>Log In</a></li>
                {/* <li><a href="#"><span><img src={LoggedIn_Profile} alt="image" /> </span>Profile</a></li> */}

              </ul>
            </footer>
          </div>
        </div>
      );

  }
}

// export default UserLayout;

export default Form.create()(UserLayout);