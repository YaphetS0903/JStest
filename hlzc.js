/*

软件名称:欢乐找茬 
更新时间：2021-09-28 @YaphetS0903
脚本说明：欢乐找茬自动刷红包。。
玩法和其他游戏一样。先把其他游戏的重写关了。。。
欢乐找茬使用方法:
玩几关弹出红包看视频，领取红包获得数据
本脚本以学习为主

TG通知群:https://t.me/tom_ww
TG电报交流群: https://t.me/tom_210120

boxjs地址 :  

https://raw.githubusercontent.com/YaphetS0903/JStest/main/YaphteS0903.boxjs.json

欢乐找茬
圈X配置如下，其他软件自行测试
[task_local]
#欢乐找茬
0,30 * 6-23 * * * https://raw.githubusercontent.com/YaphetS0903/JStest/main/hlzc.js, tag=欢乐找茬, enabled=true
[rewrite_local]
#欢乐找茬视频
https://springglasses.com/next/api/app/ios/award/wheel? url script-request-body https://raw.githubusercontent.com/YaphetS0903/JStest/main/hlzc.js
#欢乐找茬红包
https://springglasses.com/next/api/app/ios/credit/wheel? url script-request-body https://raw.githubusercontent.com/YaphetS0903/JStest/main/hlzc.js
[MITM]
hostname = springglasses.com
*/
const $ = new Env('欢乐找茬');
let status;
status = (status = ($.getval("hlzcstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const hlzchdArr = [],hlzcbodyArr = [],hlzcsphdArr = [],hlzcspbodyArr = [],hlzccount = ''
let hlzchd = $.getdata('hlzchd')
let hlzcbody = $.getdata('hlzcbody')
let hlzcspbody = $.getdata('hlzcspbody')
let hlzcsphd = $.getdata('hlzcsphd')

!(async () => {
  if (typeof $request !== "undefined") {
    await hlzcck()
   
  } else {
    hlzchdArr.push($.getdata('hlzchd'))
    hlzcbodyArr.push($.getdata('hlzcbody'))
	 hlzcsphdArr.push($.getdata('hlzcsphd'))
    hlzcspbodyArr.push($.getdata('hlzcspbody'))
    let hlzccount = ($.getval('hlzccount') || '1');
  for (let i = 2; i <= hlzccount; i++) {
    hlzchdArr.push($.getdata(`hlzchd${i}`))
    hlzcbodyArr.push($.getdata(`hlzcbody${i}`))
	hlzcsphdArr.push($.getdata(`hlzcsphd${i}`))
    hlzcspbodyArr.push($.getdata(`hlzcspbody${i}`))
  }
    console.log(`------------- 共${hlzchdArr.length}个账号-------------\n`)
      for (let i = 0; i < hlzchdArr.length; i++) {
        if (hlzchdArr[i]) {
          hlzchd = hlzchdArr[i];
          hlzcbody = hlzcbodyArr[i];
		  hlzcsphd = hlzcsphdArr[i];
          hlzcspbody = hlzcspbodyArr[i];
          $.index = i + 1;
          console.log(`\n开始【欢乐找茬${$.index}】`)
   
    for(let j=0; j < 10;j++){
         await hlzcsp();
         }

    
    
  }
}}

})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
//数据获取


function hlzcck() {
   if ($request.url.indexOf("credit/wheel?") > -1) {
 
  const hlzchd = JSON.stringify($request.headers)
        if(hlzchd)    $.setdata(hlzchd,`hlzchd${status}`)
$.log(hlzchd)
const hlzcbody = $request.body
        if(hlzcbody)    $.setdata(hlzcbody,`hlzcbody${status}`)
$.log(hlzcbody)
   $.msg($.name,"",'欢乐找茬'+`${status}` +'红包数据获取成功！')
  }else if ($request.url.indexOf("award/wheel?") > -1) {
 const hlzcsphd = JSON.stringify($request.headers)
        if(hlzcsphd)    $.setdata(hlzcsphd,`hlzcsphd${status}`)
$.log(hlzcsphd)
const hlzcspbody = $request.body
        if(hlzcspbody)    $.setdata(hlzcspbody,`hlzcspbody${status}`)
$.log(hlzcspbody)
   $.msg($.name,"",'欢乐找茬'+`${status}` +'视频数据获取成功！')
  }
}

//红包
function hlzchb(timeout = 0) {
  return new Promise((resolve) => {

let url = {
        url : 'https://springglasses.com/next/api/app/ios/credit/wheel?',
        headers : JSON.parse(hlzchd),
        body : hlzcbody,
}
      $.post(url, async (err, resp, data) => {
        try {
    //const result = JSON.parse(data)
        if (data && data.length >= 80) {
  $.log(`\n欢乐找茬:成功领取红包`)
} else {

        $.log(`\n欢乐找茬:领取失败${data}`)
 
}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}


function hlzcsp(timeout = 0) {
  return new Promise((resolve) => {

let url = {
        url : 'https://springglasses.com/next/api/app/ios/award/wheel?',
        headers : JSON.parse(hlzcsphd),
        body : hlzcspbody,
}
      $.post(url, async (err, resp, data) => {
        try {
    const result = JSON.parse(data)
        if (data && data.length >= 80) {
  $.log(`\n欢乐找茬视频观看成功`)
    await $.wait(5000)
   await hlzchb();
    
} else {

        $.log(`\n欢乐找茬视频观看失败:${data}`)
 
}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
