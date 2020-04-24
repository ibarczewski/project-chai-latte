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

import Defaultcup0 from "src/Content/images/cup-0.png";
import Defaultcup25 from "src/Content/images/cup-25.png";
import Defaultcup50 from "src/Content/images/cup-50.png";
import Defaultcup75 from "src/Content/images/cup-75.png";
import Defaultcup100 from "src/Content/images/cup-100.png";


import cup0 from "src/Content/images/cup-0.png";
import cup25 from "src/Content/images/cup-25.png";
import cup50 from "src/Content/images/cup-50.png";
import cup75 from "src/Content/images/cup-75.png";
import cup100 from "src/Content/images/cup-100.png";


// import cup0 from "src/Content/images/0.png";

// import cup025 from "src/Content/images/0.25.png";

// import cup05 from "src/Content/images/0.5.png";

// import cup075 from "src/Content/images/0.75.png";

// import cup1 from "src/Content/images/1.png";

// import cup125 from "src/Content/images/1.25.png";

// import cup15 from "src/Content/images/1.5.png";

// import cup175 from "src/Content/images/1.75.png";

// import cup2 from "src/Content/images/2.png";

// import cup225 from "src/Content/images/2.25.png";

// import cup25 from "src/Content/images/2.5.png";

// import cup275 from "src/Content/images/2.75.png";

// import cup3 from "src/Content/images/3.png";

// import cup325 from "src/Content/images/3.25.png";

// import cup35 from "src/Content/images/3.5.png";

// import cup375 from "src/Content/images/3.75.png";

// import cup4 from "src/Content/images/4.png";

// import cup425 from "src/Content/images/4.25.png";

// import cup45 from "src/Content/images/4.5.png";

// import cup475 from "src/Content/images/4.75.png";

// import cup5 from "src/Content/images/5.png";






export interface IRatingProps extends FormComponentProps, searchUserInput, RouteComponentProps {
  userStore: UserStore;
}

export interface IRatingState {
  userId: number;
  IsShow: boolean;
  DrinkOptionId: string;
  MilkOptionsResult: getMilkOptions[];
  RoasterOptionsResult: getRoasterOptions[];
  Imagesource: string;
  isShowMilk: boolean;
  // 0: string;
  // 0.25: string;
  // 0.5: string;
  // 0.75: string;
  // 1: string;
  // 1.25: string;
  // 1.5: string;
  // 1.75: string;
  // 2: string;
  // 2.25: string;
  // 2.5: string;
  // 2.75: string;
  // 3: string;
  // 3.25: string;
  // 3.5: string;
  // 3.75: string;
  // 4: string;
  // 4.25: string;
  // 4.5: string;
  // 4.75: string;
  // 5: string;

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
  placename: string | null;
  //BeanOptionsResult: getBeanOptions[];

  state = {
    userId: 0,
    IsShow: true,
    DrinkOptionId: "",
    isShowMilk: false,
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
    ],
    Imagesource: "0",
    // 0: cup0,
    // 0.25: cup025,
    // 0.5: cup05,
    // 0.75: cup075,
    // 1: cup1,
    // 1.25: cup125,
    // 1.5: cup15,
    // 1.75: cup175,
    // 2: cup2,
    // 2.25: cup225,
    // 2.5: cup25,
    // 2.75: cup275,
    // 3: cup3,
    // 3.25: cup325,
    // 3.5: cup35,
    // 3.75: cup375,
    // 4: cup4,
    // 4.25: cup425,
    // 4.5: cup45,
    // 4.75: cup475,
    // 5: cup5,


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
    this.placename = this.getParameterByName('placename', window.location.href);

