module.exports = {
  apps : [{
    name      : 'diego-service',
    script    : 'dist/app.js',
    exec_mode: 'cluster',
    instances: "max",
    env: {
      name : 'diego-rsmq',
      NODE_ENV: 'development'
    }
  }]
}
