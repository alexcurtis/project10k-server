import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import GraphQLJSON from 'graphql-type-json';
import { UUIDResolver } from 'graphql-scalars';
import { LoggerModule } from 'nestjs-pino';

import mongodbConfig from './config/mongodb.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { JournalModule } from './journal/journal.module';
import { JournalEntryModule } from './journal/entry/journal-entry.module';
import { CompanyModule } from './company/company.module';
import { CompanyFilingModule } from './company/filing/company-filing.module';
import { MicroservicesModule } from './microservices/microservices.module';

@Module({
    imports: [
        LoggerModule.forRoot({
            pinoHttp: {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        singleLine: true,
                    },
                },
            },
        }),
        ConfigModule.forRoot({
            load: [mongodbConfig],
            isGlobal: true,
        }),
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
                installSubscriptionHandlers: true,
                sortSchema: true,
                playground: true,
                debug: configService.get<boolean>('DEBUG'),
                uploads: false,
                resolvers: { JSON: GraphQLJSON, UUID: UUIDResolver },
            }),
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('MONGO_URI'),
                dbName: 'project10k',
            }),
        }),
        AuthModule,
        UserModule,
        MicroservicesModule,
        AccountModule,
        WorkspaceModule,
        JournalModule,
        JournalEntryModule,
        CompanyModule,
        CompanyFilingModule,
    ],
})
export class AppModule {}
