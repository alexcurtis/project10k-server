import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    // Microservice Registration
    imports: [ClientsModule.register([{ name: 'USSEC', transport: Transport.TCP }])],
    exports: [ClientsModule],
})
export class MicroservicesModule {}
