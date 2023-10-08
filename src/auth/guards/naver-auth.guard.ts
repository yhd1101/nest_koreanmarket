import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Provider } from '@users/entities/provider.enum';

@Injectable()
export class NaverAuthGuard extends AuthGuard(Provider.NAVER) {}
