import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 기본 URL 프리픽스 설정
  app.setGlobalPrefix('api');

  app.enableCors();

  //api 문서 초기화(설정)
  const swaggerConfig = new DocumentBuilder()
    .setTitle('KoreanmarketAPI') //명칭
    .setDescription('public koreamarketAPI') //설명
    .setVersion('1.0') //버전 (업데이트도가능 초기값 1.0)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', name: 'JWT', in: 'header' },
      'access-token',
    )
    .setBasePath('api') //기본 베이스 url
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document); //api문서를 접속할 주소설정
  app.useGlobalPipes(new ValidationPipe()); //적용을하겠다

  // await app.setGlobalPrefix('api');
  await app.listen(8000);
}
bootstrap();
