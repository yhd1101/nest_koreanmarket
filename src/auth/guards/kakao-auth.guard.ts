import { AuthGuard } from '@nestjs/passport';
import { Provider } from '../../users/entities/provider.enum';

export class KakaoAuthGuard extends AuthGuard(Provider.KAKAO) {}
