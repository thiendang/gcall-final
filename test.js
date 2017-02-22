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
app.use(express.static('public'));
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
                    from: "GCalls Company <founders@gcall.vn>",
                    to: req.body.email, 
                    subject: '[Gcalls <> ' + req.body.company + '] Pre-work before Using Service',
                    generateTextFromHTML: true,
                    html: 
                        'Dear Mr/Ms. <b style="text-transform:capitalize;">' + req.body.name + '</b>,' + 
                        '<h3>A) Installation instruction:</h3>' + 
                        '<h4>1) Download Mobile Application:</h4>' + 
                        '<ol style="text-indent: 7px;">- iOS: <a href="https://itunes.apple.com/vn/app/gcall-call-center-management/id1124789061?mt=8">' + 
                        'https://itunes.apple.com/vn/app/gcall-call-center-management/id1124789061?mt=8</a></ol>' +
                        '<ol style="text-indent: 7px;">- Android(beta): <a href="https://play.google.com/store/apps/details?id=vn.gcall.gcall2">' +
                        'https://play.google.com/store/apps/details?id=vn.gcall.gcall2</a></ol>' +
                        '<h4>2) Sign up by your mobile number, then you can receive the call from the url format below:</h4>' +
                        '<table style="width:100%;border: 1px solid #d7d7c1;border-collapse: collapse;background: #f5f5ef;">' +
                          '<tr>' + 
                            '<th>' +
                                '<p>"<a href="https://call.gcall.vn/+">https://call.gcall.vn/+</a>" + "your hotline number"' +
                                '</p>' +
                            '</th>' +
                          '</tr>' +
                        '</table>' +
                        '<h4>3) Install widget on your website, please insert the below script format inside your website header (html):</h4>' + 
                        '<table style="width:100%;border: 1px solid #d7d7c1;border-collapse: collapse;background: #f5f5ef;">' +
                          '<tr>' +
                            '<th>' +
                                '<p>"&lt script type="text/javascript" src="<a href="https://gcall.vn/shopify/scripts.php?hl">https://gcall.vn/shopify/scripts.php?hl</a>"+ "[your hotline number]" + "&right=20&bottom=20"&gt&lt/script&gt"' +
                                '</p>' +
                            '</th>' +
                          '</tr>' +
                        '</table>' +
                        '<br>' +
                        '<i>* you can change the position of button widget by changing Right and Bottom </i><br>' +
                        '<i>* If you can not understand to install in this step, please forward this email to whom build your website. Or to connect us with that person. </i>' +
                        '<h3>B) Usual Term:</h3>' +
                        '<ol style="text-indent: 7px;">- Promotion Infomation: You have 1 month promotion with PREMIUM PACKAGE for unlimitedly creating groups and agents. After 1 month, we will turn if you don\'t plan to keep current package. At FREE PACKAGE, we only have one group and 1 agent subscription. To keep PREMIUM PACKAGE, please review below.</ol>' +
                        '<ol style="text-indent: 7px;">- Payment Method:</ol>' +
                            '<ol style="text-indent: 40px;">Pay per three months: 15 $</ol>' +
                            '<ol style="text-indent: 40px;">Pay per Six months: 28.5 $</ol>' +
                            '<ol style="text-indent: 40px;">Pay per year: 54 $</ol>' +
                        '<ol style="text-indent: 7px;">- Bank Transfer Information:</ol>' +
                            '<ol style="text-indent: 40px;text-decoration: underline;">In Vietnam:</ol>' +
                                '<ol style="text-indent: 60px;">Account Name: Nguyen Xuan Bang</ol>' +
                                '<ol style="text-indent: 60px;">Account num.: 0421000445050</ol>' +
                                '<ol style="text-indent: 60px;">Bank: JOINT STOCK COMMERCIAL BANK FOR FOREIGN TRADE OF VIETNAM</ol>' +
                                '<ol style="text-indent: 60px;">Swift: BFTVVNVX</ol>' +
                                '<ol style="text-indent: 60px;">Branch: Phu Tho Branch</ol>' +
                            '<ol style="text-indent: 40px;text-decoration: underline;">In Singapore:</ol>' +
                                '<ol style="text-indent: 60px;">May Bank SGD account</ol>' +
                                '<ol style="text-indent: 60px;">Account num: 04011105712</ol>' +
                                '<ol style="text-indent: 60px;">Swift code: MBBESGSG</ol>' +
                                '<ol style="text-indent: 60px;">Account Name: GCALLS VIETNAM PTE LTD</ol>' +
                                '<ol style="text-indent: 60px;">Bank Code: 7302</ol>' +
                                '<ol style="text-indent: 60px;">Branch Code: 001</ol>' +
                                '<ol style="text-indent: 60px;">Branch Address: MAYBANK TOWER, 2 BATTERY ROAD, SINGAPORE, 049907</ol>' +
                        '<h3>C) Upgrade Plan Offer:</h3>' +
                        '<ol style="text-indent: 7px;">- Please review our attached business proposal. If you are looking for higher service. We can customize special service for you.</ol>' +
                        '<ol style="text-indent: 7px;">- Advantage: unified one outcoming calls hotline, more report form, integrated GSM/PSTN Network and more professional.</ol>' +
                        'Thanks & Best Regards,<br>' +
                        'Customer Service Dept.'
                      ,
                    attachments: [{
                        filename: 'UpgradedPlan_BusinessProposal.pdf',
                        path: __dirname + '/public/UpgradedPlan_BusinessProposal.pdf',
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
                    from: 'GCalls Company <founders@gcall.vn>', 
                    to: 'hr@gcall.vn, minh.thai@gcalls.co', 
                    subject: 'Khách hàng đăng kí trên website', 
                    generateTextFromHTML: true,
                    html:
                        // 'Tên khách hàng:<b>' + req.body.name + '</b><br>' + 
                        // 'Email:<b>' + req.body.email + '</b><br>' +  
                        // 'Số điện thoại:<b>' + req.body.phone + '</b><br>' +  
                        // 'Company:<b>' + req.body.company + '</b><br>' 
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

                // send mail with defined transport object
                transporter.sendMail(mailOption, function(error, info) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
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