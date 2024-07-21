import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Use The Code First Method
            sortSchema: true, // Auto Sort The Schema Alphabetically (Rather Than Code Definition)
            // playground: false // Turn Off Playground (Production Mode)
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'test',
            password: '',
            database: 'project10k',
            entities: ['dist/**/*.model.js'],
            synchronize: false
        })
    ],
})
export class AppModule { }