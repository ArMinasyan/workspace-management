export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABSE_PASSWORD || 'postgres',
    db: process.env.DATABASE_DB,
  },
  jwt_secret: process.env.JWT_SECRET,
});
