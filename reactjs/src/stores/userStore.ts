import { action, observable } from 'mobx';

import userService from 'src/services/user/userService';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';
//import { GetUserOutput } from 'src/services/user/dto/getUserOutput';
import { UpdateUserInput } from 'src/services/user/dto/updateUserInput';
import { EntityDto } from 'src/services/dto/entityDto';
import { CreateOrUpdateUserInput } from 'src/services/user/dto/createOrUpdateUserInput';
import { GetRoles } from 'src/services/user/dto/getRolesOuput';
import { PagedUserResultRequestDto } from "src/services/user/dto/PagedUserResultRequestDto";
import { searchUserInput } from 'src/services/user/dto/searchUserInput';
import { GetSearchOutputResults } from 'src/services/user/dto/SearchOutputResult';
import { getDrinkOptions } from 'src/services/user/dto/getDrinkOptions';
import { getBeanOptions } from 'src/services/user/dto/getBeanOptions';
import { CreateRating } from 'src/services/user/dto/CreateRating';
import { RatingSearchInput } from 'src/services/user/dto/RatingSearchInput';
import { ImageFile } from 'src/services/user/dto/ImageFile';
import { GetUserRelationshipInput } from 'src/services/user/dto/GetUserRelationshipInput';
//import { any } from 'prop-types';


//import { List } from 'antd';

class UserStore {
 // @observable users: PagedResultDto<GetUserOutput>;
  @observable users: PagedResultDto<CreateOrUpdateUserInput>;
  //@observable UserRelationshipList: PagedResultDto<GetUserRelationshipInput>;
  @observable UserRelationshipList: GetUserRelationshipInput[];
  @observable MyFriendsUser: CreateOrUpdateUserInput[] | undefined;

  @observable editUser: CreateOrUpdateUserInput;
  @observable roles: GetRoles[] = [];
  @observable SearchResult: GetSearchOutputResults[] = [];
  @observable SearchResultDetail: GetSearchOutputResults;
  @observable DrinkOptionsResult: getDrinkOptions[];
  @observable BeanOptionsResult: getBeanOptions[];

  @observable ratings: CreateRating[] | undefined;
  @observable IsLoader: boolean;


  // @observable AveragePlaceRating: Number;
  // @observable AveragePlaceMyRating: Number;

  @action
  async ChangeLoader(Isloader : boolean ) {    
    this.IsLoader = Isloader;
  }

  @action
  async search(searchUserInput: searchUserInput) {    
    let result = await userService.search(searchUserInput);
    // debugger;
    if(result != undefined && result != null){

      var length = result.length;
      if(length > 10){
        result = result.slice(0, 10);
      }
    }    
   return this.SearchResult = result;  

  }

  @action
  async NearBySearch(searchUserInput: searchUserInput) {    
    let result = await userService.NearBySearch(searchUserInput);
    return this.SearchResult = result;    
  }
  @action
  async NearBySearchByZipCodeText(searchUserInput: searchUserInput) {    
    let result = await userService.NearBySearchByZipCodeText(searchUserInput);
    return this.SearchResult = result;    
  }
  
  @action
  async SearchDetail(searchUserInput: searchUserInput){    
    let result = await userService.SearchDetail(searchUserInput);
    console.log(result);
   return this.SearchResultDetail = result;       
//     if(this.SearchResultDetail.photos != undefined ){
//       alert('Final' + this.SearchResultDetail.photos[0].getUrl({maxWidth: 35, maxHeight: 35})); 
// //console.log(this.SearchResultDetail.photos[0].getUrl({maxWidth: 480, maxHeight: 223}))
//     }
  }


  
  @action
  async create(createUserInput: CreateOrUpdateUserInput) {
    let result = await userService.create(createUserInput);
    this.users.items.push(result);
  }

