import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'body-parser';

async function bootstrap() {
  const cloneBuffer = require('clone-buffer'); //eslint-disable-line

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors();
  app.use(
    json({
      verify: (req: any, res, buf, encoding) => {
        // important to store rawBody for Stripe signature verification
        if (req.headers['stripe-signature'] && Buffer.isBuffer(buf)) {
          req.rawBody = cloneBuffer(buf);
        }
        return true;
      },
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
