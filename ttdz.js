/*
软件名称:图图点赞
完成时间：2021-10-19 @YaphetS0903
脚本说明：图图点赞。。。下载地址，appstore搜索下载
一天2毛，提现未知
本脚本以学习为主
获取数据： 进入软件，点击首页，点击任务，下拉刷新获取token
TG通知群:https://t.me/tom_ww
TG电报交流群: https://t.me/tom_210120
boxjs地址 :  
https://raw.githubusercontent.com/YaphetS0903/JStest/main/YaphteS0903.boxjs.json
图图点赞
青龙环境抓取链接https://api.tutudianzan.cn:28084/api/task/getTaskModelList
环境配置(@隔开，json格式)export ttdztoken='抓取的token1@抓取的token2'
圈X配置如下，其他自行测试，
[task_local]
#图图点赞
10 8 * * * https://raw.githubusercontent.com/YaphetS0903/JStest/main/ttdz.js, tag=图图点赞, enabled=true
[rewrite_local]
#图图点赞
https://api.tutudianzan.cn:28084/api/task/getTaskModelList url script-request-header https://raw.githubusercontent.com/YaphetS0903/JStest/main/ttdz.js
[MITM]
hostname = api.tutudianzan.cn
*/

const $ = new Env('图图点赞');
let status;

status = (status = ($.getval("ttdzstatus") || "1")) > 1 ? `${status}` : "";
let ttdzurlArr = [], ttdztokenArr = [],ttdzcount = ''
let ttdzurl = $.getdata('ttdzurl')
let ttdztoken = $.isNode() ? (process.env.ttdztoken ? process.env.ttdztoken : "") : ($.getdata('ttdztoken') ? $.getdata('ttdztoken') : "")
let b = Math.round(new Date().getTime() / 1000).toString();
let DD = RT(2000, 3500)
let tz = ($.getval('tz') || '1');
let tx = ($.getval('tx') || '1');
let id = '', txid = '',Pigid = '',Catid = '',Dogid = '',Sheepid = ''
$.message = ''
let ttdztokens = ""




!(async () => {
    if (typeof $request !== "undefined") {
        await ttdzck()
    } else {
        if (!$.isNode()) {
            ttdzurlArr.push($.getdata('ttdzurl'))
            ttdztokenArr.push($.getdata('ttdztoken'))
           
            let ttdzcount = ($.getval('ttdzcount') || '1');
            for (let i = 2; i <= ttdzcount; i++) {
                ttdzurlArr.push($.getdata(`ttdzurl${i}`))
                ttdztokenArr.push($.getdata(`ttdztoken${i}`))
               
            }
            console.log(
                `\n\n=============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
                    new Date().getTime() +
                    new Date().getTimezoneOffset() * 60 * 1000 +
                    8 * 60 * 60 * 1000
                ).toLocaleString()} ===============================================\n`);
            for (let i = 0; i < ttdztokenArr.length; i++) {
                if (ttdztokenArr[i]) {

                    ttdzurl = ttdzurlArr[i];
                    ttdztoken = ttdztokenArr[i];
                  
                    $.index = i + 1;
                    console.log(`\n\n开始【图图点赞${$.index}】`)
                   await ttdztaskinfo()
                   await $.wait(2000)
                   await ttdzCoininfo()
                    message()
                }
            }
        } else {
            if (process.env.ttdztoken && process.env.ttdztoken.indexOf('@') > -1) {
                ttdztokenArr = process.env.ttdztoken.split('@');
                console.log(`您选择的是用"@"隔开\n`)
            } else {
                ttdztokens = [process.env.ttdztoken]
            };
            Object.keys(ttdztokens).forEach((item) => {
                if (ttdztokens[item]) {
                    ttdztokenArr.push(ttdztokens[item])
                }
            })
            
            console.log(`共${ttdztokenArr.length}个cookie`)
            for (let k = 0; k < ttdztokenArr.length; k++) {
                $.message = ""
                
                ttdztoken = ttdztokenArr[k];
                   
                $.index = k + 1;
                console.log(`\n开始【图图点赞${$.index}】`)
                    
                await ttdztaskinfo()
                await $.wait(2000)
                await ttdzCoininfo()
                message()
            }
        }

    }
})()

    .catch((e) => $.logErr(e))
    .finally(() => $.done())



