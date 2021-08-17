let express = require('express'); //引入express
let app = express(); // 创建实例app
let fs = require("fs"); //引入fs，fs 是node中一个文件操作模块，包括文件创建，删除，查询，读取，写入。

let bodyParser = require('body-parser'); // 这个模块是获取post请求传过来的数据。
let multer  = require('multer'); //multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use('/public', express.static('public')); // 设置静态文件的中间件
app.use(bodyParser.urlencoded({ extended: false })); // 判断请求体是不是json，不是的话把请求体转化为对象
app.use(multer({ dest: '/tmp/'}).array('file'));

app.get('/upload.html', function (req, res) {

    res.sendFile( __dirname + "/" + "upload.html" );
})
// 上传文件api
app.post('/file_upload', function (req, res) {
    let des_file = __dirname + "/public/" + req.files[0].originalname; //文件名
    fs.readFile( req.files[0].path, function (err, data) {  // 异步读取文件内容
        fs.writeFile(des_file, data, function (err) { // des_file是文件名，data，文件数据，异步写入到文件
            if( err ){
                console.log( err );
            }else{
                // 文件上传成功，respones给客户端
                response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ) );
        });
    });
})
app.post('/makenft',async function(req,res){
    const imageurl = req.body.imageurl

    const imageNameArr = imageurl.split("/")
    const imageName = imageNameArr[imageNameArr.length - 1]

    const {MakeMinty} = require('../minty')
    const minty = await MakeMinty()

    const jsonContent = `{ "name": "${imageName} nft", "description": "stariver pool erweima", "image_url": "${imageurl}" }`
    console.log("jsonContent---",jsonContent)
    const des_file = "public/"+imageName+".json"
    let ret = ""
    await fs.writeFile(des_file, jsonContent, function (err) { // des_file是文件名，data，文件数据，异步写入到文件
        if( err ){
            console.log( err );
        }else{
            // 文件上传成功，respones给客户端
            ret = {
                message:'jsonContent create successfully',
                jsonContent:jsonContent
            };
        }
        console.log( ret );
    });
    const imagejsonurl = imageurl + ".json"
    const RINKEBYADDR="0xaf6d667582953Eee0b059F656e8b125Aae636F53"
    console.log("RINKEBYADDR---:",RINKEBYADDR,"imagejsonurl---:",imagejsonurl,minty.contract.address)
    const mintRet =  await minty.contract.mintToken(RINKEBYADDR,imagejsonurl)
    console.log("tx---:",mintRet)
    const receipt = await mintRet.wait()
    for (const event of receipt.events) {
        if (event.event !== 'Transfer') {
            console.log('ignoring unknown event type ', event.event)
            continue
        }
        console.log( event.args.tokenId.toString())
    }

    res.end( JSON.stringify( ret ) );

})
let server = app.listen(8081, function () {

    let host = server.address().address
    let port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
