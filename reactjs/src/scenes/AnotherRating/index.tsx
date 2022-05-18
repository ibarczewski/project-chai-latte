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
import submitanotherrating from "src/Content/images/submit-another-rating.svg";
import Camera from "src/Content/images/Camera.svg";


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
  placename: string | null;

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
    this.placename = this.getParameterByName('placename', window.location.href);
    // this.forceUpdate();
  }

  FileSelectedHandlertemp = event =>{

    event.preventDefault();
    $("#upload:hidden").trigger('click');

  }
  FileSelectedHandler = event =>{


    //event.preventDefault();
    //$("#upload:hidden").trigger('click');

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
      this.UploadFileHandler(event); 
      };
      
      //this.UploadFileHandler(event);      
      }      
  }
  UploadFileHandler = async (e: any)  =>{

     var myObject = {} as ImageFile;
     myObject.ImageData = this.state.SelectedFile; 
     myObject.ImageName = this.state.ImageName;
     myObject.placeId = this.getParameterByName('placeid', window.location.href);  
     var currentratingid = Number(this.getParameterByName('currentratingid', window.location.href))
     var currentmoreratingid = Number(this.getParameterByName('currentmoreratingid', window.location.href))
     
     if(currentratingid > 0){
      myObject.ratingId = currentratingid;
        myObject.isRating = true;
     }else{
      myObject.moreRatingId = currentmoreratingid;
      myObject.isRating = false;
     }

    var result = await this.props.userStore.UploadPhoto(myObject);

    if(result.result > 0) {
      alert("photo uploaded successfully")
    }else {
      alert("photo is not uploaded successfully")
    }

  }
  async componentWillMount() {      
  }

  render() {
    //this.props.userStore.ChangeLoader(false);
      return (


        <div>

<main id="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7 col-md-12 col-sm-12">
              <div className="heading">
              <h2>{this.placename}</h2>
              </div>
              <div className="tab_contentarea add_rating_text">
                {/* <p>You just rated Foxtail’s Chiapas bean! </p> */}
                <p>You just rated bean! </p>

                <p>Thanks for submitting your rating.</p>
                <p>Help fellow coffee enthusiasts by adding a photo or submitting another rating.</p>
              </div>
              <div className="add_rating">
                {/* <a href="#"><span><img src="images/Camera.svg" alt="image" /></span> <p>Add a photo</p></a> */}
                 {/* <a onClick={this.UploadFileHandler} href="#"><span><img src="images/Camera.svg" alt="image" /></span> <p>Add a photo</p>
                 </a> */}
                 <a id="upload_link" onClick={this.FileSelectedHandlertemp} href=""><span><img src={submitanotherrating} alt="image" /></span> <p>Add a photo</p>
                 </a>

                 <input id="upload" style={{display:'none'}} type="file"  onChange={this.FileSelectedHandler}/>                 
                <a onClick={() => this.props.history.push("/Desktop_Login")}><span><img src={Camera} alt="image" /></span> <p>Submit another rating</p></a>
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

//export default Register;

export default Form.create()(AnotherRating);