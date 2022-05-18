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
import { GetSearchOutputResults } from 'src/services/user/dto/SearchOutputResult';
import { searchUserInput } from 'src/services/user/dto/searchUserInput';
import { RouteComponentProps } from 'react-router-dom';
import NewsFeeds from 'src/components/NewsFeeds';
import NewsFeedsWithOutLogin from 'src/components/NewsFeedsWithOutLogin';
import AppConsts from 'src/lib/appconst';

import cup0 from "src/Content/images/cup-0.png";
import cup25 from "src/Content/images/cup-25.png";
import cup50 from "src/Content/images/cup-50.png";
import cup75 from "src/Content/images/cup-75.png";
import cup100 from "src/Content/images/cup-100.png";
import parse from 'html-react-parser';
import * as $ from "jquery"


//import { usePosition } from 'use-position';

//import {distance} from 'google-distance';

//declare let google: any;
//import {google} from '@types/googlemaps';
/// <reference types=”@types/googlemaps” />

//var google: any;
// import { Hello } from "google.maps";

//import './local';

//import {SearchResult} from './local';



export interface ISearchResultProps extends FormComponentProps, searchUserInput, RouteComponentProps {
  userStore: UserStore;
}

export interface ISearchResultState {
  userId: number;
  Currentlatitude: number;
  Currentlongitude: number;

}

//  const confirm = Modal.confirm;
//  const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class SearchResult extends AppComponentBase<ISearchResultProps, ISearchResultState, searchUserInput> {
  formRef: any;
  searchUserInput: searchUserInput;
  searchkey: string | null;
  LocalSearchResult: GetSearchOutputResults[] = [];

  // Currentlatitude : number;
  // Currentlongitude : number;

  Initialstate = {
    userId: 0,
    Currentlatitude: 0,
    Currentlongitude: 0
  };
  state = this.Initialstate;

  show_body() {
    $('#show_Sortingbody').slideToggle(500);
  }

  show_body2() {
    $('#show_Filterbody').slideToggle(500);
  }


  getParameterByName(name, url) {


    // if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }




  async componentDidMount() {
    this.props.userStore.ChangeLoader(true);
    const self = this;
    //if (window.performance) {
    // if (performance.navigation.type == 1) {

    // }
    // }
    this.searchkey = this.getParameterByName('searchkey', window.location.href);
    var myObject = {} as searchUserInput;
    myObject.searchText = this.searchkey;

    // debugger;

    if (this.searchkey != '' && Number(this.searchkey)) {

      await this.props.userStore.search(myObject);
      var lat = 0
      var lng = 0;;
      this.props.userStore.SearchResult.map((item, key) => {
        lat = item.geometry!.location!.lat();
        lng = item.geometry!.location!.lng();
      })
      var myObject = {} as searchUserInput;
      myObject.searchText = '';
      myObject.lat = lat;
      myObject.lng = lng;
      await this.props.userStore.NearBySearchByZipCodeText(myObject);


      self.props.userStore.SearchResult.map((item, key) => {

        item.distance = 0;
        var directionsService = new google.maps.DirectionsService();
        lat = item.geometry!.location!.lat();
        lng = item.geometry!.location!.lng();
        const route = {
          origin: new google.maps.LatLng(myObject.lat, myObject.lng), //'Chicago, IL',
          destination: new google.maps.LatLng(lat, lng),  //'Los Angeles, CA',
          travelMode: google.maps.TravelMode.DRIVING
        }
        directionsService.route(route, function (response, status) { // anonymous function to capture directions
          if (status !== google.maps.DirectionsStatus.OK) {
            // alert('status' + status);
            return;
          } else {

            //item.distance = response.routes[0].legs[0].distance.text;
            item.distance = response.routes[0].legs[0].distance.value/1000;     
          }
        });
      })


    } else if (this.searchkey != '' && this.searchkey != null) {

      await this.props.userStore.search(myObject);
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          self.props.userStore.SearchResult.map(async (item, key) => {
            // debugger;
            item.distance = 0;
            var directionsService = new google.maps.DirectionsService();
            var lat = item.geometry!.location!.lat();
            var lng = item.geometry!.location!.lng();
            const route = {
              origin: new google.maps.LatLng(pos.lat, pos.lng), //'Chicago, IL',
              destination: new google.maps.LatLng(lat, lng),  //'Los Angeles, CA',
              travelMode: google.maps.TravelMode.DRIVING
            }            
            directionsService.route(route, function (response, status) {
              if (status !== google.maps.DirectionsStatus.OK) {
                return;
              } else {
                // debugger;
                // var split = response.routes[0].legs[0].distance.text.split(' ');
                // item.distance = split[0];
                item.distance = response.routes[0].legs[0].distance.value/1000;     
              }
            });

            //item.distance = await self.getdirectionsroute(route);

          })
        }, function () {
          alert('Location is disabled');
        });
      } else {
        // Browser doesn't support Geolocation
        // this.handleLocationError(false);
      }
    }
    else {
      myObject.searchText = '';

      await this.props.userStore.NearBySearch(myObject);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          self.props.userStore.SearchResult.map((item, key) => {
            // debugger;
            item.distance = 0;
            var directionsService = new google.maps.DirectionsService();
            var lat = item.geometry!.location!.lat();
            var lng = item.geometry!.location!.lng();
            const route = {
              origin: new google.maps.LatLng(pos.lat, pos.lng), //'Chicago, IL',
              destination: new google.maps.LatLng(lat, lng),  //'Los Angeles, CA',
              travelMode: google.maps.TravelMode.DRIVING
            }
            directionsService.route(route, function (response, status) { // anonymous function to capture directions
              if (status !== google.maps.DirectionsStatus.OK) {
                // alert('status' + status);
                return;
              } else {
                console.log(response);              
                //item.distance = response.routes[0].legs[0].distance.text;
                item.distance = response.routes[0].legs[0].distance.value/1000;                
              }
            });
          })
        }, function () {
          alert('Location is disabled');
        });
      } else {
        // Browser doesn't support Geolocation
        // this.handleLocationError(false);
      }

    }

  }

