// import { Form, Col, Input, Icon, Row, Checkbox, Button, Card, Modal } from 'antd';
import { Form } from 'antd';
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Stores from 'src/stores/storeIdentifier';
import AuthenticationStore from 'src/stores/authenticationStore';
import { FormComponentProps } from 'antd/lib/form';
import { Redirect } from 'react-router-dom';
import { L } from 'src/lib/abpUtility';
import SessionStore from 'src/stores/sessionStore';
import AccountStore from 'src/stores/accountStore';


//import TenantAvailabilityState from 'src/services/account/dto/tenantAvailabilityState';
//import './index.less';
import rules from './index.validation';
import UserStore from 'src/stores/userStore';

//const FormItem = Form.Item;

export interface ILoginState {
  userId: number;
  spanuserNameOrEmailAddress: string;
  spanpassword: string;

  inValidUserNameOrEmailAddress: string;


}

export interface ILoginProps extends FormComponentProps {
  authenticationStore?: AuthenticationStore;
  sessionStore?: SessionStore;
  accountStore?: AccountStore;
  userStore: UserStore;

  history: any;
  location: any;
}

@inject(Stores.AuthenticationStore, Stores.SessionStore, Stores.AccountStore, Stores.UserStore)
@observer
class Login extends React.Component<ILoginProps> {



  Initialstate = {
    userId: 0,
    spanuserNameOrEmailAddress: '',
    spanpassword: '',
    inValidUserNameOrEmailAddress: ''

  };

  state = this.Initialstate;
  // changeTenant = async () => {
  //   let tenancyName = this.props.form.getFieldValue('tenancyName');
  //   const { loginModel } = this.props.authenticationStore!;

  //   if (!tenancyName) {
  //     abp.multiTenancy.setTenantIdCookie(undefined);
  //     window.location.href = '/';
  //     return;
  //   } else {
  //     await this.props.accountStore!.isTenantAvailable(tenancyName);
  //     const { tenant } = this.props.accountStore!;
  //     switch (tenant.state) {
  //       case TenantAvailabilityState.Available:
  //         abp.multiTenancy.setTenantIdCookie(tenant.tenantId);
  //         loginModel.tenancyName = tenancyName;
  //         loginModel.toggleShowModal();
  //         window.location.href = '/';
  //         return;
  //       case TenantAvailabilityState.InActive:
  //         Modal.error({ title: L('Error'), content: L('TenantIsNotActive') });
  //         break;
  //       case TenantAvailabilityState.NotFound:
  //         Modal.error({ title: L('Error'), content: L('ThereIsNoTenantDefinedWithName{0}', tenancyName) });
  //         break;
  //     }
  //   }
  // };

  handleSubmit = async (e: any) => {
    e.preventDefault();
    // debugger;
    
    const { loginModel } = this.props.authenticationStore!;

    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {


        var result = await this.props.authenticationStore!.login(values);
        if (result.ErrorMessage != 'Invalid username or password!') {
          // debugger;
          sessionStorage.setItem('rememberMe', loginModel.rememberMe ? '1' : '0');
          const { state } = this.props.location;
          window.location = state ? state.from.pathname : '/';
          this.setState({ inValidUserNameOrEmailAddress: '' })
        }  else {
          this.setState({ inValidUserNameOrEmailAddress: result.ErrorMessage })
        }

      } else {
      
        if (err.userNameOrEmailAddress != undefined) {
          //this.setState({ spanuserNameOrEmailAddress: err.userNameOrEmailAddress.errors[0].message })
          this.setState({ spanuserNameOrEmailAddress: 'Email is required' })
        } else {
          this.setState({ spanuserNameOrEmailAddress: '' })
        }
        if (err.password != undefined) {
          this.setState({ spanpassword: err.password.errors[0].message })
        } else {
          this.setState({ spanpassword: '' })
        }
      }
    });
  };

 

  public render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.props.authenticationStore!.isAuthenticated) return <Redirect to={from} />;

    //const { loginModel } = this.props.authenticationStore!;
    const { getFieldDecorator } = this.props.form;
    //this.props.userStore.ChangeLoader(false);
    
    return (     
      <div>

        <main id="main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-md-12 ">
                <form className="web-form m-t60" onSubmit={this.handleSubmit}>
                  <div className="row">

                    <div className="col-md-12 text-center">

                      <div style={{ textAlign: 'initial', color: "#ff0000" }}>
                        <span id="password" style={{ color: "#ff0000" }}>{this.state.inValidUserNameOrEmailAddress} </span>
                      </div>
                      <br></br>

                      <div className="input-group form_lablel">
                        <label>Email</label>
                        {getFieldDecorator('userNameOrEmailAddress', { rules: rules.userNameOrEmailAddress })(
                          <input type="text" placeholder="" className="form-control" />
                        )}
                        <span id="userNameOrEmailAddress" style={{ color: "#ff0000" }}>{this.state.spanuserNameOrEmailAddress} </span>
                      </div>
                      <div className="input-group form_lablel">
                        <label>Password</label>
                        {getFieldDecorator('password', { rules: rules.password })(
                          <input type="password" placeholder="" className="form-control" />
                        )}
                        <span id="password" style={{ color: "#ff0000" }}>{this.state.spanpassword} </span>
                      </div>
                      {/* <div className="form-group text-right form_lablel">
                      <p> <a href="javascript:void(0)">Forgot password</a></p>
                    </div> */}
                      {/* <div className="form-group check_box">
                      <input type="checkbox" checked={loginModel.rememberMe} onChange={loginModel.toggleRememberMe} id="html" />
                      <label htmlFor="html">Remember me</label>
                    </div> */}
                      <button type="submit" className="btn-web m-t10 m-b70">{L('Log in')}</button>

                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>

      </div>

    );
  }
}

