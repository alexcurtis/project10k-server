import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { WorkspaceModule } from './workspace/workspace.module'; 

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'test',
            password: 'test',
            database: 'project10k',
            entities: ['dist/**/*.model.js'],
            synchronize: true // Let TypeORM Create The Schema On The Fly (OK For Dev Work)
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Use The Code First Method
            sortSchema: true, // Auto Sort The Schema Alphabetically (Rather Than Code Definition)
            // playground: false // Turn Off Playground (Production Mode)
        }),
        WorkspaceModule
    ],
})
export class AppModule { }