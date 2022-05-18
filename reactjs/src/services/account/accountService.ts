import { IsTenantAvaibleInput } from './dto/isTenantAvailableInput';
import { RegisterInput } from './dto/registerInput';
import IsTenantAvaibleOutput from './dto/isTenantAvailableOutput';
import { RegisterOutput } from './dto/registerOutput';
// import http from '../httpService';
import TenantAvailabilityState from './dto/tenantAvailabilityState';

class AccountService {
  public async isTenantAvailable(isTenantAvaibleInput: IsTenantAvaibleInput): Promise<IsTenantAvaibleOutput> {
    // let result = await http.post('api/services/app/Account/IsTenantAvailable', isTenantAvaibleInput);
    // return result.data.result;
    return Promise.resolve({tenantId: 1, state: TenantAvailabilityState.Available });
  }

  public async register(registerInput: RegisterInput): Promise<RegisterOutput> {
    // let result = await http.post('api/services/app/Account/Register', registerInput);
    // return result.data.result;
    return Promise.resolve({canLogin: true});
  }
}

export default new AccountService();