//   async getdirectionsroute(request) {
//   var delayFactor = 0;
//   var distance = "";
//   const self = this;
//   // debugger;

//   var directionsService = new google.maps.DirectionsService();
//   directionsService.route(request, function(response, status) {
//     // debugger;
//         if (status === google.maps.DirectionsStatus.OK) {
//           console.log(response);
//            distance = response.routes[0].legs[0].distance.text;
//            return distance;
//         } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
//             delayFactor++;
//             setTimeout(function () {
//               self.getdirectionsroute(request);

//             }, delayFactor * 1000);
//             return distance;
//         } else {
//           return distance;
//         }
//     });
//     return distance;
// };


  handleLocationError(browserHasGeolocation) {
    alert(browserHasGeolocation);
  }

  roundByQuarter(value) {
    var inv = 1.0 / 0.25;
    return Math.round(value * inv) / inv;
  }

  HTMLRatingByPlaceId(placeId) {

    var HTML = "";

    // Every one
    var ratingsCount = 0;
    var ratingPoints = 0;

    var AvgSingleUser = 0;
    var UniqueuserCount = 0;

    this.props.userStore.ratings!.map(async ratingsItem => {

      if (ratingsItem != null && ratingsItem != undefined) {
        if (ratingsItem.placeId == placeId) {
          UniqueuserCount++;
          // Place
          ratingsCount++;
          ratingPoints += ratingsItem.placeRating;
          //rating details
          ratingsItem.moreRatingDetails!.map(async moreRatingsItem => {
            if (moreRatingsItem != undefined && moreRatingsItem != null) {
              // Place
              if (moreRatingsItem.placeId == placeId) {
                ratingsCount++;
                ratingPoints += moreRatingsItem.placeRating;
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

    if (UniqueuserCount > 0) {
      var AveragePlaceRating = AvgSingleUser / UniqueuserCount;
      var AveragePlaceRating = this.roundByQuarter(AveragePlaceRating);
      let temp = this.HTMLByRatingPoints(AveragePlaceRating);
      HTML += '<div class="star-ratings">' + temp + '</div>';
    }
    if (HTML == "") {
      HTML = "No Rating yet";
    }
    return HTML;
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

  DistanceClicked = async (e: any) => {
    this.props.userStore.SearchResult = this.props.userStore.SearchResult.sort(function(a, b) {    
      return ((a.distance ? Number(a.distance) : 0) - (b.distance ? Number(b.distance) : 0));
    });     
  }

  RatingClicked = async (e: any) => {
    this.props.userStore.SearchResult = this.props.userStore.SearchResult.sort(function(a, b) {    
      return ((b.rating ? Number(b.rating) : 0) - (a.rating ? Number(a.rating) : 0));
    });
   }




  render() {
    this.props.userStore.ChangeLoader(false);
    return (

      <div>

        <main id="main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-7 col-md-12 col-sm-12">
                <a onClick={this.props.history.goBack} className="back_home"><i className="fas fa-chevron-left" /> back</a>
                <div className="heading">
                  <h2>Results for {this.searchkey != undefined ? this.searchkey : 'nearby cafes'}</h2>
                </div>
                <div className="filter">

                  <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                      <div className="filter_sort" >
                        <p className="show_login" onClick={this.show_body}>Sort by <span /></p>
                        <div className="show_body" id="show_Sortingbody" >
                          <div className="filter_search">
                            <div className="row">
                              <div className="col-sm-12">
                                <div className="input-group radio">
                                  <input id="radio-1" name="radio" type="radio" onClick={this.DistanceClicked} />
                                  <label htmlFor="radio-1" className="radio-label"> Distance from <span>32789</span></label>
                                </div>
                                <div className="input-group radio">
                                  <input id="radio-2" name="radio" type="radio" onClick={this.RatingClicked}/>
                                  <label htmlFor="radio-2" className="radio-label"> Rating</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                      <div className="filter_sort">
                        <p className="show_login2" onClick={this.show_body2}>Filter <span /></p>
                        <div className="show_body2" id="show_Filterbody">
                          <div className="filter_search">
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                <div className="form-group check_box">
                                  <input type="checkbox" id="html" />
                                  <label htmlFor="html">Light</label>
                                </div>
                                <div className="form-group check_box">
                                  <input type="checkbox" id="html2" />
                                  <label htmlFor="html2">Medium</label>
                                </div>
                                <div className="form-group check_box">
                                  <input type="checkbox" id="html3" />
                                  <label htmlFor="html3">Dark</label>
                                </div>
                                <div className="form-group check_box">
                                  <input type="checkbox" id="html4" />
                                  <label htmlFor="html4">Darkest</label>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                <div className="form-group check_box">
                                  <input type="checkbox" id="html5" />
                                  <label htmlFor="html5">5</label>
                                </div>
                                <div className="form-group check_box">
                                  <input type="checkbox" id="html6" />
                                  <label htmlFor="html6">4+</label>
                                </div>
                                <div className="form-group check_box">
                                  <input type="checkbox" id="html7" />
                                  <label htmlFor="html7">3+</label>
                                </div>
                                <div className="form-group check_box">
                                  <input type="checkbox" id="html8" />
                                  <label htmlFor="html8">2+</label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 text-center">
                                <button className="btn-web m-t30 m-b10">Filter</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab_contentarea">
                  {this.LocalSearchResult.length > 0 ? this.LocalSearchResult.map((item, key) =>
                      <div className="d-table">
                        <div className="d-table-cell desc-cell">
                          <a className="nav-link" onClick={() => this.props.history.push("/searchresultdetail?placeid=" + item.place_id + "&placename=" + item.name)}>
                            <h4>{item.name}</h4>
                          </a>
                          <p style={{ width: '223px' }}>{item.formatted_address != null ? item.formatted_address : item.vicinity}</p>
                          <p>{item.distance} away</p>
                          <p>{parse(this.HTMLRatingByPlaceId(item.place_id))}</p>
                        </div>
                      </div>
                    ) : this.props.userStore.SearchResult.map((item, key) =>
                    <div className="d-table">
                      <div className="d-table-cell desc-cell">
                        <a className="nav-link" onClick={() => this.props.history.push("/searchresultdetail?placeid=" + item.place_id + "&placename=" + item.name)}>
                          <h4>{item.name}</h4>
                        </a>
                        <p style={{ width: '223px' }}>{item.formatted_address != null ? item.formatted_address : item.vicinity}</p>
                        <p>{item.distance} Km away</p>
                        <p>{parse(this.HTMLRatingByPlaceId(item.place_id))}</p>
                      </div>
                    </div>
                  )}


                    {/* <div className="d-table">
                    <div className="d-table-cell desc-cell">
                      <h4>Foxtail Coffee - Winter Park</h4>
                      <p>1282 N Orange Avenue Winter Park, FL 32789</p>
                      <p>0.5 miles away</p>
                      <div className="star-ratings">
                        <img alt="rating" src="images/full cup.png" />
                        <img alt="rating" src="images/full cup.png" />
                        <img alt="rating" src="images/full cup.png" />
                        <img alt="rating" src="images/full cup.png" />
                        <img alt="rating" src="images/empty cup.png" />
                      </div>
                    </div>
                  </div> */}

                  </div>
                </div>
              </div>

              <div className="col-lg-5 hidden-md">

                {(abp.utils.getCookieValue(AppConsts.User.UserId) != null) ? <NewsFeeds {...this.props} /> : <NewsFeedsWithOutLogin {...this.props} />}

              </div>
              {/* <NewsFeeds {...this.props} /> */}

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


  }
}

//export default Register;

export default Form.create()(SearchResult);