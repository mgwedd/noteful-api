module.exports = {
  PORT : process.env.PORT || 8000,
  NODE_ENV : process.env.NODE_ENV || 'development',
  API_KEY : process.env.API_KEY || '1db06954-6279-447e-89aa-4dd7173ae4d4',
  DB_URL : process.env.DB_URL || 'postgresql://postgres@localhost/noteful',
  TEST_DB_URL : process.env.TEST_DB_URL || 'postgresql://postgres@localhost/noteful_test'
}
