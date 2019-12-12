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
import { CreateRating } from 'src/services/user/dto/CreateRating';
//import Parser from 'html-react-parser';
import fullcup from "src/Content/images/full cup.png";
import emptycup from "src/Content/images/emptycup.png";


import parse from 'html-react-parser';

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
  friendsHtml : string;
  everyOneHtml : string;
  myLogsHtml : string;
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
    everyOneHtml : '',
    myLogsHtml : '',
  };

  state = this.Initialstate;

  
  //  async filter(arr: import("../../../../../../../Tanseef/4.6.0_27-10-2019/4.6.0/reactjs/src/services/user/dto/CreateRating").CreateRating[], callback: { (num: any): Promise<boolean>; (arg0: any): void; }) {
  //   const fail = Symbol()
  //   return (await Promise.all(arr.map(async (item: any) => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
  // };

  // async doAsyncStuff() {
  //   return Promise.resolve()
  // };


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
      debugger;
      new Promise<string>((resolve, reject) => {     
         // Every one

         this.props.userStore.users.items.map( async item => {    

          var rating = await this.props.userStore.ratings!.filter((x: CreateRating) => x.userId == item.id);
          // var rating = await this.filter(this.props.userStore.ratings, async (num: { userId: number; }) => {
          //   debugger;
          //   await this.doAsyncStuff()
          //   return num.userId == item.id;
          // })
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

        // my friends
        
       this.props.userStore.MyFriendsUser!.map( async item => {    
          var rating = await this.props.userStore.ratings!.filter((x: CreateRating) => x.userId == item.id);
          // var rating = await this.filter(this.props.userStore.ratings, async (num: { userId: number; }) => {
          //   debugger;
          //   await this.doAsyncStuff()
          //   return num.userId == item.id;
          // })
          debugger;
          if (rating[0] != undefined) {
  
            this.state.friendsHtml +=  '<div class="d-table">'+
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
                  '<p>'+ rating[0].testingNotes+'<a class="readmore">…read more</a></p>' +
                  '</div>' +
                '</div>' ;                 
          }
          this.setState({ friendsHtml: this.state.friendsHtml  })
        })



        // My Logs
        this.props.userStore.ratings!.map( async item => {    
          var rating = await this.props.userStore.ratings!.filter((x: CreateRating) => x.userId == Number(abp.utils.getCookieValue(AppConsts.User.UserId)));
          // var rating = await this.filter(this.props.userStore.ratings, async (num: { userId: number; }) => {
          //   debugger;
          //   await this.doAsyncStuff()
          //   return num.userId == item.id;
          // })
          debugger;
          if (item.userId == Number(abp.utils.getCookieValue(AppConsts.User.UserId))) {
  
            this.state.myLogsHtml +=  '<div class="d-table">'+
                '<div class="d-table-cell content-cell">'+
                  // '<img alt="" src="images/LoggedOut_Profile.png" />'+
                  // '<p class="font-weight-bold">' + item.name +'</p>'+
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
          this.setState({ myLogsHtml: this.state.myLogsHtml  })
        })
       
      });
    }
    else  // for 
    {
      alert('hi')
      debugger;
      if (this.props.userStore.ratings == undefined) {
        await this.props.userStore.GetAllRatings({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
      }
      if (this.props.userStore.users == undefined) {
        await this.props.userStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
      }
      new Promise<string>((resolve, reject) => {     
         // Every one

         this.props.userStore.users.items.map( async item => {    

          var rating = await this.props.userStore.ratings!.filter((x: CreateRating) => x.userId == item.id);
          // var rating = await this.filter(this.props.userStore.ratings, async (num: { userId: number; }) => {
          //   debugger;
          //   await this.doAsyncStuff()
          //   return num.userId == item.id;
          // })
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
    //this.forceUpdate();    
  }


 render() {
    if (!this.props.userStore.MyFriendsUser) {
    
      return (
        <div>
        </div>)
    } else {      
      return (
      
          <div className="col-lg-5 hidden-md">
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
          </div>
       
      );

    }
  }
}

export default NewsFeeds;
