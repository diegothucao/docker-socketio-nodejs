module.exports = {
  apps : [{
    name      : 'diego-service',
    script    : 'dist/app.js',
    env: {
      name : 'diego-socketio',
      NODE_ENV: 'development'
    }
  }]
}
