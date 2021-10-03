/*
软件名称:趣键盘极速版 
感谢@Tom大佬指点
更新时间：2021-10-3 @YaphetS0903
脚本说明：趣键盘极速版。。。appstore搜索下载
邀请码:fgpidh（随心填，感谢支持）

注意！！！！！！！！！只能放本地抓数据！！
因为软件限制，不能调用远程重写抓取数据，只能把脚本放在本地然后抓数据
或者自己使用抓包软件抓取header的json填入boxjs中


如果进不去任务界面：
1 vpn关掉后再进入软件，然后再打开vpn获取数据
2 越狱用户可能进不去，暂无解决办法

本脚本以学习为主

获取数据： 点击收取猪币获取数据（如果提示无网络，多点几下，或把脚本放在本地，用本地重写获取）。
TG通知群:https://t.me/tom_ww
TG电报交流群: https://t.me/tom_210120
boxjs地址 :  
https://raw.githubusercontent.com/YaphetS0903/JStest/main/YaphteS0903.boxjs.json

趣键盘极速版
圈X配置如下，其他自行测试
[task_local]
#趣键盘极速版
10 6-23 * * * https://raw.githubusercontent.com/YaphetS0903/JStest/main/qjp.js, tag=趣键盘极速版, enabled=true
[rewrite_local]
#趣键盘极速版
https://qjp.qujianpan.com/qjp-app/game/savingsBank/collectPigMoney url script-request-body https://raw.githubusercontent.com/YaphetS0903/JStest/main/qjp.js
[MITM]
hostname = qjp.qujianpan.com
*/

const $ = new Env('趣键盘极速版');
let status;

status = (status = ($.getval("qjpstatus") || "1")) > 1 ? `${status}` : "";
const qjpurlArr = [], qjphdArr = [], qjpbodyArr = [], qjpcount = ''
let qjpurl = $.getdata('qjpurl')
let qjphd = $.getdata('qjphd')
let qjpbody = $.getdata('qjpbody')
let b = Math.round(new Date().getTime() / 1000).toString();
let ticket=''
let DD = RT(28000, 35000)
let tz = ($.getval('tz') || '1');
let tx = ($.getval('tx') || '1');
let id = '', txid = ''
let token = ''
$.message = ''





!(async () => {
    if (typeof $request !== "undefined") {
        await qjpck()
    } else {
        qjpurlArr.push($.getdata('qjpurl'))
        qjphdArr.push($.getdata('qjphd'))
        qjpbodyArr.push($.getdata('qjpbody'))

        let qjpcount = ($.getval('qjpcount') || '1');
        for (let i = 2; i <= qjpcount; i++) {
            qjpurlArr.push($.getdata(`qjpurl${i}`))
            qjphdArr.push($.getdata(`qjphd${i}`))
            qjpbodyArr.push($.getdata(`qjpbody${i}`))
        }
        console.log(
            `\n\n=============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() +
                new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000
            ).toLocaleString()} ===============================================\n`);
        for (let i = 0; i < qjphdArr.length; i++) {
            if (qjphdArr[i]) {

                qjpurl = qjpurlArr[i];
                qjphd = qjphdArr[i];
                qjpbody = qjpbodyArr[i];

                $.index = i + 1;
                console.log(`\n\n开始【趣键盘${$.index}】`)

                
                await $.wait(2000)
                await qjpfbk()
				await $.wait(2000)
                await qjpcsk()
				await $.wait(2000)
                await qjpyqk()
				await $.wait(2000)
				await qjpsteal()
				await $.wait(2000)
				await qjpbox()
				await $.wait(2000)
				for(let x=0;x<2;x++){
				$.index=x+1
				console.log(`\n【开始第${x+1}次执行转盘任务!】\n等待2秒开始转盘`)
				await qjpzp()
				await $.wait(2000)
				}
				await qjpsprw()
				await $.wait(2000)
				await qjpsq()
				await $.wait(2000)
                await qjpdh() 
				await $.wait(2000)
				await qjpbalance()
				
                message()
            }
        }
    }
})()

    .catch((e) => $.logErr(e))
    .finally(() => $.done())



function qjpck() {
    if ($request.url.indexOf("collectPigMoney") > -1) {
        const qjpurl = $request.url
        if (qjpurl) $.setdata(qjpurl, `qjpurl${status}`)
        $.log(qjpurl)

        const qjphd = JSON.stringify($request.headers)
        if (qjphd) $.setdata(qjphd, `qjphd${status}`)
        $.log(qjphd)

        const qjpbody = $request.body
        if (qjpbody) $.setdata(qjpbody, `qjpbody${status}`)
        $.log(qjpbody)

        $.msg($.name, "", `趣键盘${status}获取headers成功`)

    }
}



