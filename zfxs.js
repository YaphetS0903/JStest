/*
软件名称:追疯小说
更新时间：2021-10-26 @YaphetS0903
脚本说明：追疯小说。。。下载地址，appstore搜索下载
小毛，一天一毛三到一毛五，10元提现
刷时长一次30-40分钟，不能连着刷，中间隔30-40分钟刷
本脚本以学习为主
获取数据： 点击福利获取数据
TG通知群:https://t.me/tom_ww
TG电报交流群: https://t.me/tom_210120
boxjs地址 :  
https://raw.githubusercontent.com/YaphetS0903/JStest/main/YaphteS0903.boxjs.json
追疯小说
青龙环境抓取链接https://book.beiyinapp.com/app/welfare/index
环境配置(@隔开，json格式)export zfxshd='抓取的header1@抓取的header2'
追疯小说极速版
圈X配置如下，其他自行测试
[task_local]
#追疯小说
10 6-23 * * * https://raw.githubusercontent.com/YaphetS0903/JStest/main/zfxs.js, tag=追疯小说, enabled=true
[rewrite_local]
#追疯小说
https://book.beiyinapp.com/app/welfare/index url script-request-header https://raw.githubusercontent.com/YaphetS0903/JStest/main/zfxs.js
[MITM]
hostname = book.beiyinapp.com
*/
const $ = new Env('追疯小说');
let status;

status = (status = ($.getval("zfxsstatus") || "1")) > 1 ? `${status}` : "";
let zfxsurlArr = [], zfxshdArr = [], zfxscount = ''
let zfxsurl = $.getdata('zfxsurl')
let zfxshd= $.isNode() ? (process.env.zfxshd ? process.env.zfxshd : "") : ($.getdata('zfxshd') ? $.getdata('zfxshd') : "")

let b = Math.round(new Date().getTime() / 1000).toString();
let DD = RT(0, 999)
let tz = ($.getval('tz') || '1');
let tx = ($.getval('tx') || '1');
let id = '', txid = '', ppid = '', amt = '', redid2 = '', redid = ''
let target = ''
$.message = ''
let zfxshds = ""




!(async () => {
    if (typeof $request !== "undefined") {
        await zfxsck()
    } else {
        if(!$.isNode()){
        zfxsurlArr.push($.getdata('zfxsurl'))
        zfxshdArr.push($.getdata('zfxshd'))

        let zfxscount = ($.getval('zfxscount') || '1');
        for (let i = 2; i <= zfxscount; i++) {
            zfxsurlArr.push($.getdata(`zfxsurl${i}`))
            zfxshdArr.push($.getdata(`zfxshd${i}`))

        }
        console.log(
            `\n\n=============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() +
                new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000
            ).toLocaleString()} ===============================================\n`);
        for (let i = 0; i < zfxshdArr.length; i++) {
            if (zfxshdArr[i]) {

                zfxsurl = zfxsurlArr[i];
                zfxshd = zfxshdArr[i];


                $.index = i + 1;
                console.log(`\n\n开始【追疯小说${$.index}，运行成功。】`)

                await zfxssignpd()//签到
                await $.wait(3000)

                await zfxsid()
                await $.wait(5000)


                await zfxstime()//砍价
                await $.wait(3000)

                        
               message()
            }
        }
       }else {
        if (process.env.zfxshd && process.env.zfxshd.indexOf('@') > -1) {
            zfxshdArr = process.env.zfxshd.split('@');
          console.log(`您选择的是用"@"隔开\n`)
      } else {
        zfxshds = [process.env.zfxshd]
      };
      Object.keys(zfxshds).forEach((item) => {
      if (zfxshds[item]) {
        zfxshdArr.push(zfxshds[item])
      }
  })
        console.log(`共${zfxshdArr.length}个cookie`)
          for (let k = 0; k < zfxshdArr.length; k++) {
              $.message = ""
              zfxshd = zfxshdArr[k]
              $.index = k + 1;
        console.log(`\n开始【追疯小说${$.index}】运行成功。`)
        await zfxssignpd()//签到
        await $.wait(3000)

        await zfxsid()
        await $.wait(5000)


        await zfxstime()//砍价
        await $.wait(3000)
        message()
    }
}

    }
})()

    .catch((e) => $.logErr(e))
    .finally(() => $.done())




function zfxsck() {
    if ($request.url.indexOf("welfare/index") > -1) {
        const zfxsurl = $request.url
        if (zfxsurl) $.setdata(zfxsurl, `zfxsurl${status}`)
        $.log(zfxsurl)

        const zfxshd = JSON.stringify($request.headers)
        if (zfxshd) $.setdata(zfxshd, `zfxshd${status}`)
        $.log(zfxshd)



        $.msg($.name, "", `追疯小说${status}获取数据成功`)

    }
}

