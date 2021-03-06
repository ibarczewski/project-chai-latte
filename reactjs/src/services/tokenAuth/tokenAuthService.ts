import { AuthenticationModel } from './dto/authenticationModel';
import { AuthenticationResultModel } from './dto/authenticationResultModel';
// import http from '../httpService';

class TokenAuthService {
  public async authenticate(authenticationInput: AuthenticationModel): Promise<AuthenticationResultModel> {
    // // debugger;
    // let result = await http.post('api/TokenAuth/Authenticate', authenticationInput);   
    // if (result.data != undefined){                
    //   return result.data.result;
    // }else{
    //   var myObject = {} as AuthenticationResultModel;
    //   myObject.ErrorMessage = 'Invalid username or password!';
    //   return myObject;
    // }     
    return Promise.resolve({
      accessToken: 'blahblah',
      encryptedAccessToken: 'encryptedblahblah',
      expireInSeconds: 150000,
      userId: 1,
      ErrorMessage: '',
    })
  }
}

export default new TokenAuthService();
