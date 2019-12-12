/// <reference types="@types/googlemaps" />
import * as React from 'react';
//import { Form, Input, Checkbox, Modal, Tabs } from 'antd';
import { Form } from 'antd';
import * as $ from "jquery"
import AppComponentBase from 'src/components/AppComponentBase';
import Stores from 'src/stores/storeIdentifier';
import UserStore from 'src/stores/userStore';
import { observer, inject } from 'mobx-react';
import { FormComponentProps } from 'antd/lib/form';
//import { GetSearchOutputResults } from 'src/services/user/dto/SearchOutputResult';
import { searchUserInput } from 'src/services/user/dto/searchUserInput';
import { RouteComponentProps } from 'react-router-dom';
import { getMilkOptions } from 'src/services/user/dto/getMilkOptions';
import { getRoasterOptions } from 'src/services/user/dto/getRoasterOptions';
import AppConsts from 'src/lib/appconst';
import NewsFeeds from 'src/components/NewsFeeds';

export interface IRatingProps extends FormComponentProps, searchUserInput, RouteComponentProps {
  userStore: UserStore;
}

export interface IRatingState {
  userId: number;
  IsShow: boolean;
  DrinkOptionId: string;
  MilkOptionsResult: getMilkOptions[];
  RoasterOptionsResult: getRoasterOptions[];

}

