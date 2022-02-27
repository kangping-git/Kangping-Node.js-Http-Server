const http = require("http")
const chalk = require("chalk")
const fs = require("fs")
class app{
    constructor(){
        this.listened = false
        this.error = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><Error_Message></title>
</head>
<body>
    <h1><Error_Message></h1>
</body>
</html>`
        this.functions = []
        this.httpObj = http.createServer((req,res) => {
            let functions = this.functions.filter((value) => {
                return value.url == req.url && value.method == req.method
            })
            res.sendFile = (path) => {
                let file = fs.readFileSync(path)
                res.writeHead(200,{"Content-Type":"charset=utf-8"})
                res.write(file.toString("utf-8"))
                res.end()
            }
            req.ip = (req.headers["X-Forwarded-For"] || req.connection.remoteAddress)
            if (functions.length > 0){
                let err_ = false
                functions.forEach((value) => {
                    if (!err_){
                        try{
                            value.func(req,res)
                        }catch(err){
                            err_ = true
                            console.log(err);
                            res.statusCode = 500
                            res.end(this.error.replace(/<Error_Code>/g,500).replace(/<Error_Message>/g,"500 Server Error"))
                        }
                    }
                })
                if (err_){
                    console.log(req.url + " " + req.method + " " + chalk.red(500) + " " + (req.headers["X-Forwarded-For"] || req.connection.remoteAddress))
                }else{
                    console.log(req.url + " " + req.method + " " + chalk.green(200) + " " + (req.headers["X-Forwarded-For"] || req.connection.remoteAddress))
                }
            }else{
                res.statusCode = 404
                res.end(this.error.replace(/<Error_Code>/g,404).replace(/<Error_Message>/g,"404 Not Found"))
                console.log(req.url + " " + req.method + " " + chalk.yellow(404) + " " + (req.headers["X-Forwarded-For"] || req.connection.remoteAddress))
            }
        })
    }
    listen(port=3000){
        if (this.listened == false){
            this.listened = true
            this.httpObj.listen(port)
        }
    }
    /**
     * 
     * @param {String} url
     * @param {function} func
     */
    get(url,func){
        this.functions.push({
            url:url,
            func:func,
            method:"GET"
        })
    }
    post(url,func){
        this.functions.push({
            url:url,
            func:func,
            method:"POST"
        })
    }
    error_public_file(path){
        if (fs.existsSync(path)){
            if (fs.statSync(path).isFile()){
                this.error = fs.readFileSync(path,"utf-8")
            }else{
                throw "Not Found File '" + path + "'"
            }
        }else{
            throw "Not Found File '" + path + "'"
        }
    }
}
module.exports = {
    app:app
}