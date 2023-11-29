module.exports = {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'final work test',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  };