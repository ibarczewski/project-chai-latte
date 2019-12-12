/// <reference types="@types/googlemaps" />
import * as React from 'react';
//import { Form, Input, Checkbox, Modal, Tabs } from 'antd';
import { Form } from 'antd';

import AppComponentBase from 'src/components/AppComponentBase';
import Stores from 'src/stores/storeIdentifier';
import UserStore from 'src/stores/userStore';
import { observer, inject } from 'mobx-react';
import { FormComponentProps } from 'antd/lib/form';
//import { GetSearchOutputResults } from 'src/services/user/dto/SearchOutputResult';
import { searchUserInput } from 'src/services/user/dto/searchUserInput';
import { RouteComponentProps } from 'react-router-dom';
import NewsFeeds from 'src/components/NewsFeeds';
import NewsFeedsWithOutLogin from 'src/components/NewsFeedsWithOutLogin';
import AppConsts from 'src/lib/appconst';

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
}

//  const confirm = Modal.confirm;
//  const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class SearchResult extends AppComponentBase<ISearchResultProps, ISearchResultState, searchUserInput> {
  formRef: any;
  searchUserInput: searchUserInput;
  searchkey: string | null;

  state = {
    userId: 0,
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
    //await this.getAll();

    this.searchkey = this.getParameterByName('searchkey', window.location.href);
    // this.searchUserInput.searchText = this.searchkey;
    // this.props.userStore.search(this.searchUserInput);

    var myObject = {} as searchUserInput;
    myObject.searchText = this.searchkey;
    this.props.userStore.search(myObject);

  }

  render() {

    return (

      <div>

        <main id="main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-7 col-md-12 col-sm-12">
                <a href="#" className="back_home"><i className="fas fa-chevron-left" /> back</a>
                <div className="heading">
                  <h2>Results for {this.searchkey}</h2>
                </div>
                <div className="filter">
                  <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                      <div className="filter_sort">
                        <p className="show_login">Sort by <span /></p>
                        <div className="show_body">
                          <div className="filter_search">
                            <div className="row">
                              <div className="col-sm-12">
                                <div className="input-group radio">
                                  <input id="radio-1" name="radio" type="radio" />
                                  <label htmlFor="radio-1" className="radio-label"> Distance from <span>32789</span></label>
                                </div>
                                <div className="input-group radio">
                                  <input id="radio-2" name="radio" type="radio" />
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
                        <p className="show_login2">Filter <span /></p>
                        <div className="show_body2">
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
                    {this.props.userStore.SearchResult.map((item, key) =>
                      // <li key={item.id}>{item.name}</li>    

                      <div className="d-table">
                        <div className="d-table-cell desc-cell">
                          <a className="nav-link" onClick={() => this.props.history.push("/searchresultdetail?placeid=" + item.place_id)}>
                            <h4>{item.name}</h4>
                          </a>
                          <p style={{ width: '223px' }}>{item.formatted_address}</p>
                          <p>0.5 miles away</p>
                          <p> No Rating yet</p>

                          {/* <div className="star-ratings">
                        <img alt="rating" src="images/full cup.png" />
                        <img alt="rating" src="images/full cup.png" />
                        <img alt="rating" src="images/full cup.png" />
                        <img alt="rating" src="images/full cup.png" />
                        <img alt="rating" src="images/empty cup.png" />
                      </div> */}
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