module.exports = {
  apps: [
    {
      name: 'derlev-portfolio',
      exec_mode: 'fork',
      instances: '1',
      script: 'npm',
      args: 'start'
    }
  ]
}