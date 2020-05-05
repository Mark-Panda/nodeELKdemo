const express = require("express")
const compression = require("compression")
const path = require("path")
const proxyMiddleware = require("http-proxy-middleware")
const cookieParser = require("cookie-parser")
const router = require("./router");

const {
    logger,
    connLog
} = require('./logs/logger')
const {
    basicsInfo,
    logBasicsInfo
} = require('./config/index')
// const {proxyTable, maxAge} = require('./config/index')

const app = express();


app.use(connLog)


LG = logger //类似于传说中的G


app.get('/', (req, res) => {
    try {
        logger.info("正常业务测试")

        throw "异常"
        // res.send("hello world")
    } catch (error) {
        logger.error("异常测试", error)
        res.send("hello world")
    }
})

router(app);

app.listen(basicsInfo.appStartPort, () => {
    console.log(`http://127.0.0.1:${basicsInfo.appStartPort}`);
    console.log(`Example app listen on port ${basicsInfo.appStartPort}`)
})

// Object.keys(proxyTable).forEach(function (context) {
//     if (!proxyTable[context].ws) {
//         // 这里我是用的反向代理，当代理响应时，开始写日志
//         proxyTable[context].onProxyRes = writeLog
//     }
//     app.use(proxyMiddleware(context, proxyTable[context]))
// })


// function writeLog(proxyRes, req, res) {
//     var baseLog = `${req.method} ${proxyRes.statusCode} ${req.cookies.email} ${req.url}`
//     var msgObj = {
//         method: req.method,
//         statusCode: proxyRes.statusCode,
//         url: req.url,
//         email: req.cookies.email || '',
//         sessionId: req.cookies.sessionId || '',
//         instanceId: 'newTm',
//         nodeName: 'newTm'
//     }

//     if (proxyRes.statusCode < 400) {
//         logger.info(baseLog, msgObj)
//     } else {
//         logger.error(baseLog, msgObj)
//     }
// }