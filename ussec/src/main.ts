import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import helmet from 'helmet';

// IFrame Security (Opening Proxy Docs On The 10K Frontend)
const IFRAME_SECURITY = [`'self'`, 'localhost:3001'];

async function bootstrap() {
  //Http Listener (Proxy Etc)
  const httpApp = await NestFactory.create(AppModule);
  httpApp.enableCors();
  httpApp.use(
    helmet({
      crossOriginResourcePolicy: false,
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [`'self'`, 'data:'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [`'self'`],
          frameSrc: IFRAME_SECURITY,
          frameAncestors: IFRAME_SECURITY,
        },
      },
    }),
  );
  await httpApp.listen(3005);

  // Start The TCP Microservice Listener
  const tcpApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
    },
  );
  tcpApp.listen();
}
bootstrap();
