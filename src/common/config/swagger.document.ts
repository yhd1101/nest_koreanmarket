import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocument {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle('KoreanmarketAPI') //명칭
      .setDescription('public koreamarketAPI') //설명
      .setVersion('1.0') //버전 (업데이트도가능 초기값 1.0)
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', name: 'JWT', in: 'header' },
        'access-token',
      )
      .setBasePath('api') //기본 베이스 url
      .build();
  }
}
