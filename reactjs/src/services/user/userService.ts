import { UpdateUserInput } from './dto/updateUserInput';
import { ChangeLanguagaInput } from './dto/changeLanguageInput';
import { EntityDto } from 'src/services/dto/entityDto';
import http from '../httpService';
//import { GetAllUserOutput } from './dto/getAllUserOutput';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';
import { CreateOrUpdateUserInput } from './dto/createOrUpdateUserInput';
import { PagedUserResultRequestDto } from "./dto/PagedUserResultRequestDto";
import { searchUserInput } from "./dto/searchUserInput";
import { GetSearchOutputResults } from 'src/services/user/dto/SearchOutputResult';
import { CreateRating } from 'src/services/user/dto/CreateRating';
import { RatingSearchInput } from 'src/services/user/dto/RatingSearchInput';
import { GetUserRelationshipInput } from 'src/services/user/dto/GetUserRelationshipInput';

import { ImageFile } from 'src/services/user/dto/ImageFile';



class UserService {

  public async search(searchUserInput: searchUserInput) {
    return new Promise<GetSearchOutputResults[]>((resolve, reject) => {
     // var results;
      var map;
      var service;
      
     // var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
        var pyrmont = new google.maps.LatLng(85,180);
  
      map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 1
        });
        var request = {
          // location: pyrmont,
          // radius: '5000',
          query: searchUserInput.searchText,
          //region: "us",                  
        };
        
        service = new google.maps.places.PlacesService(map);
         service.textSearch(request, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {    
            
            resolve(results); 
          }else{
            reject(status);
          }
        });

        
    });

  }

  public async SearchDetail(searchUserInput: searchUserInput) {
    return new Promise<GetSearchOutputResults>((resolve, reject) => {
     // var results;
      var map;
      var service;
      
     // var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
        var pyrmont = new google.maps.LatLng(85,180);
  
      map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 1
        });

        var request = {
          placeId: searchUserInput.placeId,
          //fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
        };
        
        service = new google.maps.places.PlacesService(map);
        service.getDetails(request, callback);
        
        function callback(place, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            resolve(place); 
          }else{
            reject(status);
          }
        }

        
    });

  }

  public async create(createUserInput: CreateOrUpdateUserInput) {

    let result = await http.post('api/services/app/User/Create', createUserInput);
    return result.data.result;
  }

  public async update(updateUserInput: UpdateUserInput) {
    let result = await http.put('api/services/app/User/Update', updateUserInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/User/Delete', { params: entityDto });
    return result.data;
  }

  public async getRoles() {
    let result = await http.get('api/services/app/User/GetRoles');
    return result.data.result.items;
  }

  public async changeLanguage(changeLanguageInput: ChangeLanguagaInput) {
    let result = await http.post('api/services/app/User/ChangeLanguage', changeLanguageInput);
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateUserInput> {
    let result = await http.get('api/services/app/User/Get', { params: entityDto });
    return result.data.result;
  }

  //   public async getAll(pagedFilterAndSortedRequest: PagedUserResultRequestDto): Promise<PagedResultDto<GetAllUserOutput>> {
  //   let result = await http.get('api/services/app/User/GetAll', { params: pagedFilterAndSortedRequest });
  //   return result.data.result;
  // }

  public async getAll(pagedFilterAndSortedRequest: PagedUserResultRequestDto): Promise<PagedResultDto<CreateOrUpdateUserInput>> {
    let result = await http.get('api/services/app/User/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }

  public async GetMyFriendsUserList(GetUserRelationshipInput: GetUserRelationshipInput): Promise<CreateOrUpdateUserInput[]> {
    let result = await http.get('api/services/app/UserRelationship/GetMyFriendsUserList', { params: GetUserRelationshipInput });    
    return result.data.result;
  }

  
  public async GetDrinkOption() {
    // return new Promise((resolve, reject) => {
    let result = await http.get('api/services/app/DrinkOptions/GetDrinkOptionsAsync');
     return result.data.result.items;
   //return resolve(result);

  // });
  }
  public async GetBeanOption() {
    // return new Promise((resolve, reject) => {
    let result = await http.get('api/services/app/BeanOptions/GetBeanOptionsAsync');
     return result.data.result.items;
   //return resolve(result);

  // });
  }

  public async AddRating(CreateRating: CreateRating) {

    let result = await http.post('api/services/app/Ratings/CreateRating', CreateRating);
    return result.data.status;
  }


  public async GetAllRating(pagedFilterAndSortedRequest: PagedUserResultRequestDto): Promise<CreateRating[]> {
    let result = await http.get('api/services/app/Ratings/GetRatingsAsync', { params: pagedFilterAndSortedRequest });
    return result.data.result.items;
  }

  public async AddMoreRating(CreateRating: CreateRating) {
    let result = await http.post('api/services/app/RatingsDetail/CreateRatingDetail', CreateRating);
    return result.data;
  }

  public async IsRatingExistByPlace(RatingSearchInput: RatingSearchInput) {
    let result = await http.post('api/services/app/Ratings/IsRatingExistByPlace', RatingSearchInput);
    return result.data;
  }

  public async IsMoveToChangeRatingScreen(RatingSearchInput: RatingSearchInput) {
    let result = await http.post('api/services/app/RatingsDetail/IsMoveToChangeRatingScreen', RatingSearchInput);
    return result.data.status;
  }

  public async GetPreviousRatingDetail(RatingSearchInput: RatingSearchInput) {
    let result = await http.post('api/services/app/RatingsDetail/GetPreviousRatingDetail', RatingSearchInput);
    return result.data;
  }

  public async UpdateRatingDetail(RatingSearchInput: RatingSearchInput) {
    let result = await http.post('api/services/app/RatingsDetail/UpdateRatingDetail', RatingSearchInput);
    return result.data;
  }

  public async DeleteCurrentlyAddedMoreRating(RatingSearchInput: RatingSearchInput) {
    let result = await http.post('api/services/app/RatingsDetail/DeleteRatingDetail', RatingSearchInput);
    return result.data.status;
  }

  public async UploadPhoto(ImageData: ImageFile) {

    let result = await http.post('api/services/app/Ratings/UploadPhoto', ImageData);
    return result.data.result;
  }
  // public async IsFriendbyUserIdAndFollowIdss(GetUserRelationshipInput: GetUserRelationshipInput) {

  //   let result = await http.post('api/services/app/UserRelationship/GetUserRelationship', GetUserRelationshipInput);
  //   return result.data.status;
  // }


  public async IsFriendbyUserIdAndFollowId(GetUserRelationshipInput: GetUserRelationshipInput): Promise<boolean> {
    let result = await http.get('api/services/app/UserRelationship/GetUserRelationship', { params: GetUserRelationshipInput });
    return result.data.result;
  }

  public async GetUserRelationshipListbyUserId(GetUserRelationshipInput: GetUserRelationshipInput): Promise<GetUserRelationshipInput[]> {
    let result = await http.get('api/services/app/UserRelationship/GetUserRelationshipList', { params: GetUserRelationshipInput });
    return result.data.result;
  }


  public async SendFollowRequest(GetUserRelationshipInput: GetUserRelationshipInput) {
    let result = await http.post('api/services/app/UserRelationship/CreateUserRelationship', GetUserRelationshipInput);
    return result.data.status;
  }

  public async SendUnFollowRequest(GetUserRelationshipInput: GetUserRelationshipInput) {
    let result = await http.post('api/services/app/UserRelationship/PostUserRelationship', GetUserRelationshipInput);
    return result.data.status;
  }

 
}
export default new UserService();
