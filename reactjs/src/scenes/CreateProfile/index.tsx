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
import rules from './index.validation';
import { GetDrinkLogPrefrences } from 'src/services/user/dto/GetDrinkLogPrefrences';
import NewsFeeds from 'src/components/NewsFeeds';


export interface ICreateProfileProps extends FormComponentProps, searchUserInput, RouteComponentProps {
  userStore: UserStore;
}

export interface ICreateProfileState {
  userId: number;
  IsShow: boolean;
  SelectedFile: string | ArrayBuffer | null;
  loading: boolean;
  ImageName: string | null;
  DrinkLogPreferenceResult: GetDrinkLogPrefrences[];
  isChecked: boolean;
}

//  const confirm = Modal.confirm;
//  const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class CreateProfile extends AppComponentBase<ICreateProfileProps, ICreateProfileState, searchUserInput> {
  formRef: any;
  searchUserInput: searchUserInput;
  searchkey: string | null;
  placeid: string | null;
  // BeanOptionsResult: getBeanOptions[];
  ImageFile: ImageFile;
  UserProfile: CreateOrUpdateUserInput;

  state = {
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
    isChecked: false,
  };
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
    if (abp.utils.getCookieValue(AppConsts.User.UserId) != null) {
      await this.LoadUser({ id: Number(abp.utils.getCookieValue(AppConsts.User.UserId)) });
      this.state.userId = Number(abp.utils.getCookieValue(AppConsts.User.UserId));
      await this.props.userStore.GetDrinkOption();

      this.forceUpdate();
      this.InitialdrinkPreferenceValue(this.UserProfile.drinkPreferenceId)
      this.InitialdrinkLogPreferenceValue(this.UserProfile.drinkLogPreferenceId)
     // $('#ImageIDToDisplay').attr('src', "data:image/" + this.UserProfile.userImageType + ";base64," + this.UserProfile.userImage);
      
      $('#ImageIDToDisplay').attr('src', AppConsts.remoteServiceBaseUrl + "ProfileImages/" + this.UserProfile.userImageName);      


      //$('#ImageIDToDisplayProfile').attr('src', "data:image/" + this.UserProfile.userImageType + ";base64," + this.UserProfile.userImage);

     // this.state.SelectedFile = "data:image/" + this.UserProfile.userImageType + ";base64," + this.UserProfile.userImage;
      //this.state.ImageName = this.UserProfile.ImageName ? this.UserProfile.ImageName : '';
      this.setState({ isChecked: this.UserProfile.isPrivate })
    }
  }

  handleCreate = async (e: any) => {
    e.preventDefault();
    await this.props.form.validateFields(async (err: any, values: any) => {
      if (err) {
        return;
      } else {
        if (this.state.userId == 0) {

          await this.props.userStore.create(values);

        } else {
      
          var drinkPreferenceId = $("#drinkPreferenceId").val()
          var drinkLogPreferenceId = $("#drinkLogPreferenceId").val()

          //var result = await this.props.userStore.AddRating(values,DrinkOptionId,BeanTypeId,MilkTypeId,RoasterTypeId,this.placeid);
          var id = this.state.userId;

          await this.props.userStore.update(values, drinkPreferenceId, drinkLogPreferenceId, id, this.state.SelectedFile, this.state.ImageName, this.state.isChecked);

          this.props.history.push("/viewprofile");
        }
      }
    });
  };


  // Drink

  ShowDrinkTags() {
    $("#dvDrinkShowTags").css("display", "block");
    $("#TextLineDrinkShowTags").css("display", "none");
  }
  SelectDrinkTags = (e) => {
   
    var CurrentanchorId = e.target.id
    var Achildrens = $("#" + CurrentanchorId);
    var DrinkOptionId = Achildrens[0].attributes[1].value;
    console.log(DrinkOptionId);
    var childrens = $("#dvDrinkShowTags").children();
    var isclass = $("#" + CurrentanchorId).hasClass('active');
    if (isclass) {
      $("#" + CurrentanchorId).removeClass('active')
      childrens.each(function (index, value) {

        $("#DrinkanchorId" + index).removeAttr("style");
      });
    }
    else {
      childrens.each(function (index, value) {

        if (CurrentanchorId == ("DrinkanchorId" + index)) {
          $("#DrinkanchorId" + index).addClass("active");
        } else {

          $("#DrinkanchorId" + index).css("display", "none");
        }
      });
    }

    console.log(childrens);

    $("#drinkPreferenceId").val(DrinkOptionId);
  }
  // end

  InitialdrinkPreferenceValue(Id: any) {
    $("#drinkPreferenceId").val(Id);
    $("#dvDrinkShowTags").css("display", "block");
    $("#TextLineDrinkShowTags").css("display", "none");
    var childrens = $("#dvDrinkShowTags").children();
    childrens.each(function (index, value) {
      var GetItem = $("#DrinkanchorId" + index);
      var DrinkOptionId = GetItem[0].attributes[1].value
      if (DrinkOptionId == Id) {
        $("#DrinkanchorId" + index).removeAttr("style");
        $("#DrinkanchorId" + index).addClass("active");
      } else {
        $("#DrinkanchorId" + index).removeAttr("style");
      }
    });
  }

  // Milk
  ShowLogPreferenceTags() {
    $("#dvMilkShowTags").css("display", "block");
    $("#TextLineMilkShowTags").css("display", "none");
  }
  SelectLogPreferenceTags = (e) => {
    debugger;

    var CurrentanchorId = e.target.id
    var Achildrens = $("#" + CurrentanchorId);
    var MilkOptionId = Achildrens[0].attributes[1].value;
    console.log(MilkOptionId);
    var childrens = $("#dvMilkShowTags").children();
    var isclass = $("#" + CurrentanchorId).hasClass('active');
    if (isclass) {
      $("#" + CurrentanchorId).removeClass('active')
      childrens.each(function (index, value) {

        $("#MilkanchorId" + index).removeAttr("style");
      });
    }
    else {

      childrens.each(function (index, value) {
        if (CurrentanchorId == ("MilkanchorId" + index)) {
          $("#MilkanchorId" + index).addClass("active");
        } else {
          $("#MilkanchorId" + index).css("display", "none");
        }
      });
    }
    $("#drinkLogPreferenceId").val(MilkOptionId);
  }

  InitialdrinkLogPreferenceValue(Id: any) {
    $("#drinkLogPreferenceId").val(Id);
    $("#dvMilkShowTags").css("display", "block");
    $("#TextLineMilkShowTags").css("display", "none");
    var childrens = $("#dvMilkShowTags").children();
    childrens.each(function (index, value) {
      var GetItem = $("#MilkanchorId" + index);
      var DrinkOptionId = GetItem[0].attributes[1].value
      if (DrinkOptionId == Id) {
        $("#MilkanchorId" + index).removeAttr("style");
        $("#MilkanchorId" + index).addClass("active");
      } else {
        $("#MilkanchorId" + index).removeAttr("style");
      }
    });
  }
  // end


  public async LoadUser(entityDto: EntityDto) {
    this.UserProfile = await this.props.userStore.get(entityDto);
    return this.UserProfile;
  }

  FileSelectedHandler = event => {

    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    this.state.ImageName = event.target.files[0].name;

    //reader.readAsBinaryString(file);

    if (file && (file.type.includes('jpeg') || file.type.includes('png'))) {
      reader.onprogress = (event) => {
        this.setState({ loading: true });
      };

      reader.onloadend = (event) => {
        var base64 = reader.result as string;
        this.state.SelectedFile = base64 as string;
        $('#ImageIDToDisplay').attr('src', reader.result as string);

      };
    }
  }
  // UploadFileHandler = async (e: any)  =>{
  //    var myObject = {} as ImageFile;
  //    myObject.ImageData = this.state.SelectedFile;
  //    myObject.placeId = this.getParameterByName('placeid', window.location.href);
  //    myObject.ImageName = this.state.ImageName;

  //  // var result = await this.props.userStore.UploadPhoto(myObject);
  //   //alert(result);
  // }

  toggleChange = async (e: any) => {
    this.setState({
      isChecked: !this.state.isChecked // flip boolean value
    })
  }

  Temporaray() {

  }

  render() {

    const { getFieldDecorator } = this.props.form;

    if (!this.UserProfile || !this.props.userStore.DrinkOptionsResult || !this.state.DrinkLogPreferenceResult) {
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
                  <div className="heading">
                    <h2>Edit Profile</h2>
                  </div>
                  <div className="add_photo text-center">

                    <input ref={fileInput => this.fileInput = fileInput} type="file" style={{ display: 'none' }} onChange={this.FileSelectedHandler} />

                    <a onClick={() => this.fileInput ? this.fileInput.click() : this.Temporaray()}>
                      <img id="ImageIDToDisplay" src="images/profile_img1.jpg" alt="image" />
                      <span>add Photo</span>
                    </a>

                    {/* ref={fileInput => this.fileInput = fileInput }  */}

                  </div>
                  <div className="tab_contentarea rating_form add_photo_detail">
                    <form className="web-form" onSubmit={this.handleCreate} method="Post">
                      <div className="form-group">
                        <label>Username:</label>
                        {getFieldDecorator('userName', { rules: rules.userName, initialValue: this.UserProfile.userName })(
                          <input type="text" placeholder="" className="form-control" />
                        )}
                      </div>
                      <div className="form-group">
                        <label>Email:</label>
                        {getFieldDecorator('emailAddress', { rules: rules.emailAddress, initialValue: this.UserProfile.emailAddress })(
                          <input type="text" placeholder="" className="form-control" />
                        )}
                      </div>
                      <div className="form-group">
                        <label>Name:</label>
                        {getFieldDecorator('name', { initialValue: this.UserProfile.name })(
                          <input type="text" placeholder="" className="form-control" />
                        )}
                      </div>
                      <div className="form-group">
                        <label>Sur Name:</label>
                        {getFieldDecorator('surname', { initialValue: this.UserProfile.surname })(
                          <input type="text" placeholder="" className="form-control" />
                        )}
                      </div>
                      <div className="form-group">
                        <label>Password:</label>
                        {getFieldDecorator('password')(
                          <input type="text" placeholder="Enter password if you want to change it" className="form-control" />
                        )}
                      </div>
                      <div className="form-group">
                        <label>Confirm Password: </label>
                        <input type="password" className="form-control" />
                      </div>
                      {/* <div className="form-group">
                        <label>Rating:</label>
                        {getFieldDecorator('password', { initialValue : this.UserProfile.password})(
                      <input type="text" placeholder="" className="form-control" />
                      )}
                      </div> */}

                      <div className="form-group textarea_1">
                        <label>Referral Code:</label>
                        {getFieldDecorator('referrelCode', { initialValue: this.UserProfile.referrelCode })(
                          <input type="text" placeholder="" className="form-control" />
                        )}
                      </div>
                      <div className="form-group">
                        <label>Drink Preference:</label>
                        {/* <div className="select_Arrow">
                      <select>
                        <option>Select</option>
                        <option>AeroPress</option>
                        <option>Cortado (Gibraltar)</option>
                        <option>Doppio</option>
                        <option>Espresso Macchiato</option>
                        <option>Espresso Romano</option>
                        <option>Flat White</option>
                        <option>Lungo</option>
                        <option>Ristretto</option>
                      </select>
                    </div> */}
                        <input readOnly id="TextLineDrinkShowTags" onClick={this.ShowDrinkTags} type="text" placeholder="" className="form-control" />
                        <div id="dvDrinkShowTags" style={{ display: 'none' }} className="rate_select">
                          {this.props.userStore.DrinkOptionsResult.map((item, key) =>
                            <a id={"DrinkanchorId" + key} onClick={this.SelectDrinkTags} itemID={item.id.toString()}> {item.name}
                            </a>
                          )}
                        </div>
                        {getFieldDecorator('drinkPreferenceId')(
                          <input type="text" style={{ display: 'none' }} className="form-control" />
                        )}

                      </div>
                      <div className="form-group">
                        <label>My Drink Log Preference:</label>
                        {/* <div className="select_Arrow">
                      <select>
                        <option>Select</option>
                        <option>Blend</option>
                        <option>Single Origin</option>
                      </select>
                    </div> */}
                        <input readOnly id="TextLineMilkShowTags" onClick={this.ShowLogPreferenceTags} type="text" placeholder="" className="form-control" />
                        <div id="dvMilkShowTags" style={{ display: 'none' }} className="rate_select">
                          {this.state.DrinkLogPreferenceResult.map((item, key) =>
                            <a id={"MilkanchorId" + key} onClick={this.SelectLogPreferenceTags} itemID={item.id.toString()}> {item.name}
                            </a>
                          )}
                        </div>
                        {getFieldDecorator('drinkLogPreferenceId')(
                          <input type="text" style={{ display: 'none' }} className="form-control" />
                        )}
                      </div>
                      <div className="form-group check_box">                         
                        <input type="checkbox" checked={this.state.isChecked} onChange={this.toggleChange} id="idcheckbox" />
                        <label htmlFor="idcheckbox">IsPrivate</label>
                      </div>
                      {/* <input id="UserImageID" type="hidden" /> */}

                      <div className="form-group text-center">
                        <button className="btn-web m-t10 m-b70">save</button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="col-lg-5 hidden-md">
                  <NewsFeeds {...this.props} />
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


  }
}

//export default Register;

export default Form.create()(CreateProfile);