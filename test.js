var express = require('express');
var bodyParser = require('body-parser');
var engines = require('consolidate');
var path = require("path");
var logger = require("morgan");
var xoauth2 = require('xoauth2');
var https = require('https');
var nodemailer = require("nodemailer");
var app = express();

var https = require('https');
var parser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));
app.use(logger("dev"));
app.set('view engine','ejs');
app.set('views', './views');
// app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
        res.render('index.ejs');
});
app.get('/en', function(req, res) {
        res.render('index-en.ejs');
});
app.get('/vn', function(req, res) {
        res.render('index-vi.ejs');
});
app.post('/', parser, function(req, res) {
    verifyRecaptcha(req.body["recaptcha"], function(success) {
            if (success) {
                var smtpTransport = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        xoauth2: xoauth2.createXOAuth2Generator({
                            user: "founders@gcall.vn",
                            clientId: "507886651960-b386d3g36eolbs124dlbl701rvq4s7d5.apps.googleusercontent.com",
                            clientSecret: "XN5n2gvq9PXAzQ3APoSHGZgf",
                            refreshToken: "1/1YtOXgsGOhsunT8wTDg1mVAVYhgLq-BOciT7wCr8f34",
                        })
                    }
                });
                var mailOptions = {
                    from: "Gcalls Company <founders@gcall.vn>",
                    to: req.body.email,
                    subject: '[Gcalls <> ' + req.body.company + '] Pre-work before Using Service',
                    generateTextFromHTML: true,
                    html:
                        'Chào Anh/Chị. <b style="text-transform:capitalize;">' + req.body.name + '</b>,' + '<br>' + '<br>' +
                        'Cảm ơn quý khách đã dành sự quan tâm đến sản phẩm của Gcalls. Trong thời gian chờ đợi chúng tôi cung cấp tài khoản demo account, quý khách có thể xem video hướng dẫn sử dụng sản phẩm:' +
                        '<a href="https://www.youtube.com/watch?v=w0DShKQm1Ks">https://www.youtube.com/watch?v=w0DShKQm1Ks</a>' + '<br>' + '<br>' +
                        'Chúng tôi cũng đã đính kèm thông tin chi tiết về sản phẩm để tham khảo thêm nếu cần thiết.'  + '<br>' + '<br>' +
                        'Cảm ơn quý khách,' + '<br>' +
                        'GCALLS VIETNAM PTE LTD'
                      ,
                    attachments: [{
                        filename: 'UpgradedPlan_BusinessProposal.pdf',
                        path: __dirname + '/static/Gcalls-Brochure.pdf',
                        contentType: 'application/pdf'
                    }]
                };
                smtpTransport.sendMail(mailOptions, function(error, response) {
                    if (error) {
                        console.log("mail error", error);
                    } else {
                        console.log(response);
                    }
                smtpTransport.close();
                });

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        xoauth2: xoauth2.createXOAuth2Generator({
                            user: "founders@gcall.vn",
                            clientId: "507886651960-b386d3g36eolbs124dlbl701rvq4s7d5.apps.googleusercontent.com",
                            clientSecret: "XN5n2gvq9PXAzQ3APoSHGZgf",
                            refreshToken: "1/1YtOXgsGOhsunT8wTDg1mVAVYhgLq-BOciT7wCr8f34",
                        })
                    }
                });

                // setup email data with unicode symbols
                var mailOption = {
                    from: 'Gcalls Company <founders@gcall.vn>',
                    to: 'sales@gcalls.co, minh.thai@gcalls.co',
                    // to: 'thien.dang@gcall.vn',
                    subject: 'Khách hàng đăng kí trên website',
                    generateTextFromHTML: true,
                    html:
                        '<table style="width:100%;border: 1px solid black;border-collapse: collapse;">' +
                          '<tr>' +
                            '<th style="padding: 5px;border: 1px solid black;border-collapse: collapse;text-align: left;">Tên khách hàng</th>' +
                            '<th style="padding: 5px;border: 1px solid black;border-collapse: collapse;text-align: left;">Email</th>' +
                            '<th style="padding: 5px;border: 1px solid black;border-collapse: collapse;text-align: left;">Số điện thoại</th>' +
                            '<th style="padding: 5px;border: 1px solid black;border-collapse: collapse;text-align: left;">Company</th>' +
                          '</tr>' +
                          '<tr>' +
                            '<td style="padding: 5px;border: 1px solid black;border-collapse: collapse;">'+req.body.name+'</td>' +
                            '<td style="padding: 5px;border: 1px solid black;border-collapse: collapse;">'+req.body.email+'</td>' +
                            '<td style="padding: 5px;border: 1px solid black;border-collapse: collapse;">'+req.body.phone+'</td>' +
                            '<td style="padding: 5px;border: 1px solid black;border-collapse: collapse;">'+req.body.company+'</td>' +
                          '</tr>' +
                        '</table>'
                }

                transporter.sendMail(mailOption, function(error, info) {
                    if (error) {
                        return console.log(error);
                    } else {
                         console.log('Message %s sent: %s', info.messageId, info.response);
                        }
                    transporter.close();
                });
                    res.end(JSON.stringify({ registeredSuccessfully: true }));
            } else {
                    res.end(JSON.stringify({ registeredSuccessfully: false, reason: "Please check captcha here!!!" }));
            }
    });
});

app.listen(9000);

var SECRET = "6LfExAsUAAAAAMsjxTJ8IxiJQekspWNJsqMz1SRY";

function verifyRecaptcha(key, callback) {
        https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + key, function(res) {
                var data = "";
                res.on('data', function (chunk) {
                        data += chunk.toString();
                });
                res.on('end', function() {
                        try {
                                var parsedData = JSON.parse(data);
                                console.log(parsedData);
                                callback(parsedData.success);
                        } catch (e) {
                                callback(false);
                        }
                });
        });
}
