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
import NewsFeeds from 'src/components/NewsFeeds';
import NewsFeedsWithOutLogin from 'src/components/NewsFeedsWithOutLogin';
import AppConsts from 'src/lib/appconst';


export interface ISearchResultDetailProps extends FormComponentProps, searchUserInput, RouteComponentProps {
  userStore: UserStore;
}

export interface ISearchResultDetailState {
  userId: number;
}

//  const confirm = Modal.confirm;
//  const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class SearchResultDetail extends AppComponentBase<ISearchResultDetailProps, ISearchResultDetailState, searchUserInput> {
  formRef: any;
  searchUserInput: searchUserInput;
  placeid: string | null;
  SearchOutputResults?: GetSearchOutputResults;
  //roles ?: GetSearchOutputResults | undefined;


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

    this.placeid = this.getParameterByName('placeid', window.location.href);
    var myObject = {} as searchUserInput;
    myObject.placeId = this.placeid;
    this.SearchOutputResults = await this.LoadData(myObject);
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
      return (
        <div>
          <main id="main">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-7 col-md-12 col-sm-12">
                  <a href="#" className="back_home"><i className="fas fa-chevron-left" /> back</a>

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
                    <a href="#" className="follow_cafe"><img src="images/follow-cafe.svg" alt="image" /> Follow cafe in my Feed</a>
                    <hr />
                    <div className="d-table">
                      <div className="d-table-cell desc-cell list_icons2">
                        <p>Serves: Single Origin, Blends</p>
                        <ul className="tab-tag">
                          <li>Average Rating</li>
                          <li>
                            No rating yet
                                   {/* <div className="star-ratings">
                                     <img alt="rating" src="images/full cup.png" />
                                     <img alt="rating" src="images/full cup.png" />
                                     <img alt="rating" src="images/full cup.png" />
                                     <img alt="rating" src="images/full cup.png" />
                                     <img alt="rating" src="images/empty cup.png" />
                                   </div> */}
                          </li>
                        </ul>
                        <p>My rating: No rating yet. <a onClick={() => this.props.history.push("/Rating?placeid=" + this.placeid)}> Rate it now </a></p>
                      </div>
                    </div>
                    <hr />
                    <div className="d-table">
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
                    </div>
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