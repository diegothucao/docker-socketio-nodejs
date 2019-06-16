module.exports = {
  apps : [{
    name      : 'diego-service',
    script    : 'dist/app.js',
    env: {
      name : 'diego-rsmq',
      NODE_ENV: 'development',
      REDIS_PASSS: 'diegocao'
    }
  }]
}
