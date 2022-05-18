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
import AppConsts from 'src/lib/appconst';
import { GetUserRelationshipInput } from 'src/services/user/dto/GetUserRelationshipInput';
//import { CreateRating } from 'src/services/user/dto/CreateRating';
//import Parser from 'html-react-parser';
// import fullcup from "src/Content/images/full cup.png";
// import emptycup from "src/Content/images/emptycup.png";

import cup0 from "src/Content/images/cup-0.png";
import cup25 from "src/Content/images/cup-25.png";
import cup50 from "src/Content/images/cup-50.png";
import cup75 from "src/Content/images/cup-75.png";
import cup100 from "src/Content/images/cup-100.png";

//import Moment from 'react-moment';
import * as moments from 'moment'

//import RatingStarHTML from 'src/components/RatingStarHTML';


import parse from 'html-react-parser';
//import { duration } from 'moment';

export interface INewsFeedsProps {

}

export interface INewsFeedsProps extends FormComponentProps, RouteComponentProps {
  userStore: UserStore;
}

export interface INewsFeedsState {
  userId: number;
  maxResultCount: number;
  skipCount: number;
  filter: string;
  friendsHtml: string;
  everyOneHtml: string;
  myLogsHtml: string;
}


@inject(Stores.UserStore)
@observer
class NewsFeeds extends AppComponentBase<INewsFeedsProps, INewsFeedsState> {
  ListUserWithoutMe: PagedResultDto<CreateOrUpdateUserInput>;
  MyFriendsUser: PagedResultDto<CreateOrUpdateUserInput>;
  //rating : CreateRating;


  Initialstate = {
    userId: 0,
    maxResultCount: 10,
    skipCount: 0,
    filter: '',
    friendsHtml: '',
    everyOneHtml: '',
    myLogsHtml: '',
  };

  state = this.Initialstate;


  //  async filter(arr: import("../../../../../../../Tanseef/4.6.0_27-10-2019/4.6.0/reactjs/src/services/user/dto/CreateRating").CreateRating[], callback: { (num: any): Promise<boolean>; (arg0: any): void; }) {
  //   const fail = Symbol()
  //   return (await Promise.all(arr.map(async (item: any) => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
  // };

  // async doAsyncStuff() {
  //   return Promise.resolve()
  // };

  roundByQuarter(value) {
    var inv = 1.0 / 0.25;
    return Math.round(value * inv) / inv;
  }

