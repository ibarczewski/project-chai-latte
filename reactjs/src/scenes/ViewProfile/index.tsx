/// <reference types="@types/googlemaps" />
import * as React from 'react';
import { Form } from 'antd';
import AppComponentBase from 'src/components/AppComponentBase';
import Stores from 'src/stores/storeIdentifier';
import UserStore from 'src/stores/userStore';
import { observer, inject } from 'mobx-react';
import { FormComponentProps } from 'antd/lib/form';
import { searchUserInput } from 'src/services/user/dto/searchUserInput';
import { RouteComponentProps } from 'react-router-dom';
import { ImageFile } from 'src/services/user/dto/ImageFile';
//import { any } from 'prop-types';
import * as $ from "jquery"
import { EntityDto } from 'src/services/dto/entityDto';
import { CreateOrUpdateUserInput } from 'src/services/user/dto/createOrUpdateUserInput';
import AppConsts from 'src/lib/appconst';
//import rules from './index.validation';
import EmptyCup from "src/Content/images/emptycup.png";
import follow from "src/Content/images/follow.svg"
import following from "src/Content/images/stop-following.svg"
import NewsFeeds from 'src/components/NewsFeeds';

import { GetDrinkLogPrefrences } from 'src/services/user/dto/GetDrinkLogPrefrences';
import { GetUserRelationshipInput } from 'src/services/user/dto/GetUserRelationshipInput';


//import { Redirect } from 'react-router-dom';


export interface IViewProfileProps extends FormComponentProps, searchUserInput, RouteComponentProps {
  userStore: UserStore;
}

export interface IViewProfileState {
  userId: number;
  IsShow: boolean;
  SelectedFile: string | ArrayBuffer | null;
  loading: boolean;
  ImageName: string | null;
  DrinkPreference: string | null;
  DrinkLogPreference: string | null;
  DrinkLogPreferenceResult: GetDrinkLogPrefrences[];
  maxResultCount: number;
  skipCount: number;
  filter: string;
  IsMyProfile: boolean;
  IsFriend: boolean;
  IsPrivate: boolean;


}

