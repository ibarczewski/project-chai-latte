import * as React from 'react';
//import { Form, Input, Checkbox, Modal, Tabs } from 'antd';
import { Form } from 'antd';

//import FormItem from 'antd/lib/form/FormItem';
//import CheckboxGroup from 'antd/lib/checkbox/Group';
//import { GetRoles } from 'src/services/user/dto/getRolesOuput';
//import { L } from 'src/lib/abpUtility';
//import { FormComponentProps } from 'antd/lib/form';
import rules from './index.validation';
//const TabPane = Tabs.TabPane;
import AppComponentBase from 'src/components/AppComponentBase';
import Stores from 'src/stores/storeIdentifier';
import UserStore from 'src/stores/userStore';
import { observer, inject } from 'mobx-react';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';
//import { any } from 'prop-types';

export interface IUserProps  extends FormComponentProps,RouteComponentProps {
  userStore: UserStore;
}

export interface IUserState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  userId: number;
  filter: string;
  affirm : boolean;
  userName: string;
  emailAddress:string;
  password:string;
  affirmHTML :string;
}

//  const confirm = Modal.confirm;
//  const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class Register extends AppComponentBase<IUserProps, IUserState> {
  formRef: any;

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    userId: 0,
    filter: '',
    affirm : false,
    userName:'',
    emailAddress:'',
    password:'',
    affirmHTML:''

  };

  // handleCreate = () => {
    handleCreate = async (e: any) => {
      e.preventDefault();    
    //form.validateFields(async (err: any, values: any) => {
      await this.props.form.validateFields(async (err: any, values: any) => {

        if (err) {                  
          if(err.userName != undefined){            
            this.setState({ userName: err.userName.errors[0].message })        
          }else{
            this.setState({ userName: '' })
          }

          if(err.emailAddress != undefined){
            this.setState({ emailAddress: err.emailAddress.errors[0].message })            
          }else{
            this.setState({ emailAddress: '' })
          }
          if(err.password != undefined){
            this.setState({ password: err.password.errors[0].message })            
          }else{
            this.setState({ password: '' })
          }

          if(!this.state.affirm){
            this.setState({ affirmHTML: 'Please check: I affirm that I am at least 18 years old' })            
          }else{
            this.setState({ affirmHTML: '' })
          }

        } else {
          if (this.state.userId == 0) {
           
          await this.props.userStore.create(values);
          this.props.history.push("/login");

          }
          //  else {
          //   await this.props.userStore.update({ id: this.state.userId, ...values });
          // }
        }
        //alert('userStore' + this.props.userStore);
      //await this.getAll();      
      //form.resetFields();
     
    });
  };
  

  async componentDidMount() {
    //document.title = "Amazing Page";
  }

  Temporary = async (e: any) => {
    this.setState({
      affirm: !this.state.affirm // flip boolean value
    })
  }
  async getAll() {
    await this.props.userStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
  }


  render() {

    const { getFieldDecorator } = this.props.form;
    this.props.userStore.ChangeLoader(false);
    return (

        <main id="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3" />
            <div className="col-lg-6 col-md-12">
              <form className="web-form m-t60" onSubmit={this.handleCreate}>
                <div className="row">
                  <div className="col-md-12 col-12 text-center">
                    <div className="input-group form_lablel">
                      <label>Username</label>                      
                      {getFieldDecorator('userName', { rules: rules.userName })(
                      <input type="text" placeholder="" className="form-control" />
                      )}
                       <span id="userName" style={{ color: "#ff0000" }}>{this.state.userName} </span>
                    </div>
                    <div className="input-group form_lablel">
                      <label>Email</label>
                      {/* <input type="email" placeholder="" className="form-control" /> */}
                      {getFieldDecorator('emailAddress', { rules: rules.emailAddress })(
                      <input type="text" placeholder="" className="form-control" />
                      )}
                       <span id="emailAddress" style={{ color: "#ff0000" }}>{this.state.emailAddress} </span>
                    </div>
                    <div className="input-group form_lablel">
                      <label>Password</label>
                      {/* <input type="password" placeholder="" className="form-control" /> */}
                      {getFieldDecorator('password', { rules: rules.password })(
                      <input type="password" placeholder="" className="form-control" />
                      )}
                       <span id="password" style={{ color: "#ff0000" }}>{this.state.password} </span>
                    </div>

                    <div className="form-group check_box" style={{ textAlign: 'initial' }}>
                      <input type="checkbox" id="affirm" checked={this.state.affirm} onChange= {this.Temporary} />                                            
                      <label htmlFor="affirm">I am at least 18 years old.</label>
                      <br>
                    </br>
                    <span id="password" style={{ color: "#ff0000" }}>{this.state.affirmHTML} </span>
                    </div>
                    
                    
                    <input type="Submit" className="btn-web m-t10 m-b70" value="Submit" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

    //   <Modal visible={visible} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'User'}>
    //     <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
    //       <TabPane tab={'User'} key={'user'}>
    //         <FormItem label={L('Name')} {...formItemLayout}>
    //           {getFieldDecorator('name', { rules: rules.name })(<Input />)}
    //         </FormItem>
    //         <FormItem label={L('Surname')} {...formItemLayout}>
    //           {getFieldDecorator('surname', { rules: rules.surname })(<Input />)}
    //         </FormItem>
    //         <FormItem label={L('UserName')} {...formItemLayout}>
    //           {getFieldDecorator('userName', { rules: rules.userName })(<Input />)}
    //         </FormItem>
    //         <FormItem label={L('Email')} {...formItemLayout}>
    //           {getFieldDecorator('emailAddress', { rules: rules.emailAddress })(<Input />)}
    //         </FormItem>
    //         {this.props.modalType == 'edit' ? (
    //           <FormItem label={L('Password')} {...formItemLayout}>
    //             {getFieldDecorator('password', {
    //               rules: [
    //                 {
    //                   required: true,
    //                   message: 'Please input your password!',
    //                 },
    //                 {
    //                   validator: this.validateToNextPassword,
    //                 },
    //               ],
    //             })(<Input type="password" />)}
    //           </FormItem>
    //         ) : null}
    //         {this.props.modalType == 'edit' ? (
    //           <FormItem label={L('ConfirmPassword')} {...formItemLayout}>
    //             {getFieldDecorator('confirm', {
    //               rules: [
    //                 {
    //                   required: true,
    //                   message: L('ConfirmPassword'),
    //                 },
    //                 {
    //                   validator: this.compareToFirstPassword,
    //                 },
    //               ],
    //             })(<Input type="password" />)}
    //           </FormItem>
    //         ) : null}
    //         <FormItem label={L('IsActive')} {...tailFormItemLayout}>
    //           {getFieldDecorator('isActive', { valuePropName: 'checked' })(<Checkbox>Aktif</Checkbox>)}
    //         </FormItem>
    //       </TabPane>
          
    //     </Tabs>
    //   </Modal>


    );
  }
}

//export default Register;

export default Form.create()(Register);