/// <reference types="@types/googlemaps" />
import * as React from 'react';
//import { Form, Input, Checkbox, Modal, Tabs } from 'antd';
import { Form } from 'antd';
//import * as $ from "jquery"
import AppComponentBase from 'src/components/AppComponentBase';
import Stores from 'src/stores/storeIdentifier';
import UserStore from 'src/stores/userStore';
import { observer, inject } from 'mobx-react';
import { FormComponentProps } from 'antd/lib/form';
//import { GetSearchOutputResults } from 'src/services/user/dto/SearchOutputResult';
import { searchUserInput } from 'src/services/user/dto/searchUserInput';
import { RouteComponentProps } from 'react-router-dom';
//import AppConsts from 'src/lib/appconst';
import NewsFeeds from 'src/components/NewsFeeds';
import { RatingSearchInput } from 'src/services/user/dto/RatingSearchInput';
import AppConsts from 'src/lib/appconst';


export interface IChangeRatingProps extends FormComponentProps, searchUserInput, RouteComponentProps {
  userStore: UserStore;
}

export interface IChangeRatingState {
  userId: number;
  IsShow: boolean;
  idchkDrinkratioschanged: boolean;
  idchkBlendcomponentschanged: boolean;
  idchkDifferentservingtemperature: boolean;
  idchkDifferentbarista: boolean;
  idchkOther: boolean;

}

//  const confirm = Modal.confirm;
//  const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class ChangeRating extends AppComponentBase<IChangeRatingProps, IChangeRatingState, searchUserInput> {
  formRef: any;
  searchUserInput: searchUserInput;
  searchkey: string | null;
  placeid: string | null;
  //BeanOptionsResult: getBeanOptions[];

  state = {
    userId: 0,
    IsShow: true,
    idchkDrinkratioschanged: false,
    idchkBlendcomponentschanged: false,
    idchkDifferentservingtemperature: false,
    idchkDifferentbarista: false,
    idchkOther: false,
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

  toggleidchkDrinkratioschanged = async (e: any) => {
    this.setState({
      idchkDrinkratioschanged: !this.state.idchkDrinkratioschanged // flip boolean value
    })
  }
  toggleidchkBlendcomponentschanged = async (e: any) => {
    this.setState({
      idchkBlendcomponentschanged: !this.state.idchkBlendcomponentschanged // flip boolean value
    })
  }
  toggleidchkDifferentservingtemperature = async (e: any) => {
    this.setState({
      idchkDifferentservingtemperature: !this.state.idchkDifferentservingtemperature // flip boolean value
    })
  }
  toggleidchkDifferentbarista = async (e: any) => {
    this.setState({
      idchkDifferentbarista: !this.state.idchkDifferentbarista // flip boolean value
    })
  }
  toggleidchkOther = async (e: any) => {
    this.setState({
      idchkOther: !this.state.idchkOther // flip boolean value
    })
  }


  ChangeRatingClicked = async (e: any) => {

    var myObject = {} as RatingSearchInput;
    myObject.Id = Number(this.getParameterByName('Ratingid', window.location.href));
    myObject.placeId = this.getParameterByName('placeid', window.location.href);
    myObject.DrinkOptionId = this.getParameterByName('DrinkOptionId', window.location.href);
    myObject.BeanTypeId = this.getParameterByName('BeanTypeId', window.location.href);
    myObject.UserId = Number(abp.utils.getCookieValue(AppConsts.User.UserId));
    var LatestRatingDetailId = await this.props.userStore.GetPreviousRatingDetail(myObject);

    if (LatestRatingDetailId > 0) {
      var myObject = {} as RatingSearchInput;
      myObject.UserId = Number(abp.utils.getCookieValue(AppConsts.User.UserId));
      myObject.Id = LatestRatingDetailId;
      myObject.IsDrinkRatioChanged = this.state.idchkDrinkratioschanged;
      myObject.IsBlendComponentsChanged = this.state.idchkDrinkratioschanged;
      myObject.IsDifferentServingTemp = this.state.idchkDrinkratioschanged;
      myObject.IsDifferentBarista = this.state.idchkDrinkratioschanged;
      myObject.OtherReason = this.state.idchkDrinkratioschanged;
      var Id = await this.props.userStore.UpdateRatingDetail(myObject);
      alert(Id);


      
    }


  }

  AddNewRatingClicked = async (e: any) => {

  }

  render() {
    // const { getFieldDecorator } = this.props.form;

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
                  </div>
                  <div className="tab_contentarea add_rating_text">
                    <p>You just rated Foxtail’s Chiapas bean! This rating is lower than your previous rating. Would you like to change your previous rating or add this review?</p>
                    <p className="m-t10">Reason for change: Select all that apply</p>
                  </div>
                  <div className="form-group check_box">
                    <input type="checkbox" checked={this.state.idchkDrinkratioschanged} onChange={this.toggleidchkDrinkratioschanged} id="idchkDrinkratioschanged" />
                    <label htmlFor="idchkDrinkratioschanged">Drink ratios changed</label>
                  </div>
                  <div className="form-group check_box">
                    <input type="checkbox" checked={this.state.idchkBlendcomponentschanged} onChange={this.toggleidchkBlendcomponentschanged} id="idchkBlendcomponentschanged" />
                    <label htmlFor="idchkBlendcomponentschanged">Blend components changed</label>
                  </div>
                  <div className="form-group check_box">
                    <input type="checkbox" checked={this.state.idchkDifferentservingtemperature} onChange={this.toggleidchkDifferentservingtemperature} id="idchkDifferentservingtemperature" />
                    <label htmlFor="idchkDifferentservingtemperature">Different serving temperature</label>
                  </div>
                  <div className="form-group check_box">
                    <input type="checkbox" checked={this.state.idchkDifferentbarista} onChange={this.toggleidchkDifferentbarista} id="idchkDifferentbarista" />
                    <label htmlFor="idchkDifferentbarista">Different barista</label>
                  </div>
                  <div className="form-group check_box">
                    <input type="checkbox" checked={this.state.idchkOther} onChange={this.toggleidchkOther} id="idchkOther" />
                    <label htmlFor="idchkOther">Other</label>
                  </div>
                  <div className="form-group text-center">
                    <button className="btn-web m-t10 m-b10" onClick={this.ChangeRatingClicked}>change rating</button>
                    <button className="btn-web m-t10 m-b10" onClick={this.AddNewRatingClicked}>add new rating</button>
                  </div>
                  <div className="add_rating add_rating2">
                    <a href="#"><span><img src="images/Camera.svg" alt="image" /></span> <p>Add a photo</p></a>
                    <a href="#"><span><img src="images/submit-another-rating.svg" alt="image" /></span> <p>Submit another rating</p></a>
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

export default Form.create()(ChangeRating);