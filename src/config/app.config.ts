export const appConfig = () => {
    return {
        environment: process.env.NODE_ENV || 'production',
        database: {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            name: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            syncronize: process.env.DB_SYNC === 'true' ? true : false,
            autoLoadEntities: process.env.AUTO_LOAD_ENTITIES === 'true' ? true : false,
        }
    }
}