//收取金币
function qjpsq(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBank/collectPigMoney`,
            headers: JSON.parse(qjphd),
            body: qjpbody,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【收取金币】：${result.data}\n`)
                    $.message += `【收取金币】：${result.data}\n`
                } else {

                    console.log(`【收取失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//翻倍卡
function qjpfbk(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBank/unlockDouble`,
            headers: JSON.parse(qjphd),
            body: `{
  "taskType": "3"
}`
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【翻倍卡加速】：${result.message}\n`)
                    $.message += `【翻倍卡加速】：${result.message}\n`
                } else {

                    console.log(`【翻倍卡加速】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//财神卡
function qjpcsk(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBank/unlockDouble`,
            headers: JSON.parse(qjphd),
            body: `{
  "taskType": "5"
}`
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【财神卡加速】：${result.message}\n`)
                    $.message += `【财神卡加速】：${result.message}\n`
                } else {

                    console.log(`【财神卡加速】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//邀请好友卡
function qjpyqk(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBank/unlockDouble`,
            headers: JSON.parse(qjphd),
            body: `{
  "taskType": "6"
}`
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【邀请好友加速】：${result.message}\n`)
                    $.message += `【邀请好友加速】：${result.message}\n`
                } else {

                    console.log(`【邀请好友加速】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//偷好友猪币
function qjpsteal(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBankFriend/stealPigMoney`,
            headers: JSON.parse(qjphd),
            body: qjpbody,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【开始偷取猪币】：${result.message}\n`)
					console.log(`【成功偷取猪币】：${result.data.stealPigMoney}\n`)
                    $.message += `【开始偷取猪币】：${result.message}\n`
                } else {

                    console.log(`【偷取猪币失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}











//猪币兑换金币
function qjpdh(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBank/exchangePigMoney`,
            headers: JSON.parse(qjphd),
            body: qjpbody,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【猪币兑换金币】：${result.message}\n`)
					console.log(`【成功兑换金币】：${result.data.coin}\n`)
                    $.message += `【猪币兑换金币】：${result.message}\n`
                } else {

                    console.log(`【猪币兑换金币失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//开盒子立即领取金币
function qjpbox(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBank/openBox`,
            headers: JSON.parse(qjphd),
            body: qjpbody,
        }
        $.post(url, async (err, resp, data) => {
            try {

        const result = JSON.parse(data)

                if (result.code == 200) {

         console.log(`【开盒子立即领取金币】：${result.message}\n`)
					
        $.message += `【开盒子立即领取金币】：${result.message}\n`

			tck = result.data.ticket
         console.log(`【获取到翻倍tck准备翻倍】\n`)
console.log(tck)
 await $.wait(2000)
 await qjpboxdb()
                } else {

                    console.log(`【开盒子立即领取金币失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//开盒子立即领取金币翻倍
function qjpboxdb(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBank/doubleBox`,
            headers: JSON.parse(qjphd),
            body: `{
  "ticket": "${tck}"
}`
        }
        $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if (result.code == 200) {
                    console.log(`【开盒子金币翻倍】：${result.message}\n`)		
                    $.message += `【开盒子金币翻倍】：${result.message}\n`

                } else {
                    console.log(`【开盒子金币翻倍失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}






//转盘
function qjpzp(timeout = 0) {
    return new Promise((resolve) => {
//token = qjphd.match(/"Auth-Token":(\d.+)/)[1]
token = qjphd.match(/"Auth-Token":"(\w.{35})"/)[1]
        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/pig/turntable/draw`,
            headers: //JSON.parse(qjphd),
{"Referer": "https://h5.qujianpan.com/pigLottery/index.html?from=2",

"Auth-Token":token,

},

            body: qjpbody,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

				
				if (result.code == 200) {
                    if (result.data.type == 1) {

                    console.log(`【转盘抽奖获得金币】：${result.data.rewardNum}\n`)
                    $.message += `【转盘抽奖获得金币】：${result.data.rewardNum}\n`}
					else{
					console.log(`【运气真差，转盘抽奖没有获得金币】\n`)
					}
                } else {

                    console.log(`【转盘抽奖失败】：${result.message}开始看视频增加次数\n`)
                await qjpzpzj()

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//增加转盘次数
function qjpzpzj(timeout = 0) {
    return new Promise((resolve) => {
//token = qjphd.match(/"Auth-Token":(\d.+)/)[1]
token = qjphd.match(/"Auth-Token":"(\w.{35})"/)[1]
$.log(token)
        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/pig/turntable/addDrawNum`,
            headers: //JSON.parse(qjphd),
{"Referer": "https://h5.qujianpan.com/pigLottery/index.html?from=2",

"Auth-Token":token,

},

            body: qjpbody,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

				
				if (result.code == 200) {
                  

                    console.log(`【转盘抽奖增加次数】：${result.message}\n`)
                    $.message += `【转盘抽奖获得金币】：${result.message}\n`
					
					}
                else {

                   console.log(`【转盘抽奖增加次数失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//开盒子立即领取金币
function qjpbox(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBank/openBox`,
            headers: JSON.parse(qjphd),
            body: qjpbody,
        }
        $.post(url, async (err, resp, data) => {
            try {

        const result = JSON.parse(data)

                if (result.code == 200) {

         console.log(`【开盒子立即领取金币】：${result.message}\n`)
					
        $.message += `【开盒子立即领取金币】：${result.message}\n`
			//ticket = result.data.ticket
            //await qjpboxdb();


                } else {

                    console.log(`【开盒子立即领取金币失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//完成视频任务
function qjpsprw(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBank/finishTask`,
            headers: JSON.parse(qjphd),
            body: `{
  "taskCode": "BANK_VIDEO"
}`
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【完成视频任务】：${result.message}\n`)
                    $.message += `【完成视频任务】：${result.message}\n`
                } else {

                    console.log(`【完成视频任务失败】：${result.message}\n`)

                }
                await qjpfbkrw()
				await $.wait(2000)
                
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//完成翻倍卡任务
function qjpfbkrw(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBank/finishTask`,
            headers: JSON.parse(qjphd),
            body: `{
  "taskCode": "BANK_DOUBLE"
}`
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【完成翻倍卡任务】：${result.message}\n`)
                    $.message += `【完成翻倍卡任务】：${result.message}\n`
                } else {

                    console.log(`【完成翻倍卡任务失败】：${result.message}\n`)

                }
                await qjpcskrw()
				await $.wait(2000)
                
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//完成财神卡任务
function qjpcskrw(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBank/finishTask`,
            headers: JSON.parse(qjphd),
            body: `{
  "taskCode": "BANK_MAMMON"
}`
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【完成财神卡任务】：${result.message}\n`)
                    $.message += `【完成财神卡任务】：${result.message}\n`
                } else {

                    console.log(`【完成财神卡任务失败】：${result.message}\n`)

                }
                await qjpzbdhrw()
				await $.wait(2000)
                
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//完成猪币兑换任务
function qjpzbdhrw(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBank/finishTask`,
            headers: JSON.parse(qjphd),
            body: `{
  "taskCode": "BANK_PIG_MONEY"
}`
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【完成猪币兑换任务】：${result.message}\n`)
                    $.message += `【完成猪币兑换任务】：${result.message}\n`
                } else {

                    console.log(`【完成猪币兑换任务失败】：${result.message}\n`)

                }
                await qjpzpcjrw()
				await $.wait(2000)
               
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//完成转盘抽奖任务
function qjpzpcjrw(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBank/finishTask`,
            headers: JSON.parse(qjphd),
            body: `{
  "taskCode": "BANK_PIG_TURNTABLE"
}`
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【完成转盘抽奖任务】：${result.message}\n`)
                    $.message += `【完成转盘抽奖任务】：${result.message}\n`
                } else {

                    console.log(`【完成转盘抽奖任务失败】：${result.message}\n`)

                }
				 
                await qjpstealrw()
                await $.wait(2000)
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//完成偷好友猪币任务
function qjpstealrw(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/game/savingsBank/finishTask`,
            headers: JSON.parse(qjphd),
            body: `{
  "taskCode": "BANK_FRIEND_STEAL"
}`
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【完成偷好友猪币任务】：${result.message}\n`)
                    $.message += `【完成偷好友猪币任务】：${result.message}\n`
                } else {

                    console.log(`【完成偷好友猪币任务失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//查看金币余额
function qjpsteal(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://qjp.qujianpan.com/qjp-app/pig/turntable/info`,
            headers: JSON.parse(qjphd),
            body: qjpbody,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【开始查询金币余额】：${result.message}\n`)
					console.log(`【金币余额】：${result.data.balance}\n`)
                    $.message += `【金币余额】：${result.data.balance}\n`
                } else {

                    console.log(`【查询金币余额失败】：${result.message}\n`)

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











function Env(name, opts) {
    class Http {
        constructor(env) {
            this.env = env
        }
        send(opts, method = 'GET') {
            opts = typeof opts === 'string' ? {
                url: opts
            } : opts
            let sender = this.get
            if (method === 'POST') {
                sender = this.post
            }
            return new Promise((resolve, reject) => {
                sender.call(this, opts, (err, resp, body) => {
                    if (err) reject(err)
                    else resolve(resp)
                })
            })
        }
        get(opts) {
            return this.send.call(this.env, opts)
        }
        post(opts) {
            return this.send.call(this.env, opts, 'POST')
        }
    }
    return new (class {
        constructor(name, opts) {
            this.name = name
            this.http = new Http(this)
            this.data = null
            this.dataFile = 'box.dat'
            this.logs = []
            this.isMute = false
            this.isNeedRewrite = false
            this.logSeparator = '\n'
            this.startTime = new Date().getTime()
            Object.assign(this, opts)
            this.log('', `🔔${this.name
                }, 开始!`)
        }
        isNode() {
            return 'undefined' !== typeof module && !!module.exports
        }
        isQuanX() {
            return 'undefined' !== typeof $task
        }
        isSurge() {
            return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
        }
        isLoon() {
            return 'undefined' !== typeof $loon
        }
        isShadowrocket() {
            return 'undefined' !== typeof $rocket
        }
        toObj(str, defaultValue = null) {
            try {
                return JSON.parse(str)
            } catch {
                return defaultValue
            }
        }
        toStr(obj, defaultValue = null) {
            try {
                return JSON.stringify(obj)
            } catch {
                return defaultValue
            }
        }
        getjson(key, defaultValue) {
            let json = defaultValue
            const val = this.getdata(key)
            if (val) {
                try {
                    json = JSON.parse(this.getdata(key))
                } catch { }
            }
            return json
        }
        setjson(val, key) {
            try {
                return this.setdata(JSON.stringify(val), key)
            } catch {
                return false
            }
        }
        getScript(url) {
            return new Promise((resolve) => {
                this.get({
                    url
                }, (err, resp, body) => resolve(body))
            })
        }
        runScript(script, runOpts) {
            return new Promise((resolve) => {
                let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
                httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
                let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
                httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
                httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
                const [key, addr] = httpapi.split('@')
                const opts = {
                    url: `http: //${addr}/v1/scripting/evaluate`,
                    body: {
                        script_text: script,
                        mock_type: 'cron',
                        timeout: httpapi_timeout
                    },
                    headers: {
                        'X-Key': key,
                        'Accept': '*/*'
                    }
                }
                this.post(opts, (err, resp, body) => resolve(body))
            }).catch((e) => this.logErr(e))
        }
        loaddata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require('fs')
                this.path = this.path ? this.path : require('path')
                const curDirDataFilePath = this.path.resolve(this.dataFile)
                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
                if (isCurDirDataFile || isRootDirDataFile) {
                    const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
                    try {
                        return JSON.parse(this.fs.readFileSync(datPath))
                    } catch (e) {
                        return {}
                    }
                } else return {}
            } else return {}
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require('fs')
                this.path = this.path ? this.path : require('path')
                const curDirDataFilePath = this.path.resolve(this.dataFile)
                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
                const jsondata = JSON.stringify(this.data)
                if (isCurDirDataFile) {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata)
                } else if (isRootDirDataFile) {
                    this.fs.writeFileSync(rootDirDataFilePath, jsondata)
                } else {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata)
                }
            }
        }
        lodash_get(source, path, defaultValue = undefined) {
            const paths = path.replace(/[(d+)]/g, '.$1').split('.')
            let result = source
            for (const p of paths) {
                result = Object(result)[p]
                if (result === undefined) {
                    return defaultValue
                }
            }
            return result
        }
        lodash_set(obj, path, value) {
            if (Object(obj) !== obj) return obj
            if (!Array.isArray(path)) path = path.toString().match(/[^.[]]+/g) || []
            path
                .slice(0, -1)
                .reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
                path[path.length - 1]
            ] = value
            return obj
        }
        getdata(key) {
            let val = this.getval(key)
            // 如果以 @
            if (/^@/.test(key)) {
                const [, objkey, paths] = /^@(.*?).(.*?)$/.exec(key)
                const objval = objkey ? this.getval(objkey) : ''
                if (objval) {
                    try {
                        const objedval = JSON.parse(objval)
                        val = objedval ? this.lodash_get(objedval, paths, '') : val
                    } catch (e) {
                        val = ''
                    }
                }
            }
            return val
        }
        setdata(val, key) {
            let issuc = false
            if (/^@/.test(key)) {
                const [, objkey, paths] = /^@(.*?).(.*?)$/.exec(key)
                const objdat = this.getval(objkey)
                const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
                try {
                    const objedval = JSON.parse(objval)
                    this.lodash_set(objedval, paths, val)
                    issuc = this.setval(JSON.stringify(objedval), objkey)
                } catch (e) {
                    const objedval = {}
                    this.lodash_set(objedval, paths, val)
                    issuc = this.setval(JSON.stringify(objedval), objkey)
                }
            } else {
                issuc = this.setval(val, key)
            }
            return issuc
        }
        getval(key) {
            if (this.isSurge() || this.isLoon()) {
                return $persistentStore.read(key)
            } else if (this.isQuanX()) {
                return $prefs.valueForKey(key)
            } else if (this.isNode()) {
                this.data = this.loaddata()
                return this.data[key]
            } else {
                return (this.data && this.data[key]) || null
            }
        }
        setval(val, key) {
            if (this.isSurge() || this.isLoon()) {
                return $persistentStore.write(val, key)
            } else if (this.isQuanX()) {
                return $prefs.setValueForKey(val, key)
            } else if (this.isNode()) {
                this.data = this.loaddata()
                this.data[key] = val
                this.writedata()
                return true
            } else {
                return (this.data && this.data[key]) || null
            }
        }
        initGotEnv(opts) {
            this.got = this.got ? this.got : require('got')
            this.cktough = this.cktough ? this.cktough : require('tough-cookie')
            this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
            if (opts) {
                opts.headers = opts.headers ? opts.headers : {}
                if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
                    opts.cookieJar = this.ckjar
                }
            }
        }
        get(opts, callback = () => { }) {
            if (opts.headers) {
                delete opts.headers['Content-Type']
                delete opts.headers['Content-Length']
            }
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    opts.headers = opts.headers || {}
                    Object.assign(opts.headers, {
                        'X-Surge-Skip-Scripting': false
                    })
                }
                $httpClient.get(opts, (err, resp, body) => {
                    if (!err && resp) {
                        resp.body = body
                        resp.statusCode = resp.status
                    }
                    callback(err, resp, body)
                })
            } else if (this.isQuanX()) {
                if (this.isNeedRewrite) {
                    opts.opts = opts.opts || {}
                    Object.assign(opts.opts, {
                        hints: false
                    })
                }
                $task.fetch(opts).then(
                    (resp) => {
                        const {
                            statusCode: status,
                            statusCode,
                            headers,
                            body
                        } = resp
                        callback(null, {
                            status,
                            statusCode,
                            headers,
                            body
                        }, body)
                    },
                    (err) => callback(err)
                )
            } else if (this.isNode()) {
                this.initGotEnv(opts)
                this.got(opts)
                    .on('redirect', (resp, nextOpts) => {
                        try {
                            if (resp.headers['set-cookie']) {
                                const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
                                if (ck) {
                                    this.ckjar.setCookieSync(ck, null)
                                }
                                nextOpts.cookieJar = this.ckjar
                            }
                        } catch (e) {
                            this.logErr(e)
                        }
                        // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
                    })
                    .then(
                        (resp) => {
                            const {
                                statusCode: status,
                                statusCode,
                                headers,
                                body
                            } = resp
                            callback(null, {
                                status,
                                statusCode,
                                headers,
                                body
                            }, body)
                        },
                        (err) => {
                            const {
                                message: error,
                                response: resp
                            } = err
                            callback(error, resp, resp && resp.body)
                        }
                    )
            }
        }
        post(opts, callback = () => { }) {
            const method = opts.method ? opts.method.toLocaleLowerCase() : 'post'
            // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
            if (opts.body && opts.headers && !opts.headers['Content-Type']) {
                opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            }
            if (opts.headers) delete opts.headers['Content-Length']
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    opts.headers = opts.headers || {}
                    Object.assign(opts.headers, {
                        'X-Surge-Skip-Scripting': false
                    })
                }
                $httpClient[method](opts, (err, resp, body) => {
                    if (!err && resp) {
                        resp.body = body
                        resp.statusCode = resp.status
                    }
                    callback(err, resp, body)
                })
            } else if (this.isQuanX()) {
                opts.method = method
                if (this.isNeedRewrite) {
                    opts.opts = opts.opts || {}
                    Object.assign(opts.opts, {
                        hints: false
                    })
                }
                $task.fetch(opts).then(
                    (resp) => {
                        const {
                            statusCode: status,
                            statusCode,
                            headers,
                            body
                        } = resp
                        callback(null, {
                            status,
                            statusCode,
                            headers,
                            body
                        }, body)
                    },
                    (err) => callback(err)
                )
            } else if (this.isNode()) {
                this.initGotEnv(opts)
                const {
                    url,
                    ..._opts
                } = opts
                this.got[method](url, _opts).then(
                    (resp) => {
                        const {
                            statusCode: status,
                            statusCode,
                            headers,
                            body
                        } = resp
                        callback(null, {
                            status,
                            statusCode,
                            headers,
                            body
                        }, body)
                    },
                    (err) => {
                        const {
                            message: error,
                            response: resp
                        } = err
                        callback(error, resp, resp && resp.body)
                    }
                )
            }
        }
        /**
         *
         * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
         *    :$.time('yyyyMMddHHmmssS')
         *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
         *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
         * @param {string} fmt 格式化参数
         * @param {number} 可选: 根据指定时间戳返回格式化日期
         *
         */
        time(fmt, ts = null) {
            const date = ts ? new Date(ts) : new Date()
            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'H+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                'S': date.getMilliseconds()
            }
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            for (let k in o)
                if (new RegExp('(' + k + ')').test(fmt))
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
            return fmt
        }
        /**
         * 系统通知
         *
         * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
         *
         * 示例:
         * $.msg(title, subt, desc, 'twitter://')
         * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
         * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
         *
         * @param {*} title 标题
         * @param {*} subt 副标题
         * @param {*} desc 通知详情
         * @param {*} opts 通知参数
         *
         */
        msg(title = name, subt = '', desc = '', opts) {
            const toEnvOpts = (rawopts) => {
                if (!rawopts) return rawopts
                if (typeof rawopts === 'string') {
                    if (this.isLoon()) return rawopts
                    else if (this.isQuanX()) return {
                        'open-url': rawopts
                    }
                    else if (this.isSurge()) return {
                        url: rawopts
                    }
                    else return undefined
                } else if (typeof rawopts === 'object') {
                    if (this.isLoon()) {
                        let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
                        let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
                        return {
                            openUrl,
                            mediaUrl
                        }
                    } else if (this.isQuanX()) {
                        let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
                        let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
                        return {
                            'open-url': openUrl,
                            'media-url': mediaUrl
                        }
                    } else if (this.isSurge()) {
                        let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
                        return {
                            url: openUrl
                        }
                    }
                } else {
                    return undefined
                }
            }
            if (!this.isMute) {
                if (this.isSurge() || this.isLoon()) {
                    $notification.post(title, subt, desc, toEnvOpts(opts))
                } else if (this.isQuanX()) {
                    $notify(title, subt, desc, toEnvOpts(opts))
                }
            }
            if (!this.isMuteLog) {
                let logs = ['', '==============📣系统通知📣==============']
                logs.push(title)
                subt ? logs.push(subt) : ''
                desc ? logs.push(desc) : ''
                console.log(logs.join('\n'))
                this.logs = this.logs.concat(logs)
            }
        }
        log(...logs) {
            if (logs.length > 0) {
                this.logs = [...this.logs, ...logs]
            }
            console.log(logs.join(this.logSeparator))
        }
        logErr(err, msg) {
            const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()
            if (!isPrintSack) {
                this.log('', `❗️${this.name
                    }, 错误!`, err)
            } else {
                this.log('', `❗️${this.name
                    }, 错误!`, err.stack)
            }
        }
        wait(time) {
            return new Promise((resolve) => setTimeout(resolve, time))
        }
        done(val = {}) {
            const endTime = new Date().getTime()
            const costTime = (endTime - this.startTime) / 1000
            this.log('', `🔔${this.name
                }, 结束!🕛${costTime}秒`)
            this.log()
            if (this.isSurge() || this.isQuanX() || this.isLoon()) {
                $done(val)
            }
        }
    })(name, opts)
}

