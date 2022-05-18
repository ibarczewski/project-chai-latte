import { GetCurrentLoginInformations } from './dto/getCurrentLoginInformations';
// import http from '../httpService';

class SessionService {
  public async getCurrentLoginInformations(): Promise<GetCurrentLoginInformations> {
    // let result = await http.get('api/services/app/Session/GetCurrentLoginInformations', {
    //   headers: {
    //     'Abp.TenantId': abp.multiTenancy.getTenantIdCookie(),
    //   },
    // });

    // return result.data.result;

    return Promise.resolve(
      {
        application: {version: "1", releaseDate: new Date(), features: []}, 
        user: { id: 1, name: 'Ian Barczewski', surname: 'Ian Surname', userName: 'CoffeeIan', emailAddress: 'coffeeian@gmail.com'}, 
        tenant: { id: 1, tenancyName: 'TenancyName what is this', name: 'Tenant Name?'}
      });
  }
}

export default new SessionService();
