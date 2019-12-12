import * as React from 'react';
// import { Col, Icon, Avatar, Dropdown, Badge, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';
import Stores from 'src/stores/storeIdentifier';
import UserStore from 'src/stores/userStore';
import AppComponentBase from 'src/components/AppComponentBase';
import { observer, inject } from 'mobx-react';
import { CreateOrUpdateUserInput } from 'src/services/user/dto/createOrUpdateUserInput';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';
// import AppConsts from 'src/lib/appconst';
// import { GetUserRelationshipInput } from 'src/services/user/dto/GetUserRelationshipInput';
import { CreateRating } from 'src/services/user/dto/CreateRating';
//import Parser from 'html-react-parser';
import fullcup from "src/Content/images/full cup.png";
import emptycup from "src/Content/images/emptycup.png";


import parse from 'html-react-parser';

export interface INewsFeedsWithOutLoginProps {

}

export interface INewsFeedsWithOutLoginProps extends FormComponentProps, RouteComponentProps {
  userStore: UserStore;
}

export interface INewsFeedsWithOutLoginState {
  userId: number;
  maxResultCount: number;
  skipCount: number;
  filter: string;
  everyOneHtml : string;
}

@inject(Stores.UserStore)
@observer
class NewsFeedsWithOutLogin extends AppComponentBase<INewsFeedsWithOutLoginProps, INewsFeedsWithOutLoginState> {
  ListUserWithoutMe: PagedResultDto<CreateOrUpdateUserInput>;
  MyFriendsUser: PagedResultDto<CreateOrUpdateUserInput>;

  Initialstate = {
    userId: 0,
    maxResultCount: 10,
    skipCount: 0,
    filter: '',

    everyOneHtml : '',

  };

  state = this.Initialstate;

  async componentWillMount() {

    
      if (this.props.userStore.ratings == undefined) {
        await this.props.userStore.GetAllRatings({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
      }
      if (this.props.userStore.users == undefined) {
        await this.props.userStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
      }
      new Promise<string>((resolve, reject) => {     
        debugger;
         this.props.userStore.users.items.map( async item => {    
          var rating = await this.props.userStore.ratings!.filter((x: CreateRating) => x.userId == item.id);
          debugger;
          if (rating[0] != undefined && rating != null) {  
            this.state.everyOneHtml +=  '<div class="d-table">'+
                '<div class="d-table-cell content-cell">'+
                  '<img alt="" src="images/LoggedOut_Profile.png" />'+
                  '<p class="font-weight-bold">' + item.name +'</p>'+
                  '<p>Feb 2, 2018</p>'+
                '</div>'+
                '<div class="d-table-cell desc-cell">' +
                  '<ul class="tab-tag">'+
                  '<li>' + rating[0].placeId +'</li>' +
                    '<li>' + rating[0].beanName+ '</li>' +
                    '<li>' + rating[0].roasterName +'</li>' +
                    '<li>' +
                      '<div class="star-ratings">' +
                        '<img alt="rating" src= ' + fullcup + ' />' +
                        '<img alt="rating" src= ' + fullcup + ' />' +
                        '<img alt="rating" src= ' + fullcup + ' />' +
                        '<img alt="rating" src= ' + fullcup + ' />' +
                        '<img alt="rating" src= ' + emptycup + ' />' +
                        '</div>' +
                      '</li>' +
                  '</ul>' +
                  '<p>'+ rating[0].testingNotes + '<a class="readmore">…read more</a></p> ' +
                  '</div>' +
                '</div>' ;                 
          }
          this.setState({ everyOneHtml: this.state.everyOneHtml  })
        })  

      });
  }


 render() {
    if (this.state.everyOneHtml == "") {    
      return (
        <div>
        </div>)
    } else {
      return (
      
          // <div className="col-lg-5 hidden-md">
          //   <div className="sidebar-tabs">
          //     <div className="sidebar_heading"><h3>Feed</h3></div>
          //     <nav>
          //       <div className="nav nav-tabs" id="nav-tab" role="tablist">
          //         <a className="nav-item nav-link active" id="nav-everone-tab" data-toggle="tab" href="#nav-everone" role="tab" aria-controls="nav-everone" aria-selected="true">Everyone</a>
          //         {/* <a className="nav-item nav-link" id="nav-friend-tab" data-toggle="tab" href="#nav-friend" role="tab" aria-controls="nav-friend" aria-selected="false">Friends</a>
          //         <a className="nav-item nav-link" id="nav-mylog-tab" data-toggle="tab" href="#nav-mylog" role="tab" aria-controls="nav-mylog" aria-selected="false">My Logs</a> */}
          //       </div>
          //     </nav>
          //     <div className="tab-content" id="nav-tabContent">
          //       <div className="tab-pane fade show active" id="nav-everone" role="tabpanel" aria-labelledby="nav-everone-tab">
          //         <div className="tab_contentarea">
          //         {parse(this.state.everyOneHtml)}                   
          //         </div>
          //       </div>

          //     </div>
          //   </div>
          // </div>

                               <div className="sidebar-tabs">
                                    <div className="sidebar_heading"><h3>Feed</h3></div>
                                    <div className="tab_contentarea">
                                      
                                    {parse(this.state.everyOneHtml)}  

                                    </div>
                                </div>

       
      );

    }
  }
}

export default NewsFeedsWithOutLogin;
