/// <reference types="@types/googlemaps" />
import * as React from 'react';
//import { Form, Input, Checkbox, Modal, Tabs } from 'antd';
import { Form } from 'antd';

import rules from './index.validation';

import AppComponentBase from 'src/components/AppComponentBase';
import Stores from 'src/stores/storeIdentifier';
import UserStore from 'src/stores/userStore';
import { observer, inject } from 'mobx-react';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';
import NewsFeeds from 'src/components/NewsFeeds';
import NewsFeedsWithOutLogin from 'src/components/NewsFeedsWithOutLogin';
import AppConsts from 'src/lib/appconst';
import { searchUserInput } from 'src/services/user/dto/searchUserInput';

//declare let google: any;
//import {google} from '@types/googlemaps';
/// <reference types=”@types/googlemaps” />

//var google: any;
// import { Hello } from "google.maps";

//import './local';

//import {SearchResult} from './local';



export interface IDesktop_LoginProps extends FormComponentProps,RouteComponentProps {
    userStore: UserStore;
}

export interface IDesktop_LoginState {
    userId: number;
}

//  const confirm = Modal.confirm;
//  const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class Desktop_Login extends AppComponentBase<IDesktop_LoginProps, IDesktop_LoginState> {
    formRef: any;

    state = {
        userId: 0,
    };

    handleSearch = async (e: any) => {
        e.preventDefault();
        await this.props.form.validateFields(async (err: any, values: searchUserInput) => {
            if (err) {
                alert('validation failed')

            } else {
               
                if (this.state.userId == 0) {
                    
                    await this.props.userStore.search(values);
                   // this.props.history.push("/user/searchresult");
                   
                     this.props.history.push("/searchresult?searchkey="+values.searchText);
                }
            }
        });

        
    };

    render() {
        const { getFieldDecorator } = this.props.form;
         //alert('Final' + this.props.userStore.SearchResult);
        return (

            <div>
                {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwjbZH91bjIqgbDFvsYHZ1vpKJME89kZQ&libraries=places&callback=initMap" async defer>

                </script> */}
                <main id="main">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6 hidden-md">
                                <div className="cafe_detail m-b60">
                                    <p>Kogi Cosby sweater ethical squid irony disrupt, organic tote bag gluten-free XOXO wolf typewriter mixtape small batch. DIY pickled four loko McSweeney's, Odd Future dreamcatcher plaid.</p>
                                    <p> PBR&amp;B single-origin coffee gluten-free McSweeney's banjo, bicycle rights food truck gastropub vinyl four loko umami +1.</p>
                                </div>

                                {(abp.utils.getCookieValue(AppConsts.User.UserId) != null) ? <NewsFeeds {...this.props} /> : <NewsFeedsWithOutLogin {...this.props} /> }


                                {/* <div className="sidebar-tabs">
                                    <div className="sidebar_heading"><h3>Feed</h3></div>
                                    <div className="tab_contentarea">
                                        <div className="d-table">
                                            <div className="d-table-cell content-cell">
                                                <img alt="" src="images/LoggedOut_Profile.png" />
                                                <p className="font-weight-bold">Andy S.</p>
                                                <p>Feb 2, 2018</p>
                                            </div>
                                            <div className="d-table-cell desc-cell">
                                                <ul className="tab-tag">
                                                    <li>Foxtail Farmhouse - Winterpark</li>
                                                    <li>Doppio</li>
                                                    <li>Chiapas</li>
                                                </ul>
                                                <p>Tasting Notes: Ut enim ad minim veniam, quis nostrud exlorem ipsum dolor
                                                  s lorem ipsum dolor s lorem ipsum dolor s lorem ipsum dolor s lorem
                        ipsum do<a href="#" className="readmore">…read more</a></p>
                                            </div>
                                        </div>
                                        <div className="d-table">
                                            <div className="d-table-cell content-cell">
                                                <img alt="" src="images/LoggedOut_Profile.png" />
                                                <p className="font-weight-bold">Coma</p>
                                                <p>Nov 15, 2018</p>
                                            </div>
                                            <div className="d-table-cell desc-cell">
                                                <ul className="tab-tag">
                                                    <li>Coma Coffee</li>
                                                </ul>
                                                <p>Special!! Come try our Minca, Single Origin from Peru at our midtown
                        location today!</p>
                                            </div>
                                        </div>
                                        <div className="d-table">
                                            <div className="d-table-cell content-cell">
                                                <img alt="" src="images/LoggedOut_Profile.png" />
                                                <p className="font-weight-bold">deltago</p>
                                                <p>Sep 9, 2018</p>
                                            </div>
                                            <div className="d-table-cell desc-cell">
                                                <ul className="tab-tag">
                                                    <li>Hopper &amp; Burr</li>
                                                    <li>Doppio</li>
                                                    <li>Reko</li>
                                                </ul>
                                                <p>Tasting Notes: Light, clean balanced bergamot/tea lorem ipsum dolor
                                                  silorem ipsum dolor s lorem ipsum dolor slorem ipsum dolor slorem ipsum
                                                  dolor s…
                        <a href="#" className="readmore">read more</a></p>
                                            </div>
                                        </div>
                                        <div className="d-table">
                                            <div className="d-table-cell content-cell">
                                                <img alt="" src="images/LoggedOut_Profile.png" />
                                                <p className="font-weight-bold">JohnB</p>
                                                <p>Sep 9, 2018</p>
                                            </div>
                                            <div className="d-table-cell desc-cell">
                                                <ul className="tab-tag">
                                                    <li>In-sīt Coffee</li>
                                                    <li>Macchiato</li>
                                                    <li>Supernova Blend</li>
                                                </ul>
                                                <p>Tasting Notes: Aroma of blueberries and citrus. Flavor heavy on the
                                                  Ethiopian with blueberry and lemon notes balanced by Colombian dark
                                                  chocolate. …read less…
                        <a href="#" className="readmore">read more</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}


                            </div>
                            <div className="col-lg-1" />
                            <div className="col-lg-5 col-md-12 text-center">
                                <form className="web-form m-t60" onSubmit={this.handleSearch}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="input-group desktop_login form_lablel">
                                                <label htmlFor="html">Search by bean, cafe name, or zipcode</label>
                                                {/* <input type="search" placeholder="" className="form-control text-center" /> */}
                                                {getFieldDecorator('searchText', { rules: rules.searchText })(
                                                    <input type="search" placeholder="" className="form-control text-center" />
                                                )}
                                            </div>
                                            <button className="btn-web m-t60">Search</button>
                                        </div>
                                    </div>
                                </form>
                                <div className="nearby">
                                    <h3 className="m-t50 m-b50">or</h3>
                                    <h3 className="m-b50"><i className="fas fa-map-marker-alt" /> View nearby cafes</h3>
                                    <h3><a onClick={() => this.props.history.push("/register")}>Register</a> or <a onClick={() => this.props.history.push("/login")}>Log in</a> to track your favorite coffees</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>




        );
    }
}

//export default Register;

export default Form.create()(Desktop_Login);