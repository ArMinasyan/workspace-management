export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.DATABSE_PASSWORD || "postgres",
    db: process.env.DATABASE_DB,
    sync: false,
    logging: true
  },
  jwt_secret: process.env.JWT_SECRET,
  aws: {
    access_key: process.env.AWS_ACCESS_KEY,
    secret_key: process.env.AWS_SECRET_KEY,
    bucket_name: process.env.AWS_BUCKET_NAME,
    endpoint: process.env.AWS_ENDPOINT
  }
});
