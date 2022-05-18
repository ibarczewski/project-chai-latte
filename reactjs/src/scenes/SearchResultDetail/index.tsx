/// <reference types="@types/googlemaps" />
import * as React from 'react';
//import { Form, Input, Checkbox, Modal, Tabs } from 'antd';
import { Form } from 'antd';

import AppComponentBase from 'src/components/AppComponentBase';
import Stores from 'src/stores/storeIdentifier';
import UserStore from 'src/stores/userStore';
import { observer, inject } from 'mobx-react';
import { FormComponentProps } from 'antd/lib/form';
import { GetSearchOutputResults } from 'src/services/user/dto/SearchOutputResult';
import { searchUserInput } from 'src/services/user/dto/searchUserInput';
import { RouteComponentProps } from 'react-router-dom';
import find_2 from "src/Content/images/find_2.png";
import address from "src/Content/images/address.svg";
import call from "src/Content/images/call.svg";
import hours from "src/Content/images/hours.svg";
import followcafe from "src/Content/images/follow-cafe.svg";



import NewsFeeds from 'src/components/NewsFeeds';
import NewsFeedsWithOutLogin from 'src/components/NewsFeedsWithOutLogin';
import AppConsts from 'src/lib/appconst';

import cup0 from "src/Content/images/cup-0.png";
import cup25 from "src/Content/images/cup-25.png";
import cup50 from "src/Content/images/cup-50.png";
import cup75 from "src/Content/images/cup-75.png";
import cup100 from "src/Content/images/cup-100.png";

import parse from 'html-react-parser';


export interface ISearchResultDetailProps extends FormComponentProps, searchUserInput, RouteComponentProps {
  userStore: UserStore;
}

export interface ISearchResultDetailState {
  userId: number;
  maxResultCount: number;
  skipCount: number;
  filter: string;
  AveragePlaceRating: Number;
  AveragePlaceMyRating: Number;

  AveragePlaceRatingHTML: string;
  AveragePlaceMyRatingHTML: string;
}