    this.forceUpdate();
  }


  // Drink 

  ShowDrinkTags() {
    $("#dvDrinkShowTags").css("display", "block");
    $("#TextLineDrinkShowTags").css("display", "none");
  }
  SelectDrinkTags = (e) => {
    debugger;
    var CurrentanchorId = e.target.id
    var Achildrens = $("#" + CurrentanchorId);
    var DrinkOptionId = Achildrens[0].attributes[1].value;
    var isShowMilk = Achildrens[0].attributes[2].value;
    if (isShowMilk == "Y") {
      this.setState({ isShowMilk: true })
    } else {
      this.setState({ isShowMilk: false })

    }
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

  ShowRatingSlider = event => {

    $("#RatingFirstDiv").attr("style", "display:none");
    $(".RatingFirstclass").attr("style", "display:none");


    //$('#RatingSlider').removeAttr("style");
    $('#RatingSlider').attr("style", "display:block");
  }

  ShowRatingFirstDiv = event => {
    $("#RatingFirstDiv").attr("style", "display:block");
    $(".RatingFirstclass").attr("style", "display:block");

    $('#RatingSlider').attr("style", "display:none");
    var SelectedRatingPoint = Number(this.state.Imagesource);
    var ratingstarsHTML = "";

    if (SelectedRatingPoint == 0.0) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 0.25) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup25 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    }
    else if (SelectedRatingPoint == 0.50) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup50 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 0.75) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup75 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 1.0) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 1.25) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup25 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 1.50) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup50 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 1.75) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup75 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 2.0) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 2.25) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup25 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 2.50) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup50 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 2.75) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup75 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 3.0) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 3.25) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup25 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 3.50) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup50 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 3.75) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup75 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 4.0) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup0 + ' />';
    } else if (SelectedRatingPoint == 4.25) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup25 + ' />';
    } else if (SelectedRatingPoint == 4.50) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup50 + ' />';
    } else if (SelectedRatingPoint == 4.75) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup75 + ' />';
    } else if (SelectedRatingPoint == 5.0) {
      ratingstarsHTML += '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />' +
        '<img alt="rating" src= ' + cup100 + ' />';
    }


    $("#Iddefault-star-ratings").html(ratingstarsHTML);


  }

  updateImageSource = event => {

    //var SliderValue = $(this).val();
    $("#sliderStatus").html(event.target.value);
    //this.setState({ Imagesource: this.state[event.target.value] });
    this.setState({ Imagesource: event.target.value });

    // $('#sliderStatus').html($(this).val());                   
    // $("#img").attr("src", imageUrl[SliderValue]);
  }


  handleSubmit = async (e: any) => {
    e.preventDefault();
    debugger;
    await this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        this.placeid = this.getParameterByName('placeid', window.location.href);
        this.placename = this.getParameterByName('placename', window.location.href);

        var RatingPoints = this.state.Imagesource;
        var result = await this.props.userStore.IsRatingExistByPlace(values, this.placeid, Number(abp.utils.getCookieValue(AppConsts.User.UserId)));

        if (result.result > 0) {
          var DrinkOptionId = $("#DrinkOptionId").val()
          var BeanTypeId = $("#BeanTypeId").val()
          var MilkTypeId = $("#MilkTypeId").val()
          var RoasterTypeId = $("#RoasterTypeId").val()
          var RatingId = result.result;

          var AddMoreRatingResult = await this.props.userStore.AddMoreRating(values, DrinkOptionId, BeanTypeId, MilkTypeId, RoasterTypeId, this.placeid, RatingId, RatingPoints, this.placename);
          if (AddMoreRatingResult.result != "") {
            var arr = AddMoreRatingResult.result.split("-");
            var currentmoreratingid = arr[0];
            var ratingPoints = arr[1];

            var IsMoveToChangeRatingResult = await this.props.userStore.IsMoveToChangeRatingScreen(values, this.placeid, Number(abp.utils.getCookieValue(AppConsts.User.UserId)), DrinkOptionId, BeanTypeId);
            debugger
            if (IsMoveToChangeRatingResult.result != "") {
              var splits = IsMoveToChangeRatingResult.result.split("-");
              if (splits[0] == "rating") {
                var ratingId = splits[1];
                this.props.history.push("/ChangeRating?placeid=" + this.placeid + "&previousratingid=" + ratingId + "&DrinkOptionId=" + DrinkOptionId + "&BeanTypeId=" + BeanTypeId + "&currentmoreratingid=" + currentmoreratingid + "&ratingpoints=" + ratingPoints);
              } else {
                var moreratingId = splits[1];
                this.props.history.push("/ChangeRating?placeid=" + this.placeid + "&previousmoreratingId=" + moreratingId + "&DrinkOptionId=" + DrinkOptionId + "&BeanTypeId=" + BeanTypeId + "&currentmoreratingid=" + currentmoreratingid + "&ratingpoints=" + ratingPoints);
              }

            } else {
              this.props.history.push("/AnotherRating?placeid=" + this.placeid + "&currentmoreratingid=" + AddMoreRatingResult.result);
            }
          }

        } else {
          var DrinkOptionId = $("#DrinkOptionId").val()
          var BeanTypeId = $("#BeanTypeId").val()
          var MilkTypeId = $("#MilkTypeId").val()
          var RoasterTypeId = $("#RoasterTypeId").val()

          var AddRatingResult = await this.props.userStore.AddRating(values, DrinkOptionId, BeanTypeId, MilkTypeId, RoasterTypeId, this.placeid, RatingPoints, this.placename);

          this.props.history.push("/AnotherRating?placeid=" + this.placeid + "&currentratingid=" + AddRatingResult.result);
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

      Defaultcup0;
      Defaultcup25;
      Defaultcup50;
      Defaultcup75;
      Defaultcup100;
      this.props.userStore.ChangeLoader(false);

      return (
        <div>

          <main id="main" className="RatingFirstclass">
            <div className="container-fluid" id="RatingFirstDiv">
              <div className="row">
                <div className="col-lg-7 col-md-12 col-sm-12">
                  <div className="heading">
                    <h2>{this.placename}</h2>
                    <h2>Rate a bean</h2>
                  </div>
                  <div className="tab_contentarea rating_form">
                    <form className="web-form" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label>Drink:</label>
                        <input readOnly id="TextLineDrinkShowTags" onClick={this.ShowDrinkTags} type="text" placeholder="" className="form-control" />
                        <div id="dvDrinkShowTags" style={{ display: 'none' }} className="rate_select">
                          {this.props.userStore.DrinkOptionsResult.map((item, key) =>
                            <a id={"DrinkanchorId" + key} onClick={this.SelectDrinkTags} itemID={item.id.toString()} itemType={item.type.toString()}> {item.name}
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
                            <a id={"BeananchorId" + key} onClick={this.SelectBeanTags} itemID={item.id.toString()}> {item.name}
                            </a>
                          )}
                        </div>
                        {getFieldDecorator('BeanTypeId')(
                          <input type="text" style={{ display: 'none' }} className="form-control" />
                        )}


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

{this.state.isShowMilk ? 
  <div className="form-group">
                        <label>Milk Type:</label>
                        {/* MilkTypeId */}

                        <input readOnly id="TextLineMilkShowTags" onClick={this.ShowMilkTags} type="text" placeholder="" className="form-control" />
                        <div id="dvMilkShowTags" style={{ display: 'none' }} className="rate_select">
                          {this.state.MilkOptionsResult.map((item, key) =>
                            <a id={"MilkanchorId" + key} onClick={this.SelectMilkTags} itemID={item.id.toString()}> {item.name}
                            </a>
                          )}
                        </div>
                        {getFieldDecorator('MilkTypeId')(
                          <input type="text" style={{ display: 'none' }} className="form-control" />
                        )}
                      </div> : ''
}

                      {/* <div className="form-group">
                        <label>Milk Type:</label>
                       

                        <input readOnly id="TextLineMilkShowTags" onClick={this.ShowMilkTags} type="text" placeholder="" className="form-control" />
                        <div id="dvMilkShowTags" style={{ display: 'none' }} className="rate_select">
                          {this.state.MilkOptionsResult.map((item, key) =>
                            <a id={"MilkanchorId" + key} onClick={this.SelectMilkTags} itemID={item.id.toString()}> {item.name}
                            </a>
                          )}
                        </div>
                        {getFieldDecorator('MilkTypeId')(
                          <input type="text" style={{ display: 'none' }} className="form-control" />
                        )}
                      </div> */}
                      <div className="form-group">
                        <label>Roast Type:</label>
                        {/* RoasterType */}

                        <input readOnly id="TextLineRoasterShowTags" onClick={this.ShowRoasterTags} type="text" placeholder="" className="form-control" />
                        <div id="dvRoasterShowTags" style={{ display: 'none' }} className="rate_select">
                          {this.state.RoasterOptionsResult.map((item, key) =>
                            <a id={"RoasteranchorId" + key} onClick={this.SelectRoasterTags} itemID={item.id.toString()}> {item.name}
                            </a>
                          )}
                        </div>
                        {getFieldDecorator('RoasterTypeId')(
                          <input type="text" style={{ display: 'none' }} className="form-control" />
                        )}


                      </div>
                      <div className="form-group">
                        <label>Rating:</label>
                        {/* {getFieldDecorator('placeRating')(
                          <input type="text" className="form-control" />
                        )} */}

                        <div className="default-star-ratings" id="Iddefault-star-ratings" onClick={this.ShowRatingSlider} >
                          <img alt="rating" style={{ width: '41px', height:'41px', marginRight: '4px' }} src={Defaultcup0} />
                          <img alt="rating" style={{ width: '41px', height:'41px', marginRight: '4px' }} src={Defaultcup0} />
                          <img alt="rating" style={{ width: '41px', height:'41px', marginRight: '4px' }} src={Defaultcup0} />
                          <img alt="rating" style={{ width: '41px', height:'41px', marginRight: '4px' }} src={Defaultcup0} />
                          <img alt="rating" style={{ width: '41px', height:'41px', marginRight: '4px' }} src={Defaultcup0} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Barista: </label>
                        {getFieldDecorator('Barista')(
                          <input type="text" placeholder="optional" className="form-control" />
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

                <div className="col-lg-5 hidden-md">
                  <NewsFeeds {...this.props} />
                </div>
              </div>


            </div>
          </main>



          <main id="main">

            <div className="container-fluid" id="RatingSlider" style={{ display: 'none' }}>
              <div className="row">
                <div className="col-lg-7 col-md-12 col-sm-12">
                  <div className="heading">
                    <h2>{this.placename}</h2>
                    <h2>Rate a bean</h2>
                  </div>
                  <div className="tab_contentarea">
                    {/* <form className="web-form text-center"> */}
                    <div className="web-form text-center">
                      <span onClick={this.ShowRatingFirstDiv} style={{ float: 'right', marginRight: '11px', marginTop: '-8px', fontSize: '35px' }}>x</span>
                      <div className="user-rating">
                        <span id="sliderStatus">0</span>
                        <div className="rating-img">
                          <img src={require(`../../Content/images/${this.state.Imagesource}.png`)} alt="image" id="img" />
                        </div>
                        {/* defaultValue={0} */}
                        <input type="range" id="slider" onChange={this.updateImageSource}  min={0} max={5} step="0.25" />
                      </div>
                      <div className="form-group text-center">
                        <button className="btn-web m-t10 m-b70" onClick={this.ShowRatingFirstDiv} > Done</button>
                      </div>
                      {/* </form> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 hidden-md">
                  <NewsFeeds {...this.props} />
                </div>

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