//签到判断
function zfxssignpd(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://book.beiyinapp.com/app/welfare/my`,
            headers: JSON.parse(zfxshd),
          
        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.status == 200) {
                    if(result.data.todaysignin ==1){
                        console.log(`【今日已签到】\n`)
                        console.log(`【连续签到天数】：${result.data.continuitySigninDays}\n`)
                        console.log(`【今日签到获得金币】：${result.data.todaysignincan}\n`)
                        console.log(`【明日签到获得金币】：${result.data.tomorrowgold}\n`)
                        console.log(`【当前金币余额】：${result.data.gold}\n`)
                        
                         $.message += `【今日已签到】\n`
                          $.message += `【连续签到天数】：${result.data.continuitySigninDays}\n`
                           $.message += `【今日签到获得金币】：${result.data.todaysignincan}\n`
                            $.message += `【明日签到获得金币】：${result.data.tomorrowgold}\n`
                             $.message += `【当前金币余额】：${result.data.gold}\n`
                    }else{
                        await $.wait(10000)
                        await zfxssign()
                    }
                  


                } else {

                    console.log(`【签到失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//签到
function zfxssign(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://book.beiyinapp.com/app/welfare/signin`,
            headers: JSON.parse(zfxshd),
          
        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.status == 200) {

                    console.log(`【签到】：${result.message}\n`)
                    console.log(`【签到获得金币】：${result.data.gold}\n`)

                    await $.wait(10000)
                    await zfxssigndb()


                } else {

                    console.log(`【签到失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}




//签到翻倍
function zfxssigndb(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://book.beiyinapp.com/app/Welfare/CompleteRewardVideoADActivity`,
            headers: JSON.parse(zfxshd),
            body: `type=1
&
welfare_id=0`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.status == 200) {

                    console.log(`【签到翻倍】：${result.message}\n`)
                    console.log(`【签到翻倍获得金币】：${result.data.gold}\n`)

                } else {

                    console.log(`【签到翻倍失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//拆红包id获取
function zfxsid(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://book.beiyinapp.com/app/welfare/redPacket`,
            headers: JSON.parse(zfxshd),
         
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.status == 200) {
                  
                        console.log(`【获得拆红包id】：${result.data[2].id}\n`)
                        redid =result.data[2].id
                        await $.wait(2000)
                        await zfxsredinfo()
                    

                
                } else {

                    console.log(`【查询拆红包id失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//拆红包信息
function zfxsredinfo(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://book.beiyinapp.com/app/welfare/getRedPacketList?id=${redid}`,
            headers: JSON.parse(zfxshd),
            
        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.status == 200) {

                    console.log(`【查询拆红包信息】：${result.message}\n`)
                    for(let p=0;p<4;p++){
                        redid2=result.data[p].id
                        if(result.data[p].status ==0){
                        await $.wait(5000)
                        await zfxsred(redid2)
                        await $.wait(10000)
                            }else{
                            console.log(`【此红包已拆】\n`)
                        }
                    }

                } else {

                    console.log(`【查询拆红包信息失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//拆红包
function zfxsred(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://book.beiyinapp.com/app/welfare/openRedPacket`,
            headers: JSON.parse(zfxshd),
            body: `id=${redid2}`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.status == 200) {

                    console.log(`【拆红包】：${result.message}\n`)
                } else {

                    console.log(`【拆红包失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//刷时长
function zfxstime (timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://book.beiyinapp.com/app/UserReadHistory/ReadRecord`,
            headers: JSON.parse(zfxshd),
            body: `book_id=4140
            &
            number=5
            &
            read_time=15.170000
            &
            speed=5.000000`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                 if (result.status == 200) {

                    console.log(`【开始刷时长】：${result.message}\n`)
                    if(result.data.next_tasks == "null"){
                        console.log(`【刷时长失败，请稍后再来试】\n`)
                        $.message += `【刷时长失败，请稍后再来试】\n`
                    }else{
                        console.log(`【刷时长】：${result.message}\n`)
                        $.message += `【刷时长】：${result.message}\n`
                    }


                } else {

                    console.log(`【开始刷时长失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


function message() {
    if (tz == 1) { $.msg($.name, "", $.message) }
}
//时间
nowTimes = new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
);

function RT(X, Y) {
    do rt = Math.floor(Math.random() * Y);
    while (rt < X)
    return rt;
}


//console.log('\n'+getCurrentDate());
function getCurrentDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;


}







function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
