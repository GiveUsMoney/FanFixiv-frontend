import { BaseApi } from './baseApi';
import {
  CertEmailResponseDto,
  CertNumberResponseDto,
  DcNickReponseDto,
  GetProfileRequestDto,
  GetProfileResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  RefreshResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './dtos/user';

export class UserApi extends BaseApi {
  private readonly authResource = '/auth';
  private readonly registerResource = `${this.authResource}/register`;

  regist(registerDto: RegisterRequestDto) {
    return this.post<RegisterResponseDto, RegisterRequestDto>(
      this.registerResource,
      registerDto,
    );
  }

  certEmail(email: string) {
    return this.get<CertEmailResponseDto>(
      `${this.registerResource}/cert-email`,
      {
        params: { email },
      },
    );
  }

  certNumber(number: number, uuid: string) {
    return this.get<CertNumberResponseDto>(
      `${this.registerResource}/cert-number`,
      {
        params: { number, uuid },
      },
    );
  }

  isNickDouble(nickname: string) {
    return this.get<DcNickReponseDto>(`${this.registerResource}/dc-nick`, {
      params: { nickname },
    });
  }

  login(email: string, pw: string) {
    return this.post<LoginResponseDto, LoginRequestDto>(
      `${this.authResource}/login`,
      {
        id: email,
        pw,
      },
    );
  }

  getProfile() {
    return this.get<GetProfileResponseDto>(`${this.authResource}/profile`, {});
  }

  refresh() {
    return this.post<RefreshResponseDto, undefined>(
      `${this.authResource}/refresh`,
    );
  }

  setDefaultCommonHeader(key: string, value: any) {
    this.axiosInstance.defaults.headers.common[key] = value;
  }
}

export const userApi = new UserApi();