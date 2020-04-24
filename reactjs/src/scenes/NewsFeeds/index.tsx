/// <reference types="@types/googlemaps" />
///// <reference types="@types/google-distance" />


import * as React from 'react';
//import { Form, Input, Checkbox, Modal, Tabs } from 'antd';
import { Form } from 'antd';

import AppComponentBase from 'src/components/AppComponentBase';
import Stores from 'src/stores/storeIdentifier';
import UserStore from 'src/stores/userStore';
import { observer, inject } from 'mobx-react';
import { FormComponentProps } from 'antd/lib/form';
//import { GetSearchOutputResults } from 'src/services/user/dto/SearchOutputResult';
import { searchUserInput } from 'src/services/user/dto/searchUserInput';
import { RouteComponentProps } from 'react-router-dom';

import NewsFeedsComponent from 'src/components/NewsFeeds';
import NewsFeedsWithOutLogin from 'src/components/NewsFeedsWithOutLogin';
import AppConsts from 'src/lib/appconst';

//import { usePosition } from 'use-position';

//import {distance} from 'google-distance';

//declare let google: any;
//import {google} from '@types/googlemaps';
/// <reference types=”@types/googlemaps” />

//var google: any;
// import { Hello } from "google.maps";

//import './local';

//import {SearchResult} from './local';



export interface INewsFeedsProps extends FormComponentProps, searchUserInput, RouteComponentProps {
  userStore: UserStore;
}

export interface INewsFeedsState {
  userId: number;
}

//  const confirm = Modal.confirm;
//  const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class NewsFeeds extends AppComponentBase<INewsFeedsProps, INewsFeedsState> {
  formRef: any;
  
  searchkey: string | null;


  Initialstate = {
    userId: 0,
   
  };


  async componentDidMount() {
    this.props.userStore.ChangeLoader(true);
    

  }

  render() {
    this.props.userStore.ChangeLoader(false);
    
    return (
      
      <div>

<main id="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12 col-xs-12">
              
            {(abp.utils.getCookieValue(AppConsts.User.UserId) != null) ? <NewsFeedsComponent {...this.props} /> : <NewsFeedsWithOutLogin {...this.props} />}


            </div>
          </div>
        </div>
      </main>

      </div>




    );


  }
}

//export default Register;

export default Form.create()(NewsFeeds);