  @action
  async update(updateUserInput: UpdateUserInput, drinkPreferenceId:any, drinkLogPreferenceId: any,id: any,SelectedFile: any,ImageName : any, IsPrivate:any ) {
    
    updateUserInput.id = id;
    updateUserInput.drinkPreferenceId = drinkPreferenceId;
    updateUserInput.drinkLogPreferenceId = drinkLogPreferenceId;
    updateUserInput.ImageData = SelectedFile;
    updateUserInput.ImageName = ImageName;
    updateUserInput.IsPrivate = IsPrivate;
    let result = await userService.update(updateUserInput);
    //return result;
    // this.users.items = this.users.items.map((x: GetUserOutput) => {
    //   if (x.id == updateUserInput.id) x = result;
    //   return x;
    // });
    this.users.items = this.users.items.map((x: CreateOrUpdateUserInput) => {
      if (x.id == updateUserInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await userService.delete(entityDto);
    // this.users.items = this.users.items.filter((x: GetUserOutput) => x.id != entityDto.id);
    this.users.items = this.users.items.filter((x: CreateOrUpdateUserInput) => x.id != entityDto.id);

  }

  @action
  async getRoles() {
    let result = await userService.getRoles();
    this.roles = result;
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await userService.get(entityDto);
    return this.editUser = result;
  }

  @action
  async createUser() {
    this.editUser = {
      userName: '',
      name: '',
      surname: '',
      emailAddress: '',
      isActive: false,
      roleNames: [],
      password: '',
      id: 0,
      userImage: '',
      userImageType: '',
      userImageName: '',
      referrelCode: '',
      drinkPreferenceId: 0,
      drinkLogPreferenceId: 0,
      newPassword: '',
      ImageData: '',
      ImageName: '',
      isPrivate: false,
    };
    this.roles = [];
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedUserResultRequestDto) {
    let result = await userService.getAll(pagedFilterAndSortedRequest);
    this.users = result;
  }

  @action
  async getMyFriendsUsers(GetUserRelationshipInput: GetUserRelationshipInput) {
    let result = await userService.GetMyFriendsUserList(GetUserRelationshipInput);
    this.MyFriendsUser = result;    
  }

  async changeLanguage(languageName: string) {
    await userService.changeLanguage({ languageName: languageName });
  }

//Rating 
@action
async GetDrinkOption() {
  let result = await userService.GetDrinkOption();
 this.DrinkOptionsResult = result;
}
@action
async GetBeanOption() {
  let result = await userService.GetBeanOption();
 this.BeanOptionsResult = result;
}
@action
async AddRating(CreateRating: CreateRating,DrinkOptionId:any,BeanTypeId:any,MilkTypeId:any,RoasterTypeId:any,Placeid : any,RatingPoints : any,placename:any) {
    CreateRating.drinkOptionId = DrinkOptionId;
    CreateRating.beanTypeId = BeanTypeId;
    CreateRating.milkTypeId = MilkTypeId;
    CreateRating.roasterTypeId = RoasterTypeId;
    CreateRating.placeId = Placeid;    
    CreateRating.placeRating = RatingPoints;
    CreateRating.placeName = placename;

    this.ratings = undefined;
    let result = await userService.AddRating(CreateRating);
    return result;
    
  }

@action
async GetAllRatings(pagedFilterAndSortedRequest: PagedUserResultRequestDto) {
  let result = await userService.GetAllRating(pagedFilterAndSortedRequest);
  this.ratings = result;
}

  @action
async AddMoreRating(CreateRating: CreateRating,DrinkOptionId:any,BeanTypeId:any,MilkTypeId:any,RoasterTypeId:any,Placeid : any, RatingId : any,RatingPoints : any,placename:any) {
    CreateRating.drinkOptionId = DrinkOptionId;
    CreateRating.beanTypeId = BeanTypeId;
    CreateRating.milkTypeId = MilkTypeId;
    CreateRating.roasterTypeId = RoasterTypeId;
    CreateRating.placeId = Placeid;
    CreateRating.ratingId = RatingId;
    CreateRating.placeRating = RatingPoints;
    CreateRating.placeName = placename;
    
    let result = await userService.AddMoreRating(CreateRating);
    return result;
  }

  @action
  async IsRatingExistByPlace(RatingSearchInput: RatingSearchInput,Placeid : any,UserId : any) {
    RatingSearchInput.placeId = Placeid;
    RatingSearchInput.UserId = UserId;
      let result = await userService.IsRatingExistByPlace(RatingSearchInput);
      return result;
    }

    @action
    async IsMoveToChangeRatingScreen(RatingSearchInput: RatingSearchInput,Placeid : any,UserId : any,DrinkOptionId : any,BeanTypeId : any) {
      RatingSearchInput.placeId = Placeid;
      RatingSearchInput.UserId  = UserId;
      RatingSearchInput.DrinkOptionId = DrinkOptionId;
      RatingSearchInput.BeanTypeId = BeanTypeId;
   
        let result = await userService.IsMoveToChangeRatingScreen(RatingSearchInput);
        return result;
      }


  @action
  async GetPreviousRatingDetail(RatingSearchInput: RatingSearchInput) {
      let result = await userService.GetPreviousRatingDetail(RatingSearchInput);
      return result;
    }

    @action
    async UpdateRatingDetail(RatingSearchInput: RatingSearchInput) {
        let result = await userService.UpdateRatingDetail(RatingSearchInput);
        return result;
      }
      @action
      async UpdateRating(RatingSearchInput: RatingSearchInput) {
          let result = await userService.UpdateRating(RatingSearchInput);
          return result;
        }

  @action
  async UploadPhoto(ImageData : ImageFile) {    
      let result = await userService.UploadPhoto(ImageData);
      return result;
    }

    @action
    async IsFriendbyUserIdAndFollowId(GetUserRelationshipInput: GetUserRelationshipInput) {      
        let result = await userService.IsFriendbyUserIdAndFollowId(GetUserRelationshipInput);
        return result;
      }

      @action
      async GetUserRelationshipListbyUserId(GetUserRelationshipInput: GetUserRelationshipInput) {      
        let result = await userService.GetUserRelationshipListbyUserId(GetUserRelationshipInput);
        this.UserRelationshipList = result;       
      }
      
      @action
      async SendFollowRequest(GetUserRelationshipInput: GetUserRelationshipInput) {            
          let result = await userService.SendFollowRequest(GetUserRelationshipInput);
          this.MyFriendsUser = undefined;
          return result;
        }

      @action
      async SendUnFollowRequest(GetUserRelationshipInput: GetUserRelationshipInput) {            
          let result = await userService.SendUnFollowRequest(GetUserRelationshipInput);
          this.MyFriendsUser = undefined;
          return result;
        }      
}

export default UserStore;
