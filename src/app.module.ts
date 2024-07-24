import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import mongodbConfig from './config/mongodb.config';
import { AccountModule } from './account/account.module';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [mongodbConfig],
            isGlobal: true
        }),
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
              autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
              installSubscriptionHandlers: true,
              sortSchema: true,
              playground: true,
              debug: configService.get<boolean>("DEBUG"),
              uploads: false,
            }),
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('MONGO_URI'),
                dbName: 'project10k'
            })
        }),
        AccountModule,
        WorkspaceModule
    ]
})
export class AppModule { }