//  const confirm = Modal.confirm;
//  const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class SearchResultDetail extends AppComponentBase<ISearchResultDetailProps, ISearchResultDetailState, searchUserInput> {
  formRef: any;
  searchUserInput: searchUserInput;
  placeid: string | null;
  placename: string | null;
  SearchOutputResults?: GetSearchOutputResults;
  //roles ?: GetSearchOutputResults | undefined;


  state = {
    userId: 0,
    maxResultCount: 10,
    skipCount: 0,
    filter: '',
    AveragePlaceRating: 0,
    AveragePlaceMyRating: 0,
    AveragePlaceRatingHTML: '',
    AveragePlaceMyRatingHTML: ''
  };


  getParameterByName(name, url) {

    // if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  roundByQuarter(value) {
    var inv = 1.0 / 0.25;
    return Math.round(value * inv) / inv;
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

  async componentDidMount() {

    this.placeid = this.getParameterByName('placeid', window.location.href);
    var myObject = {} as searchUserInput;
    myObject.placeId = this.placeid;
    this.SearchOutputResults = await this.LoadData(myObject);

    this.placename = this.SearchOutputResults.name;

    if (this.props.userStore.ratings == undefined) {
      await this.props.userStore.GetAllRatings({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
    }
    if (this.props.userStore.users == undefined) {
      await this.props.userStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
    }

    // Every one     
    var ratingsCount = 0;
    var ratingPoints = 0;

    var AvgSingleUser = 0;

    var myRatingsCount = 0;
    var myRatingPoints = 0;
    var UniqueuserCount = 0;

    this.props.userStore.users.items.map(async item => {
      
      // UniqueuserCount++;

      this.props.userStore.ratings!.map(async ratingsItem => {
  
        if (ratingsItem != null && ratingsItem != undefined) {
          if (ratingsItem.placeId == this.placeid && ratingsItem.userId == item.id) {
            UniqueuserCount++;
            // // Place
            ratingsCount++;
            ratingPoints += ratingsItem.placeRating;

            // My average 
            if (abp.utils.getCookieValue(AppConsts.User.UserId) != null && ratingsItem.userId == Number(abp.utils.getCookieValue(AppConsts.User.UserId))) {
              myRatingsCount++;
              myRatingPoints += ratingsItem.placeRating;
            }

            //rating details
            ratingsItem.moreRatingDetails!.map(async moreRatingsItem => {
              if (moreRatingsItem != undefined && moreRatingsItem != null && moreRatingsItem.userId == item.id) {
                // Place
                if (moreRatingsItem.placeId == this.placeid) {
                  ratingsCount++;
                  ratingPoints += moreRatingsItem.placeRating;

                  // My average
                  if (abp.utils.getCookieValue(AppConsts.User.UserId) != null && moreRatingsItem.userId == Number(abp.utils.getCookieValue(AppConsts.User.UserId))) {
                    myRatingsCount++;
                    myRatingPoints += moreRatingsItem.placeRating;
                  }
                }
              }
            })
          }
        }

      })

      if (ratingsCount > 0) {
    
        var temp = ratingPoints / ratingsCount;
        AvgSingleUser += temp;

        ratingsCount = 0;
        ratingPoints = 0;
      }
    })

    if (UniqueuserCount > 0) {
      this.setState({ AveragePlaceRating: AvgSingleUser / UniqueuserCount });
      var AveragePlaceRating = this.roundByQuarter(this.state.AveragePlaceRating);
      let temp = this.HTMLByRatingPoints(AveragePlaceRating);      
      this.setState({ AveragePlaceRatingHTML : temp  })
    }else{
      this.setState({ AveragePlaceRatingHTML : "No Rating Yet. " })
    }
    if (myRatingsCount > 0) {
      this.setState({ AveragePlaceMyRating: myRatingPoints / myRatingsCount });
      var AveragePlaceMyRating = this.roundByQuarter(this.state.AveragePlaceMyRating);
      let temp = this.HTMLByRatingPoints(AveragePlaceMyRating);       
      this.setState({ AveragePlaceMyRatingHTML: temp })
    }else{
      this.setState({ AveragePlaceMyRatingHTML: "No Rating Yet. " })
    }

    this.forceUpdate();

  }

  public async LoadData(searchUserInput: searchUserInput) {
    // return new Promise<GetSearchOutputResults>((resolve, reject) => {
    this.SearchOutputResults = await this.props.userStore.SearchDetail(searchUserInput);
    return this.SearchOutputResults;
    //});

  }

  render() {
    if (!this.SearchOutputResults) {
      return (
        <div>
        </div>)
    } else
    this.props.userStore.ChangeLoader(false);
      return (
        <div>
          <main id="main">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-7 col-md-12 col-sm-12">
                  <a onClick={this.props.history.goBack} className="back_home"><i className="fas fa-chevron-left" /> back</a>
                  <div className="heading">
                    <h2>{this.SearchOutputResults.name}</h2>
                    <div className="cafe_image">
                      {/* <img src={this.SearchOutputResults.photos[0].getUrl({maxWidth: 35, maxHeight: 35})} alt="image" />                         */}
                      {/* <img src="images/cafe.jpg" alt="image"/> */}
                      <img src={this.SearchOutputResults.photos ? this.SearchOutputResults.photos[0].getUrl({ maxWidth: 736, maxHeight: 342 }) : ""} alt="image" />
                    </div>
                  </div>
                  <div className="tab_contentarea">
                    <div className="d-table">
                      <div className="d-table-cell list_icons">
                        <p><img src={find_2} alt="image" /> 0.5 miles away</p>
                        <p><img src={address} alt="image" /> {this.SearchOutputResults.formatted_address} </p>
                        <p><img src={call} alt="image" />  {this.SearchOutputResults.formatted_phone_number} </p>
                        <p><img src={hours} alt="image" /> {this.SearchOutputResults.opening_hours ? this.SearchOutputResults.opening_hours.open_now ? "Open Now" : "Closed" : ""}</p>
                      </div>
                    </div>
                    <a className="follow_cafe"><img src={followcafe} alt="image" /> Follow cafe in my Feed</a>
                    <hr />
                    <div className="d-table">
                      <div className="d-table-cell desc-cell list_icons2">
                        <p>Serves: Single Origin, Blends</p>
                        <ul className="tab-tag">
                          <li>Average Rating</li>
                          <li id="IdAveragePlaceRatingLiTag">
                          <div className="star-ratings">
                            {parse(this.state.AveragePlaceRatingHTML)}
                            </div>
                          </li>
                        </ul>
                        <p id="IdAveragePlaceMyRatingPTag">
                        <div className="star-ratings">
                          My rating: {parse(this.state.AveragePlaceMyRatingHTML)}
                          </div>                           
                          <a style={{color:'#9B9B9B',cursor:'pointer' }} onClick={() => this.props.history.push("/Rating?placeid=" + this.placeid + '&placename='+ this.placename)}> Rate it now </a></p>
                      </div>
                    </div>
                    <hr />
                    {/* <div className="d-table">
                      <div className="d-table-cell desc-cell list_icons2">
                        <h4>Reviews</h4>
                        <ul className="tab-tag">
                          <li>Andy S.</li>
                          <li>
                            <div className="star-ratings">
                              <img alt="rating" src="images/full cup.png" />
                              <img alt="rating" src="images/full cup.png" />
                              <img alt="rating" src="images/full cup.png" />
                              <img alt="rating" src="images/full cup.png" />
                              <img alt="rating" src="images/empty cup.png" />
                            </div>
                          </li>
                          <li>Feb 2, 2018</li>
                        </ul>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="col-lg-5 hidden-md">
                {(abp.utils.getCookieValue(AppConsts.User.UserId) != null) ? <NewsFeeds {...this.props} /> : <NewsFeedsWithOutLogin {...this.props} />}
                </div>
                {/* <div className="col-lg-5 hidden-md">
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
                             </div>
                             <div className="tab-pane fade" id="nav-friend" role="tabpanel" aria-labelledby="nav-friend-tab">
                               <div className="tab_contentarea">
                                 <div className="d-table">
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
                                 </div>
                                 <div className="d-table">
                                   <div className="d-table-cell content-cell">
                                     <img alt="" src="images/LoggedOut_Profile.png" />
                                     <p className="font-weight-bold">itebsnook</p>
                                     <p>Nov 15, 2018</p>
                                   </div>
                                   <div className="d-table-cell desc-cell">
                                     <ul className="tab-tag">
                                       <li>Reborn Coffee</li>
                                       <li>Espresso Macchiato</li>
                                       <li>Valencia Coffee</li>
                                       <li><div className="star-ratings">
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/empty cup.png" />
                                         </div></li>
                                     </ul>
                                     <p>Tasting Notes: Chocolate really stands out with added…
                                       <a href="#" className="readmore">read more</a>
                                     </p>
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
                                       <li><div className="star-ratings">
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/empty cup.png" />
                                         </div></li>
                                     </ul>
                                     <p>Tasting Notes: Light, clean balanced bergamot/tea …read more…
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
                                       <li><div className="star-ratings">
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/empty cup.png" />
                                         </div></li>
                                     </ul>
                                     <p>Tasting Notes: Aroma of blueberries and citrus. Flavor heavy on the Ethiopian with blueberry and lemon notes balanced by Colombian dark chocolate..…
                                       <a href="#" className="readmore">read less…</a></p>
                                   </div>
                                 </div>
                               </div>
                             </div>
                             <div className="tab-pane fade" id="nav-mylog" role="tabpanel" aria-labelledby="nav-mylog-tab">
                               <div className="tab_contentarea">
                                 <div className="d-table">
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
                                 </div>
                                 <div className="d-table">
                                   <div className="d-table-cell content-cell">
                                     <p>Nov 15, 2018</p>
                                   </div>
                                   <div className="d-table-cell desc-cell">
                                     <ul className="tab-tag">
                                       <li>Reborn Coffee</li>
                                       <li>Espresso Macchiato</li>
                                       <li>Valencia Coffee</li>
                                       <li><div className="star-ratings">
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/empty cup.png" />
                                         </div></li>
                                     </ul>
                                     <p>Tasting Notes: Chocolate really stands out with added
                                     <a href="#" className="readmore">…read more</a>
                                     </p>
                                   </div>
                                 </div>
                                 <div className="d-table">
                                   <div className="d-table-cell content-cell">
                                     <p>Sep 9, 2018</p>
                                   </div>
                                   <div className="d-table-cell desc-cell">
                                     <ul className="tab-tag">
                                       <li>Hopper &amp; Burr</li>
                                       <li>Doppio</li>
                                       <li>Reko</li>
                                       <li><div className="star-ratings">
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/empty cup.png" />
                                         </div></li>
                                     </ul>
                                     <p>Tasting Notes: Light, clean balanced bergamot/tea
                                       <a href="#" className="readmore">…read more</a></p>
                                   </div>
                                 </div>
                                 <div className="d-table">
                                   <div className="d-table-cell content-cell">
                                     <p>Feb 2, 2018</p>
                                   </div>
                                   <div className="d-table-cell desc-cell">
                                     <ul className="tab-tag">
                                       <li>Foxtail Farmhouse - Winterpark</li>
                                       <li>Doppio</li>
                                       <li>Chiapas</li>
                                       <li><div className="star-ratings">
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/full cup.png" />
                                           <img alt="rating" src="images/empty cup.png" />
                                         </div></li>
                                     </ul>
                                     <p>Tasting Notes: Ut enim ad minim veniam, quis nostrud ex
                                       <a href="#" className="readmore">…read more</a></p>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div> */}



              </div>
            </div>
          </main>


        </div>

      );

    //this.SearchOutputResults = this.props.userStore.SearchResultDetail;

    // alert('render');
    // if(this.SearchOutputResults.photos != undefined ){
    //     alert(JSON.stringify(this.SearchOutputResults));            
    //    alert('Final' + this.SearchOutputResults.photos[0].getUrl({maxWidth: 35, maxHeight: 35}));
    // } 



  }
}

//export default Register;

export default Form.create()(SearchResultDetail);