  GetFormattedDate(creationTime) {

        //  var aa = <Moment parse="YYYY-MM-DD">
        //             ratingsItem.creationTime
        //         </Moment>
                
//alert(JSON.stringify(aa));
  }

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
    }else if (RatingPoints == 0.50) {
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

  async getFormattedDate(date) {
    // debugger;
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
}

  async componentWillMount() {

    if (abp.utils.getCookieValue(AppConsts.User.UserId) != null) {

      if (this.props.userStore.ratings == undefined) {
        await this.props.userStore.GetAllRatings({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
      }
      if (this.props.userStore.users == undefined) {
        await this.props.userStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
      }
      if (this.props.userStore.MyFriendsUser == undefined) {
        var myObject = {} as GetUserRelationshipInput;
        myObject.UserId = Number(abp.utils.getCookieValue(AppConsts.User.UserId));
        myObject.followerId = this.state.userId;
        await this.props.userStore.getMyFriendsUsers(myObject);
      }
      new Promise<string>((resolve, reject) => {

        // Every one
        this.props.userStore.users.items.map(async item => {

          //var rating = await this.props.userStore.ratings!.filter((x: CreateRating) => x.userId == item.id);

          this.props.userStore.ratings!.map(async ratingsItem => {

            if (ratingsItem != null && ratingsItem != undefined) {

              if (ratingsItem.userId == item.id) {

                if (ratingsItem != undefined && ratingsItem != null) {

                  let ratingHTML = this.HTMLByRatingPoints(ratingsItem.placeRating);
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
                    // '<img alt="rating" src= ' + fullcup + ' />' +
                    // '<img alt="rating" src= ' + fullcup + ' />' +
                    // '<img alt="rating" src= ' + fullcup + ' />' +
                    // '<img alt="rating" src= ' + fullcup + ' />' +
                    // '<img alt="rating" src= ' + emptycup + ' />' +
                    '</div>' +
                    '</li>' +
                    '</ul>' +
                    '<p>' + ratingsItem.testingNotes + '<a class="readmore">…read more</a></p> ' +
                    '</div>' +
                    '</div>';
                }
                this.setState({ everyOneHtml: this.state.everyOneHtml })

                //rating details
                ratingsItem.moreRatingDetails!.map(async moreRatingsItem => {

                  if (moreRatingsItem != undefined && moreRatingsItem != null) {
                    let ratingHTML = this.HTMLByRatingPoints(moreRatingsItem.placeRating);
                    this.state.everyOneHtml += '<div class="d-table">' +
                      '<div class="d-table-cell content-cell">' +
                      '<img alt="" src="images/LoggedOut_Profile.png" />' +
                      '<p class="font-weight-bold">' + item.name + '</p>' +
                      '<p>'+ moments(moreRatingsItem.creationTime).format('ll') +'</p>' +
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

        // my friends

        this.props.userStore.MyFriendsUser!.map(async item => {

          this.props.userStore.ratings!.map(async ratingsItem => {

            if (ratingsItem != null && ratingsItem != undefined) {

              if (ratingsItem.userId == item.id) {

                if (ratingsItem != undefined && ratingsItem != null) {

                  let ratingHTML = this.HTMLByRatingPoints(ratingsItem.placeRating);
                  this.state.friendsHtml += '<div class="d-table">' +
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
                }
                this.setState({ friendsHtml: this.state.friendsHtml })

                //rating details
                ratingsItem.moreRatingDetails!.map(async moreRatingsItem => {

                  if (moreRatingsItem != undefined && moreRatingsItem != null) {
                    let ratingHTML = this.HTMLByRatingPoints(moreRatingsItem.placeRating);
                    this.state.friendsHtml += '<div class="d-table">' +
                      '<div class="d-table-cell content-cell">' +
                      '<img alt="" src="images/LoggedOut_Profile.png" />' +
                      '<p class="font-weight-bold">' + item.name + '</p>' +
                      '<p>'+ moments(moreRatingsItem.creationTime).format('ll') +'</p>' +
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
                  this.setState({ friendsHtml: this.state.friendsHtml })
                })


              }
            }

          })
        })

        // My Logs

        this.props.userStore.ratings!.map(async ratingsItem => {

          if (ratingsItem != null && ratingsItem != undefined) {

            if (ratingsItem.userId == Number(abp.utils.getCookieValue(AppConsts.User.UserId))) {

              if (ratingsItem != undefined && ratingsItem != null) {
                let ratingHTML = this.HTMLByRatingPoints(ratingsItem.placeRating);
                this.state.myLogsHtml += '<div class="d-table">' +
                  '<div class="d-table-cell content-cell">' +
                  // '<img alt="" src="images/LoggedOut_Profile.png" />'+
                  // '<p class="font-weight-bold">' + item.name +'</p>'+
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
              }
              this.setState({ myLogsHtml: this.state.myLogsHtml })

              //rating details
              ratingsItem.moreRatingDetails!.map(async moreRatingsItem => {

                if (moreRatingsItem != undefined && moreRatingsItem != null) {

                  let ratingHTML = this.HTMLByRatingPoints(moreRatingsItem.placeRating);
                  this.state.myLogsHtml += '<div class="d-table">' +
                    '<div class="d-table-cell content-cell">' +
                    // '<img alt="" src="images/LoggedOut_Profile.png" />'+
                    // '<p class="font-weight-bold">' + item.name +'</p>'+
                    '<p>'+ moments(moreRatingsItem.creationTime).format('ll') +'</p>' +

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
                this.setState({ myLogsHtml: this.state.myLogsHtml })
              })


            }
          }

        })
      });

    }
    else  // for Everyone if user is not logged in
    {
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

              if (ratingsItem.userId == item.id) {

                if (ratingsItem != undefined && ratingsItem != null) {
                  let ratingHTML = this.HTMLByRatingPoints(ratingsItem.placeRating);
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
                }
                this.setState({ everyOneHtml: this.state.everyOneHtml })

                //rating details
                ratingsItem.moreRatingDetails!.map(async moreRatingsItem => {

                  if (moreRatingsItem != undefined && moreRatingsItem != null) {
                    let ratingHTML = this.HTMLByRatingPoints(moreRatingsItem.placeRating);

                    this.state.everyOneHtml += '<div class="d-table">' +
                      '<div class="d-table-cell content-cell">' +
                      '<img alt="" src="images/LoggedOut_Profile.png" />' +
                      '<p class="font-weight-bold">' + item.name + '</p>' +
                      '<p>'+ moments(moreRatingsItem.creationTime).format('ll') +'</p>' +

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
    //this.forceUpdate();
  }


  render() {
    if (!this.props.userStore.MyFriendsUser) {

      return (
        <div>
        </div>)
    } else {
      return (
       
          <div className="sidebar-tabs">
            <div className="sidebar_heading"><h3>Feed</h3></div>
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <a className="nav-item nav-link active" id="nav-everone-tab" data-toggle="tab" href="#nav-everone" role="tab" aria-controls="nav-everone" aria-selected="true">Everyone</a>
                <a className="nav-item nav-link" id="nav-friend-tab" data-toggle="tab" href="#nav-friend" role="tab" aria-controls="nav-friend" aria-selected="false">Friends</a>
                <a className="nav-item nav-link" id="nav-mylog-tab" data-toggle="tab" href="#nav-mylog" role="tab" aria-controls="nav-mylog" aria-selected="false">My Logs</a>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-everone" role="tabpanel" aria-labelledby="nav-everone-tab">
                <div className="tab_contentarea">
                  {parse(this.state.everyOneHtml)}
                  {/* <div className="d-table">
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
                    </div> */}

                </div>
              </div>
              <div className="tab-pane fade" id="nav-friend" role="tabpanel" aria-labelledby="nav-friend-tab">
                <div className="tab_contentarea">


                  {parse(this.state.friendsHtml)}

                  {/* <div className="d-table">
                    <div className="d-table-cell content-cell">
                      <img alt="" src="images/LoggedOut_Profile.png" />
                      <p className="font-weight-bold">atledlorem</p>
                      <p>Feb 2, 2018</p>
                    </div>
                    <div className="d-table-cell desc-cell">
                      <ul className="tab-tag">
                        <li>Foxtail Farmhouse - Winterpark</li>
                        <li>Doppio</li>
                        <li>Chiapas</li>
                        <li>
                          <div className="star-ratings">
                            <img alt="rating" src="images/full cup.png" />
                            <img alt="rating" src="images/full cup.png" />
                            <img alt="rating" src="images/full cup.png" />
                            <img alt="rating" src="images/full cup.png" />
                            <img alt="rating" src="images/empty cup.png" />
                          </div>
                        </li>
                      </ul>
                      <p>Tasting Notes: Ut enim ad minim veniam, quis nostrud ex…read more<a href="#" className="readmore">…read more</a></p>
                    </div>
                  </div> */}

                </div>
              </div>
              <div className="tab-pane fade" id="nav-mylog" role="tabpanel" aria-labelledby="nav-mylog-tab">
                <div className="tab_contentarea">

                  {parse(this.state.myLogsHtml)}
                  {/* <div className="d-table">
                      <div className="d-table-cell content-cell">
                        <p>Nov 22, 2018</p>
                      </div>
                      <div className="d-table-cell desc-cell">
                        <ul className="tab-tag">
                          <li>In-sīt Coffee</li>
                          <li>Macchiato</li>
                          <li>Supernova Blend</li>
                          <li>
                            <div className="star-ratings">
                              <img alt="rating" src="images/full cup.png" />
                              <img alt="rating" src="images/full cup.png" />
                              <img alt="rating" src="images/full cup.png" />
                              <img alt="rating" src="images/full cup.png" />
                              <img alt="rating" src="images/empty cup.png" />
                            </div>
                          </li>
                        </ul>
                        <p>Tasting Notes: Aroma of blueberries and citrus. Flavor heavy on the Ethiopian with blueberry and lemon notes balanced by Colombian dark chocolate.<a href="#" className="readmore">…read less</a></p>
                      </div>
                    </div> */}

                </div>
              </div>



            </div>
          </div>
      
      );

    }
  }
}

export default NewsFeeds;
