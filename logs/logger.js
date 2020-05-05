const log4js = require("log4js")

var {logBasicsInfo} = require('../config/index')
const logConfig = require('./log4j.json')
const {logHost, logPort} = logBasicsInfo
if (!logHost || !logPort) {
    console.log('没有配置 主机名 和端口');
}

// log4js.configurable({
//     appenders: [
//         { type: 'console', filename: './logs/info.log', category: 'app'}
//     ],
//     logstash: {
//         // 因为我们的logstash暴露的是tcp写日志的端口，所以我用了log4js-logstash-tcp，
//         // 这个需要安装 https://github.com/Aigent/log4js-logstash-tcp
//         // 如果你的logstash使用UDP的，参考 https://github.com/log4js-node/logstashUDP
//         type: 'log4js-logstash-tcp',
//         host: logHost,
//         port: parseInt(logPort)
//     },
//     categorise: {
//         default: { appenders: ['logstash'], level: 'debug'}
//     }
// })

// const logger = log4js.getLogger('default')


// log4js.configure({
//     appenders: { 
//       console: { type: 'console' } ,
//       console: { type : 'dateFile', filename: './logs/logInfo.log', daysToKeep: 1},
//       err: { type: 'logLevelFilter', level: 'error', maxLevel: 'error'}
//     },
//     categories: { default: { appenders: ['console', 'err'], level: 'all' } }
//   });
  
log4js.configure(logConfig)
const connLog = log4js.connectLogger(log4js.getLogger('http'),{ level: 'trace'})
  const logger = log4js.getLogger('logstash');
//   const connLog = log4js.connectLogger(logger)

  module.exports = {
      logger,
      connLog
  }
