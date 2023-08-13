import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //api 문서 초기화(설정)
  const swaggerConfig = new DocumentBuilder()
    .setTitle('KoreanmarketAPI') //명칭
    .setDescription('public koreamarketAPI') //설명
    .setVersion('1.0') //버전 (업데이트도가능 초기값 1.0)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document); //api문서를 접속할 주소설정

  await app.setGlobalPrefix('api');
  await app.listen(8000);
}
bootstrap();
