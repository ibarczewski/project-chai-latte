import * as React from 'react';
// import { Col, Icon, Avatar, Dropdown, Badge, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';
import Stores from 'src/stores/storeIdentifier';
import UserStore from 'src/stores/userStore';
import AppComponentBase from 'src/components/AppComponentBase';
import { observer, inject } from 'mobx-react';
// import { CreateOrUpdateUserInput } from 'src/services/user/dto/createOrUpdateUserInput';
// import { PagedResultDto } from 'src/services/dto/pagedResultDto';
// import AppConsts from 'src/lib/appconst';
// import { GetUserRelationshipInput } from 'src/services/user/dto/GetUserRelationshipInput';
// import { CreateRating } from 'src/services/user/dto/CreateRating';
//  import Parser from 'html-react-parser';

export interface IFriendsNewsFeedsProps {

}

export interface IFriendsNewsFeedsProps extends FormComponentProps, RouteComponentProps {
  userStore: UserStore;
}

export interface IFriendsNewsFeedsState {
  userId: number;
  maxResultCount: number;
  skipCount: number;
  filter: string;
  friendsHtml : string;
}


@inject(Stores.UserStore)
@observer
class FriendsNewsFeeds extends AppComponentBase<IFriendsNewsFeedsProps, IFriendsNewsFeedsState> {
  
  Initialstate = {
    userId: 0,
    maxResultCount: 10,
    skipCount: 0,
    filter: '',
    friendsHtml: '',
  };

  state = this.Initialstate;


  async componentWillMount() {

    //this.forceUpdate();    
  }


 render() {
    if (!this.props.userStore.MyFriendsUser) {
    
      return (
        <div>
        </div>)
    } else {
      
      return (
        <div>
        </div>
      );

    }
  }
}

export default FriendsNewsFeeds;