//  const confirm = Modal.confirm;
//  const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class ViewProfile extends AppComponentBase<IViewProfileProps, IViewProfileState, searchUserInput> {
  formRef: any;
  searchUserInput: searchUserInput;
  searchkey: string | null;
  placeid: string | null;
  //BeanOptionsResult: getBeanOptions[];
  ImageFile: ImageFile;
  UserProfile: CreateOrUpdateUserInput;

  UserProfileTest: CreateOrUpdateUserInput[];



  Initialstate = {
    userId: 0,
    IsShow: true,
    SelectedFile: '',
    loading: false,
    ImageName: '',
    DrinkLogPreferenceResult: [
      {
        "name": "Blend",
        "id": 1
      },
      {
        "name": "Single Origin",
        "id": 2
      }
    ],
    DrinkLogPreference: '',
    DrinkPreference: '',
    maxResultCount: 10,
    skipCount: 0,
    filter: '',
    IsMyProfile: false,
    IsFriend: false,
    IsPrivate: false,

  };

  state = this.Initialstate;

  fileInput: any;
  //fileInput: HTMLInputElement | null;

  getParameterByName(name, url) {

    // if (!url) url = window.location.href="#";
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  async componentWillMount() {
    this.LoadProfile();
  }

  SendFollowRequest = async (e: any) => {
    console.log(this.state.userId);
    var myObject = {} as GetUserRelationshipInput;
    myObject.UserId = Number(abp.utils.getCookieValue(AppConsts.User.UserId));
    myObject.followerId = this.state.userId;
    this.props.userStore.SendFollowRequest(myObject);
    this.props.history.push("/viewprofile");

  }

  SendUnFollowRequest = async (e: any) => {
    var myObject = {} as GetUserRelationshipInput;
    myObject.UserId = Number(abp.utils.getCookieValue(AppConsts.User.UserId));
    myObject.followerId = this.state.userId;
    this.props.userStore.SendUnFollowRequest(myObject);
    this.props.history.push("/viewprofile");

  }

  async LoadProfile() {
    this.state.userId = Number(this.getParameterByName('UserId', window.location.href));
    this.setState({ userId: this.state.userId })
    if (this.props.userStore.users == undefined) {
      await this.props.userStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
    }

    // if (this.props.userStore.users == null || this.props.userStore.users == undefined) {
    //   await this.props.userStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
    // }
    await this.props.userStore.GetDrinkOption();

    if ((this.state.userId == 0) || (abp.utils.getCookieValue(AppConsts.User.UserId) != null && (Number(abp.utils.getCookieValue(AppConsts.User.UserId)) == this.state.userId))) {
      this.setState({ IsMyProfile: true });

      //temporary
      //await this.LoadUser({ id: Number(abp.utils.getCookieValue(AppConsts.User.UserId)) });
      debugger;
      this.UserProfileTest = this.props.userStore.users.items.filter((x: CreateOrUpdateUserInput) => x.id == Number(abp.utils.getCookieValue(AppConsts.User.UserId)));
      this.UserProfile = this.UserProfileTest[0];


      this.forceUpdate();
      $('#ImageIDToDisplay').attr('src', "data:image/" + this.UserProfile.userImageType + ";base64," + this.UserProfile.userImage);
      $('#ImageIDToDisplayProfile').attr('src', "data:image/" + this.UserProfile.userImageType + ";base64," + this.UserProfile.userImage);

      if (this.state.DrinkLogPreferenceResult != null || this.state.DrinkLogPreferenceResult != undefined) {
        if (this.UserProfile.drinkLogPreferenceId != null && this.UserProfile.drinkLogPreferenceId > 0) {
          this.state.DrinkLogPreference = this.state.DrinkLogPreferenceResult.find(x => x.id === this.UserProfile.drinkLogPreferenceId)!.name;
          this.setState({ DrinkLogPreference: this.state.DrinkLogPreference });
        } else {
          this.setState({ DrinkPreference: '' });
        }
      }
      debugger;
      if (this.props.userStore.DrinkOptionsResult != null || this.props.userStore.DrinkOptionsResult != undefined) {
        if (this.UserProfile.drinkPreferenceId != null && this.UserProfile.drinkPreferenceId > 0) {
          this.state.DrinkPreference = this.props.userStore.DrinkOptionsResult.find(x => x.id === this.UserProfile.drinkPreferenceId)!.name;
          this.setState({ DrinkPreference: this.state.DrinkPreference });
        } else {
          this.setState({ DrinkPreference: '' });
        }
      }

    }
    else if (this.state.userId > 0) {

      this.setState({ userId: this.state.userId })
      var myObject = {} as GetUserRelationshipInput;
      myObject.UserId = Number(abp.utils.getCookieValue(AppConsts.User.UserId));
      myObject.followerId = this.state.userId;
      var result = await this.props.userStore.IsFriendbyUserIdAndFollowId(myObject);
      this.setState({ IsFriend: result });

      //await this.LoadUser({ id: this.state.userId });
      this.UserProfileTest = this.props.userStore.users.items.filter((x: CreateOrUpdateUserInput) => x.id == this.state.userId);
      this.UserProfile = this.UserProfileTest[0];
      this.forceUpdate();

      $('#ImageIDToDisplay').attr('src', "data:image/" + this.UserProfile.userImageType + ";base64," + this.UserProfile.userImage);
      $('#ImageIDToDisplayProfile').attr('src', "data:image/" + this.UserProfile.userImageType + ";base64," + this.UserProfile.userImage);

      this.setState({ IsPrivate: this.UserProfile.isPrivate });
      //    if (this.state.DrinkLogPreferenceResult != null ||this.state.DrinkLogPreferenceResult != undefined) 
      //    {    
      //     this.state.DrinkLogPreference = this.state.DrinkLogPreferenceResult.find(x => x.id === this.UserProfile.drinkLogPreferenceId)!.name ;
      //     this.setState({ DrinkLogPreference: this.state.DrinkLogPreference  });
      //    } 



      if (this.props.userStore.DrinkOptionsResult != null || this.props.userStore.DrinkOptionsResult != undefined) {
        if (this.UserProfile.drinkPreferenceId != null && this.UserProfile.drinkPreferenceId > 0) {
          this.state.DrinkPreference = this.props.userStore.DrinkOptionsResult.find(x => x.id === this.UserProfile.drinkPreferenceId)!.name;
          this.setState({ DrinkPreference: this.state.DrinkPreference });
        } else {
          this.setState({ DrinkPreference: '' });
        }
      }
    }

  }


  public async LoadUser(entityDto: EntityDto) {
    this.UserProfile = await this.props.userStore.get(entityDto);
    return this.UserProfile;
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.props.location.search !== prevProps.location.search) {
      this.setState(this.Initialstate);
      this.componentWillMount();
    }
  }


  render() {

    const { getFieldDecorator } = this.props.form;

    // if(abp.utils.getCookieValue(AppConsts.User.UserId) == null)   {     
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: '/Desktop_Login',
    //         state: { from: this.props.location },
    //       }}
    //     />

    //     //alert('You can not open this page without login')
    //   );
    // }


    if (!this.UserProfile) {
      return (
        <div>
        </div>)
    } else
      return (


        <div>

          <main id="main">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-7 col-md-12 col-sm-12">
                  <div className="heading clearfix">
                    <h2 className="float-left">My Profile</h2>
                    {/* <a href="#" class="float-right"><img src="images/follow.svg" alt="image"> Follow</a> */}
                    {this.state.IsMyProfile == true ? <a onClick={() => this.props.history.push("/CreateProfile")} className="float-right">edit</a>
                      : this.state.IsFriend ? <a onClick={this.SendUnFollowRequest} className="float-right"> <img src={following} alt="image"></img>Stop following</a>
                        : <a onClick={this.SendFollowRequest} itemID="hi" className="float-right"> <img src={follow} alt="image"></img>Follow</a>}
                    {/* <a onClick={() =>this.props.history.push("/CreateProfile")} className="float-right">edit</a> */}
                  </div>
                  <div className="add_photo text-center">
                    <a>
                      <img id="ImageIDToDisplay" alt="image" />
                      {/* <span>add Photo</span> */}
                    </a>
                  </div>
                  <div className="tab_contentarea rating_form add_photo_detail">
                    <form className="web-form" id="view_profile">
                      <div className="form-group">
                        <label>Username:</label>
                        {getFieldDecorator('userName', { initialValue: this.UserProfile.userName })(
                          <input type="text" readOnly placeholder="" className="form-control" />
                        )}
                      </div>

                      {/* <div className="form-group">
                    <label>Email:</label>
                    {getFieldDecorator('emailAddress', { initialValue : this.UserProfile.emailAddress})(
                      <input type="text" readOnly placeholder="" className="form-control" />
                      )}
                  </div> */}

                      {this.state.IsMyProfile == true ?
                        <div className="form-group">
                          <label>Email:</label>
                          {getFieldDecorator('emailAddress', { initialValue: this.UserProfile.emailAddress })(
                            <input type="text" readOnly placeholder="" className="form-control" />
                          )}
                        </div>
                        : ''}

                      {this.state.IsPrivate == false ?
                        <div className="form-group">
                          <label>Name:</label>
                          {getFieldDecorator('name', { initialValue: this.UserProfile.name })(
                            <input type="text" readOnly placeholder="" className="form-control" />
                          )}
                        </div>
                        : 'This user has set their profile to private.'}


                      {this.state.IsPrivate == false ?
                        <div className="form-group">
                          <label>Drink Preference:</label>
                          <input type="text" readOnly value={this.state.DrinkPreference} placeholder="" className="form-control" />
                        </div>
                        : ''}


                      {this.state.IsMyProfile == true ?
                        <div className="form-group">
                          <label>My Drink Log Preference:</label>
                          <input type="text" readOnly value={this.state.DrinkLogPreference} placeholder="" className="form-control" />
                        </div>
                        : ''}

                      {this.state.IsPrivate == false ?
                        <div className="form-group">
                          <div className="d-table-cell desc-cell list_icons">
                            <p><img src={EmptyCup} alt="image" /> view my drink log</p>
                            <label>My Friends:</label>
                          </div>
                          <ul className="tab-tag">
                            {this.props.userStore.users.items.map((item, key) =>
                              <li>
                                {/* <a id={"UseranchorId" + key} href="#" onClick={() => this.props.history.push("/ViewProfile/?UserId="+ item.id,null)} itemID={item.id.toString()}> {item.name}
          </a> */}
                                <a id={"UseranchorId" + key} onClick={() => this.props.history.push("/ViewProfile/?UserId=" + item.id)} itemID={item.id.toString()}> {item.name}
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                        : ''}
                      {/* href={"/#/ViewProfile/?UserId=" + item.id} */}
                    </form>
                  </div>
                </div>

                <NewsFeeds {...this.props} />

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

export default Form.create()(ViewProfile);