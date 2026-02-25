import { Global, Module } from "@nestjs/common";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from 'mysql2/promise';
import * as schema from './schema';

// carregando .env
config();

// constante para injecao de deps
export const DB_CONNECTION = 'DB_CONNECTION';

@Global()
@Module({
    providers: [
        {
            provide: DB_CONNECTION,
            useFactory: async () => {
                const pool = mysql.createPool({
                    uri: process.env.DATABASE_URL,
                })

                return drizzle(pool, { schema, mode: 'default'})
            },
        },
    ],
    exports: [DB_CONNECTION],
})
export class DatabaseModule {}