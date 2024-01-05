module.exports = {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'final work test',
      //look up how next line works, I can't give these credentials
      //.env.POSTGRESS
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  };