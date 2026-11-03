const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
  mongoUri:
    process.env.MONGODB_URI ||
    'mongodb+srv://lchhaykhy_db_user:10sevO82Ibs3voAO@cluster0.wfkwmgd.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster0',
}

export default config