export default Form.create()(Login);




// <Col className="name">
      //   <Form className="" onSubmit={this.handleSubmit}>
      //     <Row>
      //       <Row style={{ marginTop: 100 }}>
      //         <Col span={8} offset={8}>
      //           <Card>
      //             <Row>
      //               {!!this.props.sessionStore!.currentLogin.tenant ? (
      //                 <Col span={24} offset={0} style={{ textAlign: 'center' }}>
      //                   <a onClick={loginModel.toggleShowModal}>
      //                     {L('CurrentTenant')} : {this.props.sessionStore!.currentLogin.tenant.tenancyName}
      //                   </a>
      //                 </Col>
      //               ) : (
      //                 <Col span={24} offset={0} style={{ textAlign: 'center' }}>
      //                   <a onClick={loginModel.toggleShowModal}> {L('NotSelected')}</a>
      //                 </Col>
      //               )}
      //             </Row>
      //           </Card>
      //         </Col>
      //       </Row>

      //       <Row>
      //         <Modal
      //           visible={loginModel.showModal}
      //           onCancel={loginModel.toggleShowModal}
      //           onOk={this.changeTenant}
      //           title={L('ChangeTenant')}
      //           okText={L('OK')}
      //           cancelText={L('Cancel')}
      //         >
      //           <Row>
      //             <Col span={8} offset={8}>
      //               <h3>{L('TenancyName')}</h3>
      //             </Col>
      //             <Col>
      //               <FormItem>
      //                 {getFieldDecorator('tenancyName', {})(
      //                   <Input placeholder={L('TenancyName')} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
      //                 )}
      //               </FormItem>
      //               {!getFieldValue('tenancyName') ? <div>{L('LeaveEmptyToSwitchToHost')}</div> : ''}
      //             </Col>
      //           </Row>
      //         </Modal>
      //       </Row>
      //       <Row style={{ marginTop: 10 }}>
      //         <Col span={8} offset={8}>
      //           <Card>
      //             <div style={{ textAlign: 'center' }}>
      //               <h3>{L('WellcomeMessage')}</h3>
      //             </div>
      //             <FormItem>
      //               {getFieldDecorator('userNameOrEmailAddress', { rules: rules.userNameOrEmailAddress })(
      //                 <Input placeholder={L('UserNameOrEmail')} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
      //               )}
      //             </FormItem>

      //             <FormItem>
      //               {getFieldDecorator('password', { rules: rules.password })(
      //                 <Input
      //                   placeholder={L('Password')}
      //                   prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
      //                   type="password"
      //                   size="large"
      //                 />
      //               )}
      //             </FormItem>
      //             <Row style={{ margin: '0px 0px 10px 15px ' }}>
      //               <Col span={12} offset={0}>
      //                 <Checkbox checked={loginModel.rememberMe} onChange={loginModel.toggleRememberMe} />
      //                 {L('RememberMe')}
      //                 <br />
      //                 <a>{L('ForgotPassword')}</a>
      //               </Col>

      //               <Col span={8} offset={4}>
      //                 <Button style={{ backgroundColor: '#f5222d', color: 'white' }} htmlType={'submit'} type="danger">
      //                   {L('LogIn')}
      //                 </Button>
      //               </Col>
      //             </Row>
      //           </Card>
      //         </Col>
      //       </Row>
      //     </Row>
      //   </Form>
      // </Col>