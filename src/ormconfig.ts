export = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '79135803',
  database: 'products',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  migrationsRun: true,
  migrations: [__dirname + '/db/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  subscribers: [__dirname + '/db/subscribers/**/*{.ts,.js}'],
};
