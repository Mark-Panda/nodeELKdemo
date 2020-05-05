
module.exports = app => {

    /**
     * 注册日志
     */
    app.get('/register', (req, res) => {
        LG.info("日志测试LG")
        res.send("success")
    })
}