function ttdzck() {
    if ($request.url.indexOf("task/getTaskModelList") > -1) {
        const ttdzurl = $request.url
        if (ttdzurl) $.setdata(ttdzurl, `ttdzurl${status}`)
        $.log(ttdzurl)

        const ttdztoken = $request.headers.token
        if (ttdztoken) $.setdata(ttdztoken, `ttdztoken${status}`)
        $.log(ttdztoken)
        $.msg($.name, "", `图图点赞${status}获取token数据成功`)

    }
}




//任务完成情况
function ttdztaskinfo(timeout = 0) {
    return new Promise((resolve) => {
        const hd ={"Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-Hans-CN;q=1",
        "Connection": "keep-alive",
        "Host": "api.tutudianzan.cn:28084",
        "User-Agent": "tu tu dian zan/2.1 (iPhone; iOS 14.4.1; Scale/3.00)",
        "channelName": "appstore",
        "deviceDetail": "14.4.1",
        "deviceId": "5A48CC14-3F5A-4A3E-BF52-DAC308BAA17B",
        "deviceType": "2","productId": "vaBJ6DwKoGS0sxL9",
        "token": ttdztoken,
        "version": "2.1"}
        let url = {
            url: `https://api.tutudianzan.cn:28084/api/task/getTaskModelList`,
            headers: hd,

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 1) {
                    console.log(`【查询任务完成情况】：${result.message}\n`)
                    if(result.result[0].isFinish == 1){
                        console.log(`【开始养猪任务】\n`)
                        await ttdzraisePig()
                        await $.wait(3000)
                    }else{
                        console.log(`【养猪任务已完成】\n`)
                    }

                    if(result.result[1].isFinish == 1){
                        console.log(`【开始养狗任务】\n`)
                        await ttdzraiseDog()
                        await $.wait(3000)
                    }else{
                        console.log(`【养狗任务已完成】\n`)
                    }

                    if(result.result[2].isFinish == 1){
                        console.log(`【开始养猫任务】\n`)
                        await ttdzraiseCat()
                        await $.wait(3000)
                    }else{
                        console.log(`【养猫任务已完成】\n`)
                    }

                    if(result.result[3].isFinish == 1){
                        console.log(`【开始羊驼任务】\n`)
                        await ttdzraiseSheep()
                        await $.wait(3000)
                    }else{
                        console.log(`【羊驼任务已完成】\n`)
                    }


                } else {
                    console.log(`【查询任务完成情况】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//养猪任务id获取
function ttdzraisePig(timeout = 0) {
    return new Promise((resolve) => {
        const hd ={"Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-Hans-CN;q=1",
        "Connection": "keep-alive",
        "Host": "api.tutudianzan.cn:28084",
        "User-Agent": "tu tu dian zan/2.1 (iPhone; iOS 14.4.1; Scale/3.00)",
        "channelName": "appstore",
        "deviceDetail": "14.4.1",
        "deviceId": "5A48CC14-3F5A-4A3E-BF52-DAC308BAA17B",
        "deviceType": "2","productId": "vaBJ6DwKoGS0sxL9",
        "token": ttdztoken,
        "version": "2.1"}
        let url = {
            url: `https://api.tutudianzan.cn:28084/api/task/getTaskDetailInfo?taskCode=raisePig`,
            headers: hd,

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 1) {

                    console.log(`【养猪任务获取id】：${result.message}\n`)

                    for(let p=0;p<4;p++){
                        Pigid=result.result[p].taskDetailId
                        await $.wait(3000)
                        await ttdzraisePigtaskwc(Pigid)
                        await $.wait(10000)
                        await ttdzraisePigtasklq(Pigid)
                        await $.wait(10000)
                    }
                } else {
                    console.log(`【养猪任务获取id】：${result.message}\n`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//开始养猪任务
function ttdzraisePigtaskwc(Pigid) {
    return new Promise((resolve) => {
        const hd ={"Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Length": "89","Content-Type": "application/json",
        "Host": "api.tutudianzan.cn:28084",
        "User-Agent": "%E5%9B%BE%E5%9B%BE%E7%82%B9%E8%B5%9E/1.0.9 CFNetwork/1220.1 Darwin/20.3.0",
        "appId": "com.jiangtang.WechatMoments",
        "channelName": "appstore",
        "deviceDetail": "14.4.1",
        "deviceId": "5A48CC14-3F5A-4A3E-BF52-DAC308BAA17B",
        "deviceType": "2","productId": "vaBJ6DwKoGS0sxL9",
        "token": ttdztoken,
        "version": "2.1"}
        let url = {
            url: `https://api.tutudianzan.cn:28084/api/task/updateTaskStatus`,
            headers: hd,
            body: `{
                "taskDetailId": "${Pigid}",
                "taskModelCode": "raisePig"
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 1) {

                    console.log(`【任务完成】：${result.message}\n`)
                   

                } else {

                    console.log(`【任务完成失败】：${result.message}\n`)
                   

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, 0)
    })
}

//养猪任务领取奖励
function ttdzraisePigtasklq(Pigid) {
    return new Promise((resolve) => {
        const hd ={"Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Length": "89","Content-Type": "application/json",
        "Host": "api.tutudianzan.cn:28084",
        "User-Agent": "%E5%9B%BE%E5%9B%BE%E7%82%B9%E8%B5%9E/1.0.9 CFNetwork/1220.1 Darwin/20.3.0",
        "appId": "com.jiangtang.WechatMoments",
        "channelName": "appstore",
        "deviceDetail": "14.4.1",
        "deviceId": "5A48CC14-3F5A-4A3E-BF52-DAC308BAA17B",
        "deviceType": "2","productId": "vaBJ6DwKoGS0sxL9",
        "token": ttdztoken,
        "version": "2.1"}
        let url = {
            url: `https://api.tutudianzan.cn:28084/api/task/updateTaskDetailInfo`,
            headers: hd,
            body: `{
                "taskDetailId": "${Pigid}",
                "taskModelCode": "raisePig"
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 1) {

                    console.log(`【任务奖励领取】：${result.message}\n`)

                } else {

                    console.log(`【任务奖励领取】：${result.message}\n`)
                   

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, 0)
    })
}





//养狗任务id获取
function ttdzraiseDog(timeout = 0) {
    return new Promise((resolve) => {
        const hd ={"Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-Hans-CN;q=1",
        "Connection": "keep-alive",
        "Host": "api.tutudianzan.cn:28084",
        "User-Agent": "tu tu dian zan/2.1 (iPhone; iOS 14.4.1; Scale/3.00)",
        "channelName": "appstore",
        "deviceDetail": "14.4.1",
        "deviceId": "5A48CC14-3F5A-4A3E-BF52-DAC308BAA17B",
        "deviceType": "2","productId": "vaBJ6DwKoGS0sxL9",
        "token": ttdztoken,
        "version": "2.1"}
        let url = {
            url: `https://api.tutudianzan.cn:28084/api/task/getTaskDetailInfo?taskCode=raiseDog`,
            headers: hd,

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 1) {

                    console.log(`【养狗任务获取id】：${result.message}\n`)

                    for(let p=0;p<4;p++){
                        Dogid=result.result[p].taskDetailId
                        await $.wait(3000)
                        await ttdzraiseDogtaskwc(Dogid)
                        await $.wait(10000)
                        await ttdzraiseDogtasklq(Dogid)
                        await $.wait(10000)
                    }
                } else {
                    console.log(`【养狗任务获取id】：${result.message}\n`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//开始养狗任务
function ttdzraiseDogtaskwc(Dogid) {
    return new Promise((resolve) => {
        const hd ={"Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Length": "89","Content-Type": "application/json",
        "Host": "api.tutudianzan.cn:28084",
        "User-Agent": "%E5%9B%BE%E5%9B%BE%E7%82%B9%E8%B5%9E/1.0.9 CFNetwork/1220.1 Darwin/20.3.0",
        "appId": "com.jiangtang.WechatMoments",
        "channelName": "appstore",
        "deviceDetail": "14.4.1",
        "deviceId": "5A48CC14-3F5A-4A3E-BF52-DAC308BAA17B",
        "deviceType": "2","productId": "vaBJ6DwKoGS0sxL9",
        "token": ttdztoken,
        "version": "2.1"}
        let url = {
            url: `https://api.tutudianzan.cn:28084/api/task/updateTaskStatus`,
            headers: hd,
            body: `{
                "taskDetailId": "${Dogid}",
                "taskModelCode": "raiseDog"
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 1) {

                    console.log(`【任务完成】：${result.message}\n`)
                   

                } else {

                    console.log(`【任务完成失败】：${result.message}\n`)
                   

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, 0)
    })
}

//养狗任务领取奖励
function ttdzraiseDogtasklq(Dogid) {
    return new Promise((resolve) => {
        const hd ={"Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Length": "89","Content-Type": "application/json",
        "Host": "api.tutudianzan.cn:28084",
        "User-Agent": "%E5%9B%BE%E5%9B%BE%E7%82%B9%E8%B5%9E/1.0.9 CFNetwork/1220.1 Darwin/20.3.0",
        "appId": "com.jiangtang.WechatMoments",
        "channelName": "appstore",
        "deviceDetail": "14.4.1",
        "deviceId": "5A48CC14-3F5A-4A3E-BF52-DAC308BAA17B",
        "deviceType": "2","productId": "vaBJ6DwKoGS0sxL9",
        "token": ttdztoken,
        "version": "2.1"}
        let url = {
            url: `https://api.tutudianzan.cn:28084/api/task/updateTaskDetailInfo`,
            headers: hd,
            body: `{
                "taskDetailId": "${Dogid}",
                "taskModelCode": "raiseDog"
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 1) {

                    console.log(`【任务奖励领取】：${result.message}\n`)

                } else {

                    console.log(`【任务奖励领取】：${result.message}\n`)
                   

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, 0)
    })
}





//养猫任务id获取
function ttdzraiseCat(timeout = 0) {
    return new Promise((resolve) => {
        const hd ={"Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-Hans-CN;q=1",
        "Connection": "keep-alive",
        "Host": "api.tutudianzan.cn:28084",
        "User-Agent": "tu tu dian zan/2.1 (iPhone; iOS 14.4.1; Scale/3.00)",
        "channelName": "appstore",
        "deviceDetail": "14.4.1",
        "deviceId": "5A48CC14-3F5A-4A3E-BF52-DAC308BAA17B",
        "deviceType": "2","productId": "vaBJ6DwKoGS0sxL9",
        "token": ttdztoken,
        "version": "2.1"}
        let url = {
            url: `https://api.tutudianzan.cn:28084/api/task/getTaskDetailInfo?taskCode=raiseCat`,
            headers: hd,

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 1) {

                    console.log(`【养猫任务获取id】：${result.message}\n`)

                    for(let p=0;p<4;p++){
                        Catid=result.result[p].taskDetailId
                        await $.wait(3000)
                        await ttdzraiseCattaskwc(Catid)
                        await $.wait(10000)
                        await ttdzraiseCattasklq(Catid)
                        await $.wait(10000)
                    }
                } else {
                    console.log(`【养猫任务获取id】：${result.message}\n`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//开始养猫任务
function ttdzraiseCattaskwc(Catid) {
    return new Promise((resolve) => {
        const hd ={"Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Length": "89","Content-Type": "application/json",
        "Host": "api.tutudianzan.cn:28084",
        "User-Agent": "%E5%9B%BE%E5%9B%BE%E7%82%B9%E8%B5%9E/1.0.9 CFNetwork/1220.1 Darwin/20.3.0",
        "appId": "com.jiangtang.WechatMoments",
        "channelName": "appstore",
        "deviceDetail": "14.4.1",
        "deviceId": "5A48CC14-3F5A-4A3E-BF52-DAC308BAA17B",
        "deviceType": "2","productId": "vaBJ6DwKoGS0sxL9",
        "token": ttdztoken,
        "version": "2.1"}
        let url = {
            url: `https://api.tutudianzan.cn:28084/api/task/updateTaskStatus`,
            headers: hd,
            body: `{
                "taskDetailId": "${Catid}",
                "taskModelCode": "raiseCat"
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 1) {

                    console.log(`【任务完成】：${result.message}\n`)
                   

                } else {

                    console.log(`【任务完成失败】：${result.message}\n`)
                   

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, 0)
    })
}

//养猫任务领取奖励
function ttdzraiseCattasklq(Catid) {
    return new Promise((resolve) => {
        const hd ={"Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Length": "89","Content-Type": "application/json",
        "Host": "api.tutudianzan.cn:28084",
        "User-Agent": "%E5%9B%BE%E5%9B%BE%E7%82%B9%E8%B5%9E/1.0.9 CFNetwork/1220.1 Darwin/20.3.0",
        "appId": "com.jiangtang.WechatMoments",
        "channelName": "appstore",
        "deviceDetail": "14.4.1",
        "deviceId": "5A48CC14-3F5A-4A3E-BF52-DAC308BAA17B",
        "deviceType": "2","productId": "vaBJ6DwKoGS0sxL9",
        "token": ttdztoken,
        "version": "2.1"}
        let url = {
            url: `https://api.tutudianzan.cn:28084/api/task/updateTaskDetailInfo`,
            headers: hd,
            body: `{
                "taskDetailId": "${Catid}",
                "taskModelCode": "raiseCat"
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 1) {

                    console.log(`【任务奖励领取】：${result.message}\n`)

                } else {

                    console.log(`【任务奖励领取】：${result.message}\n`)
                   

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, 0)
    })
}



//养羊任务id获取
function ttdzraiseSheep(timeout = 0) {
    return new Promise((resolve) => {
        const hd ={"Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-Hans-CN;q=1",
        "Connection": "keep-alive",
        "Host": "api.tutudianzan.cn:28084",
        "User-Agent": "tu tu dian zan/2.1 (iPhone; iOS 14.4.1; Scale/3.00)",
        "channelName": "appstore",
        "deviceDetail": "14.4.1",
        "deviceId": "5A48CC14-3F5A-4A3E-BF52-DAC308BAA17B",
        "deviceType": "2","productId": "vaBJ6DwKoGS0sxL9",
        "token": ttdztoken,
        "version": "2.1"}
        let url = {
            url: `https://api.tutudianzan.cn:28084/api/task/getTaskDetailInfo?taskCode=raiseSheep`,
            headers: hd,

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 1) {

                    console.log(`【养羊任务获取id】：${result.message}\n`)

                    for(let p=0;p<4;p++){
                        Sheepid=result.result[p].taskDetailId
                        await $.wait(3000)
                        await ttdzraiseSheeptaskwc(Sheepid)
                        await $.wait(10000)
                        await ttdzraiseSheeptasklq(Sheepid)
                        await $.wait(10000)
                    }
                } else {
                    console.log(`【养羊任务获取id】：${result.message}\n`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//开始养羊任务
function ttdzraiseSheeptaskwc(Sheepid) {
    return new Promise((resolve) => {
        const hd ={"Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Length": "89","Content-Type": "application/json",
        "Host": "api.tutudianzan.cn:28084",
        "User-Agent": "%E5%9B%BE%E5%9B%BE%E7%82%B9%E8%B5%9E/1.0.9 CFNetwork/1220.1 Darwin/20.3.0",
        "appId": "com.jiangtang.WechatMoments",
        "channelName": "appstore",
        "deviceDetail": "14.4.1",
        "deviceId": "5A48CC14-3F5A-4A3E-BF52-DAC308BAA17B",
        "deviceType": "2","productId": "vaBJ6DwKoGS0sxL9",
        "token": ttdztoken,
        "version": "2.1"}
        let url = {
            url: `https://api.tutudianzan.cn:28084/api/task/updateTaskStatus`,
            headers: hd,
            body: `{
                "taskDetailId": "${Sheepid}",
                "taskModelCode": "raiseSheep"
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 1) {

                    console.log(`【任务完成】：${result.message}\n`)
                   

                } else {

                    console.log(`【任务完成失败】：${result.message}\n`)
                   

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, 0)
    })
}

//养羊任务领取奖励
function ttdzraiseSheeptasklq(Sheepid) {
    return new Promise((resolve) => {
        const hd ={"Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Length": "89","Content-Type": "application/json",
        "Host": "api.tutudianzan.cn:28084",
        "User-Agent": "%E5%9B%BE%E5%9B%BE%E7%82%B9%E8%B5%9E/1.0.9 CFNetwork/1220.1 Darwin/20.3.0",
        "appId": "com.jiangtang.WechatMoments",
        "channelName": "appstore",
        "deviceDetail": "14.4.1",
        "deviceId": "5A48CC14-3F5A-4A3E-BF52-DAC308BAA17B",
        "deviceType": "2","productId": "vaBJ6DwKoGS0sxL9",
        "token": ttdztoken,
        "version": "2.1"}
        let url = {
            url: `https://api.tutudianzan.cn:28084/api/task/updateTaskDetailInfo`,
            headers: hd,
            body: `{
                "taskDetailId": "${Sheepid}",
                "taskModelCode": "raiseSheep"
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 1) {

                    console.log(`【任务奖励领取】：${result.message}\n`)

                } else {

                    console.log(`【任务奖励领取】：${result.message}\n`)
                   

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, 0)
    })
}



//茄子币余额
function ttdzCoininfo(timeout = 0) {
    return new Promise((resolve) => {
        const hd ={"Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-Hans-CN;q=1",
        "Connection": "keep-alive",
        "Host": "api.tutudianzan.cn:28084",
        "User-Agent": "tu tu dian zan/2.1 (iPhone; iOS 14.4.1; Scale/3.00)",
        "channelName": "appstore",
        "deviceDetail": "14.4.1",
        "deviceId": "5A48CC14-3F5A-4A3E-BF52-DAC308BAA17B",
        "deviceType": "2","productId": "vaBJ6DwKoGS0sxL9",
        "token": ttdztoken,
        "version": "2.1"}
        let url = {
            url: `https://api.tutudianzan.cn:28084/api/coin/getCustomerCoinInfo`,
            headers: hd,

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 1) {

                    console.log(`【当前茄子币】：${result.result.balanceEggplantCoin}\n`)
                    console.log(`【今日获得茄子币】：${result.result.todayEggplantCoin}\n`)
                    $.message += `【当前茄子币】：${result.result.balanceEggplantCoin}\n`
                    $.message += `【今日获得茄子币】：${result.result.todayEggplantCoin}\n`
                } else {
                    console.log(`【查询茄子币失败】：${result.message}\n`)
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


