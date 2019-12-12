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
import NewsFeeds from 'src/components/NewsFeeds';


export interface IAnotherRatingProps extends FormComponentProps, searchUserInput, RouteComponentProps {
  userStore: UserStore;
}

export interface IAnotherRatingState {
  userId: number;
  IsShow: boolean;
  SelectedFile : string | ArrayBuffer | null;
  loading : boolean;
  ImageName : string | null;

}

//  const confirm = Modal.confirm;
//  const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class AnotherRating extends AppComponentBase<IAnotherRatingProps, IAnotherRatingState, searchUserInput> {
  formRef: any;
  searchUserInput: searchUserInput;
  searchkey: string | null;
  placeid: string | null;
  //BeanOptionsResult: getBeanOptions[];
  ImageFile : ImageFile; 

  state = {
    userId: 0,
    IsShow: true,
    SelectedFile : '',
    loading : false,
    ImageName : '',
  };

  getParameterByName(name, url) {

    // if (!url) url = window.location.href="#";
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  async componentDidMount() {
    // this.searchkey = this.getParameterByName('searchkey', window.location.href="#");
    // var myObject = {} as searchUserInput;
    // myObject.searchText = this.searchkey;

    // this.forceUpdate();
  }

  FileSelectedHandler = event =>{
      
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    this.state.ImageName =event.target.files[0].name;

    //reader.readAsBinaryString(file);
   
    if (file && (file.type.includes('jpeg') || file.type.includes('png'))) {
      reader.onprogress = (event) => {
      this.setState({ loading: true });
      };
      
      reader.onloadend  = (event) => {
      var base64 = reader.result as string;   
      this.state.SelectedFile = base64 as string;
       
      };
      
      

      }


  }
  UploadFileHandler = async (e: any)  =>{
     var myObject = {} as ImageFile;
     myObject.ImageData = this.state.SelectedFile; 
     myObject.placeId = this.getParameterByName('placeid', window.location.href);   
     myObject.ImageName = this.state.ImageName;
    await this.props.userStore.UploadPhoto(myObject);
  }

  render() {
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
                <p>You just rated Foxtail’s Chiapas bean! </p>
                <p>Thanks for submitting your rating.</p>
                <p>Help fellow coffee enthusiasts by adding a photo or submitting another rating.</p>
              </div>
              <div className="add_rating">
                {/* <a href="#"><span><img src="images/Camera.svg" alt="image" /></span> <p>Add a photo</p></a> */}
                 <a onClick={this.UploadFileHandler} href="#"><span><img src="images/Camera.svg" alt="image" /></span> <p>Add a photo</p>
                 </a>
                 <input type="file" onChange={this.FileSelectedHandler}/>                 
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

//export default Register;

export default Form.create()(AnotherRating);