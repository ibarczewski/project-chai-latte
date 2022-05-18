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
//import { CreateRating } from 'src/services/user/dto/CreateRating';
//import Parser from 'html-react-parser';
// import fullcup from "src/Content/images/full cup.png";
// import emptycup from "src/Content/images/emptycup.png";



import cup0 from "src/Content/images/cup-0.png";
import cup25 from "src/Content/images/cup-25.png";
import cup50 from "src/Content/images/cup-50.png";
import cup75 from "src/Content/images/cup-75.png";
import cup100 from "src/Content/images/cup-100.png";

import parse from 'html-react-parser';
import * as moments from 'moment'


export interface INewsFeedsWithOutLoginDesktopProps {

}

export interface INewsFeedsWithOutLoginDesktopProps extends FormComponentProps, RouteComponentProps {
  userStore: UserStore;
}

export interface INewsFeedsWithOutLoginDesktopState {
  userId: number;
  maxResultCount: number;
  skipCount: number;
  filter: string;
  everyOneHtml : string;
}

@inject(Stores.UserStore)
@observer
class NewsFeedsWithOutLoginDesktop extends AppComponentBase<INewsFeedsWithOutLoginDesktopProps, INewsFeedsWithOutLoginDesktopState> {
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
  HTMLByRatingPoints(RatingPoints) {

    var ratingHTML = "";
    if (RatingPoints == 0.0) {
      ratingHTML += '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 0.25) {
      ratingHTML += '<img alt="rating" src= ' + cup25 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    }
    else if (RatingPoints == 0.50) {
      ratingHTML += '<img alt="rating" src= ' + cup50 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 0.75) {
      ratingHTML += '<img alt="rating" src= ' + cup75 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 1.0) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 1.25) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup25 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 1.50) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup50 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 1.75) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup75 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 2.0) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 2.25) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup25 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 2.50) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup50 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 2.75) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup75 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 3.0) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 3.25) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup25 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 3.50) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup50 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 3.75) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup75 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 4.0) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (RatingPoints == 4.25) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup25 + ' />';
    } else if (RatingPoints == 4.50) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup50 + ' />';
    } else if (RatingPoints == 4.75) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup75 + ' />';
    } else if (RatingPoints == 5.0) {
      ratingHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />';
    }

    return ratingHTML;

  };
  async componentWillMount() {
      if (this.props.userStore.ratings == undefined) {
        await this.props.userStore.GetAllRatings({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
      }
      if (this.props.userStore.users == undefined) {
        await this.props.userStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
      }
      new Promise<string>((resolve, reject) => {     

         // Every one         
        this.props.userStore.users.items.map(async item => {
          //var rating = await this.props.userStore.ratings!.filter((x: CreateRating) => x.userId == item.id);

          this.props.userStore.ratings!.map(async ratingsItem => {

            if (ratingsItem != null && ratingsItem != undefined) {

              let ratingHTML = this.HTMLByRatingPoints(ratingsItem.placeRating);
              if (ratingsItem.userId == item.id) {
                  this.state.everyOneHtml += '<div class="d-table">' +
                    '<div class="d-table-cell content-cell">' +
                    '<img alt="" src="images/LoggedOut_Profile.png" />' +
                    '<p class="font-weight-bold">' + item.name + '</p>' +
                    '<p>'+ moments(ratingsItem.creationTime).format('ll') +'</p>' +
                    '</div>' +
                    '<div class="d-table-cell desc-cell">' +
                    '<ul class="tab-tag">' +
                    '<li>' + ratingsItem.placeName + '</li>' +
                    '<li>' + ratingsItem.beanName + '</li>' +
                    '<li>' + ratingsItem.roasterName + '</li>' +
                    '<li>' +
                    '<div class="star-ratings">' +
                    ratingHTML +
                    '</div>' +
                    '</li>' +
                    '</ul>' +
                    '<p>' + ratingsItem.testingNotes + '<a class="readmore">…read more</a></p> ' +
                    '</div>' +
                    '</div>';
                
                this.setState({ everyOneHtml: this.state.everyOneHtml })

                //rating details
                ratingsItem.moreRatingDetails!.map(async moreRatingsItem => {
                  if (moreRatingsItem != undefined && moreRatingsItem != null) {
                    let ratingHTML = this.HTMLByRatingPoints(moreRatingsItem.placeRating);
                    this.state.everyOneHtml += '<div class="d-table">' +
                      '<div class="d-table-cell content-cell">' +
                      '<img alt="" src="images/LoggedOut_Profile.png" />' +
                      '<p class="font-weight-bold">' + item.name + '</p>' +
                      '<p>'+ moments(ratingsItem.creationTime).format('ll') +'</p>' +
                      '</div>' +
                      '<div class="d-table-cell desc-cell">' +
                      '<ul class="tab-tag">' +
                      '<li>' + moreRatingsItem.placeName + '</li>' +
                      '<li>' + moreRatingsItem.beanName + '</li>' +
                      '<li>' + moreRatingsItem.roasterName + '</li>' +
                      '<li>' +
                      '<div class="star-ratings">' +
                      ratingHTML +
                      '</div>' +
                      '</li>' +
                      '</ul>' +
                      '<p>' + moreRatingsItem.testingNotes + '<a class="readmore">…read more</a></p> ' +
                      '</div>' +
                      '</div>';
                  }
                  this.setState({ everyOneHtml: this.state.everyOneHtml })
                })
              }
            }
          })
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

export default NewsFeedsWithOutLoginDesktop;