//  const confirm = Modal.confirm;
//  const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class Rating extends AppComponentBase<IRatingProps, IRatingState, searchUserInput> {
  formRef: any;
  searchUserInput: searchUserInput;
  searchkey: string | null;
  placeid: string | null;
  //BeanOptionsResult: getBeanOptions[];

  state = {
    userId: 0,
    IsShow: true,
    DrinkOptionId: "",
    MilkOptionsResult: [
      {
        "name": "Half and Half",
        "id": 1
      },
      {
        "name": "House Vegan Milk",
        "id": 2
      },
      {
        "name": "Non-Fat",
        "id": 3
      },
      {
        "name": "Oat Milk",
        "id": 4
      },
      {
        "name": "Whole Fat",
        "id": 5
      }
    ],
    RoasterOptionsResult: [
      {
        "name": "Darker",
        "id": 1
      },
      {
        "name": "Dark Roast",
        "id": 2
      },
      {
        "name": "Medium Roast",
        "id": 3
      },
      {
        "name": "Light Roast",
        "id": 4
      }
    ]
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

  async componentDidMount() {
    this.searchkey = this.getParameterByName('searchkey', window.location.href);
    var myObject = {} as searchUserInput;
    myObject.searchText = this.searchkey;

    await this.props.userStore.GetDrinkOption();
    await this.props.userStore.GetBeanOption();

    this.forceUpdate();
  }


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
    $("#DrinkOptionId").val(DrinkOptionId);
  }
  // end

  // Bean
  ShowBeanTags() {
    $("#dvBeanShowTags").css("display", "block");
    $("#TextLineBeanShowTags").css("display", "none");
  }
  SelectBeanTags = (e) => {

    var CurrentanchorId = e.target.id
    var Achildrens = $("#" + CurrentanchorId);
    var DrinkOptionId = Achildrens[0].attributes[1].value;
    console.log(DrinkOptionId);
    var childrens = $("#dvBeanShowTags").children();
    var isclass = $("#" + CurrentanchorId).hasClass('active');
    if (isclass) {
      $("#" + CurrentanchorId).removeClass('active')
      childrens.each(function (index, value) {

        $("#BeananchorId" + index).removeAttr("style");
      });
    }
    else {

      childrens.each(function (index, value) {
        if (CurrentanchorId == ("BeananchorId" + index)) {
          $("#BeananchorId" + index).addClass("active");
        } else {
          $("#BeananchorId" + index).css("display", "none");
        }
      });
    }
    $("#BeanTypeId").val(DrinkOptionId);
  }
  // end

  // Milk
  ShowMilkTags() {
    $("#dvMilkShowTags").css("display", "block");
    $("#TextLineMilkShowTags").css("display", "none");
  }
  SelectMilkTags = (e) => {

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
    $("#MilkTypeId").val(MilkOptionId);
  }
  // end


  // Roaster
  ShowRoasterTags() {
    $("#dvRoasterShowTags").css("display", "block");
    $("#TextLineRoasterShowTags").css("display", "none");
  }
  SelectRoasterTags = (e) => {

    var CurrentanchorId = e.target.id
    var Achildrens = $("#" + CurrentanchorId);
    var RoasterOptionId = Achildrens[0].attributes[1].value;
    console.log(RoasterOptionId);
    var childrens = $("#dvRoasterShowTags").children();
    var isclass = $("#" + CurrentanchorId).hasClass('active');
    if (isclass) {
      $("#" + CurrentanchorId).removeClass('active')
      childrens.each(function (index, value) {

        $("#RoasteranchorId" + index).removeAttr("style");
      });
    }
    else {

      childrens.each(function (index, value) {
        if (CurrentanchorId == ("RoasteranchorId" + index)) {
          $("#RoasteranchorId" + index).addClass("active");
        } else {
          $("#RoasteranchorId" + index).css("display", "none");
        }
      });
    }
    $("#RoasterTypeId").val(RoasterOptionId);
  }
  // end


  handleSubmit = async (e: any) => {
    e.preventDefault();


    await this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {


        this.placeid = this.getParameterByName('placeid', window.location.href);
        var result = await this.props.userStore.IsRatingExistByPlace(values, this.placeid,Number(abp.utils.getCookieValue(AppConsts.User.UserId)));
        if (result != undefined && result != null) {
          if (result.id > 0) {
            var DrinkOptionId = $("#DrinkOptionId").val()
            var BeanTypeId = $("#BeanTypeId").val()
            var MilkTypeId = $("#MilkTypeId").val()
            var RoasterTypeId = $("#RoasterTypeId").val()

           var AddMoreRatingResult = await this.props.userStore.AddMoreRating(values, DrinkOptionId, BeanTypeId, MilkTypeId, RoasterTypeId, this.placeid);

            var IsMoveToChangeRatingResult = await this.props.userStore.IsMoveToChangeRatingScreen(values, this.placeid,Number(abp.utils.getCookieValue(AppConsts.User.UserId)),DrinkOptionId, BeanTypeId);

            if(IsMoveToChangeRatingResult == true){
              this.props.history.push("/ChangeRating?placeid=" + this.placeid+ "?Ratingid=" + AddMoreRatingResult.id+ "?DrinkOptionId=" + DrinkOptionId+ "?BeanTypeId=" + BeanTypeId);
            }else{
              this.props.history.push("/AnotherRating?placeid=" + this.placeid);
            }              
          } else {
            var DrinkOptionId = $("#DrinkOptionId").val()
            var BeanTypeId = $("#BeanTypeId").val()
            var MilkTypeId = $("#MilkTypeId").val()
            var RoasterTypeId = $("#RoasterTypeId").val()

            await this.props.userStore.AddRating(values, DrinkOptionId, BeanTypeId, MilkTypeId, RoasterTypeId, this.placeid);

            this.props.history.push("/AnotherRating?placeid=" + this.placeid);
          }
        }


      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    if (!this.props.userStore.DrinkOptionsResult || !this.props.userStore.BeanOptionsResult) {
      return (
        <div>
        </div>)
    } else {
      return (


        <div>

          <main id="main">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-7 col-md-12 col-sm-12">
                  <div className="heading">
                    <h2>Foxtail Farmhouse - Winter Park</h2>
                    <h2>Rate a bean</h2>
                  </div>
                  <div className="tab_contentarea rating_form">
                    <form className="web-form" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label>Drink:</label>
                        <input readOnly id="TextLineDrinkShowTags" onClick={this.ShowDrinkTags} type="text" placeholder="" className="form-control" />
                        <div id="dvDrinkShowTags" style={{ display: 'none' }} className="rate_select">
                          {this.props.userStore.DrinkOptionsResult.map((item, key) =>
                            <a id={"DrinkanchorId" + key} onClick={this.SelectDrinkTags} itemID={item.id.toString()}> {item.name}
                            </a>
                          )}
                          </div>
                          {getFieldDecorator('DrinkOptionId')(
                            <input type="text" style={{ display: 'none' }} className="form-control" />
                          )}                        
                      </div>
                      <div className="form-group">
                        <label>Bean Type:</label>

                        <input readOnly id="TextLineBeanShowTags" onClick={this.ShowBeanTags} type="text" placeholder="" className="form-control" />
                        <div id="dvBeanShowTags" style={{ display: 'none' }} className="rate_select">
                          {this.props.userStore.BeanOptionsResult.map((item, key) =>
                            <a id={"BeananchorId" + item.id.toString()} onClick={this.SelectBeanTags} itemID={item.id.toString()}> {item.name}
                            </a>
                          )}
                          {getFieldDecorator('BeanTypeId')(
                            <input type="text" style={{ display: 'none' }} className="form-control" />
                          )}
                        </div>

                      </div>
                      <div className="form-group">
                        <label>Bean:</label>
                        {getFieldDecorator('BeanName')(
                          <input type="text" className="form-control" />
                        )}
                      </div>
                      <div className="form-group">
                        <label>Region:</label>
                        {getFieldDecorator('RegionName')(
                          <input type="text" className="form-control" />
                        )}
                      </div>
                      <div className="form-group">
                        <label>Roaster:</label>
                        {getFieldDecorator('RoasterName')(
                          <input type="text" className="form-control" />
                        )}
                      </div>
                      <div className="form-group">
                        <label>Milk Type:</label>
                        {/* MilkTypeId */}

                        <input readOnly id="TextLineMilkShowTags" onClick={this.ShowMilkTags} type="text" placeholder="" className="form-control" />
                        <div id="dvMilkShowTags" style={{ display: 'none' }} className="rate_select">
                          {this.state.MilkOptionsResult.map((item, key) =>
                            <a id={"MilkanchorId" + item.id.toString()} onClick={this.SelectMilkTags} itemID={item.id.toString()}> {item.name}
                            </a>
                          )}
                          </div>
                          {getFieldDecorator('MilkTypeId')(
                            <input type="text" style={{ display: 'none' }} className="form-control" />
                          )}
                      </div>
                      <div className="form-group">
                        <label>Roast Type:</label>
                        {/* RoasterType */}

                        <input readOnly id="TextLineRoasterShowTags" onClick={this.ShowRoasterTags} type="text" placeholder="" className="form-control" />
                        <div id="dvRoasterShowTags" style={{ display: 'none' }} className="rate_select">
                          {this.state.RoasterOptionsResult.map((item, key) =>
                            <a id={"RoasteranchorId" + item.id.toString()} onClick={this.SelectRoasterTags} itemID={item.id.toString()}> {item.name}
                            </a>
                          )}
                          {getFieldDecorator('RoasterTypeId')(
                            <input type="text" style={{ display: 'none' }} className="form-control" />
                          )}
                        </div>

                      </div>
                      <div className="form-group">
                        <label>Rating:</label>
                        <input type="text" placeholder="" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Barista: </label>
                        {getFieldDecorator('Barista')(
                          <input type="text" className="form-control" />
                        )}
                      </div>
                      <div className="form-group textarea_1">
                        <label>Tasting Notes:</label>
                        {/* <textarea placeholder="" className="form-control" /> */}
                        {getFieldDecorator('TestingNotes')(
                          <input type="text" className="form-control" />
                        )}
                      </div>
                      <div className="form-group text-center">
                        <button type="submit" className="btn-web m-t10 m-b70">submit rating</button>
                      </div>
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
}

//export default Register;

export default Form.create()(Rating);