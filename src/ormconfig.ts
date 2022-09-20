export = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '79135803',
  database: 'products',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
