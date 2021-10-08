/*
软件名称:猜歌王者
更新时间：2021-10-8
脚本说明：猜歌王者。。。appstore搜索下载
肥皂大佬以前写过刷答题，提现50貌似不到账，写着玩而已，勿喷。。。。。。。。

本脚本以学习为主

获取数据： 进入软件后自动获取数据
TG通知群:https://t.me/tom_ww
TG电报交流群: https://t.me/tom_210120
boxjs地址 :  
https://raw.githubusercontent.com/YaphetS0903/JStest/main/YaphteS0903.boxjs.json
猜歌王者
圈X配置如下，其他自行测试
[task_local]
#猜歌王者
0 6-23 * * * https://raw.githubusercontent.com/YaphetS0903/JStest/main/cgwz.js, tag=猜歌王者, enabled=true
[rewrite_local]
#猜歌王者
https://api.litemob.com/caigewangzhe_ios/my/info? url script-request-header https://raw.githubusercontent.com/YaphetS0903/JStest/main/cgwz.js
[MITM]
hostname = api.litemob.com
*/
const $ = new Env('猜歌王者');
let status;

status = (status = ($.getval("cgwzstatus") || "1")) > 1 ? `${status}` : "";
const cgwzurlArr = [], cgwzhdArr = [], cgwzcount = ''
let cgwzurl = $.getdata('cgwzurl')
let cgwzhd = $.getdata('cgwzhd')
let b = Math.round(new Date().getTime() / 1000).toString();
let DD = RT(2000, 3000)
let tz = ($.getval('tz') || '1');
let tx = ($.getval('tx') || '1');
let id = '', txid = '', uid = '', did = '', dtdid = '', ans = ''

$.message = ''





!(async () => {
    if (typeof $request !== "undefined") {
        await cgwzck()
    } else {
        cgwzurlArr.push($.getdata('cgwzurl'))
        cgwzhdArr.push($.getdata('cgwzhd'))


        let cgwzcount = ($.getval('cgwzcount') || '1');
        for (let i = 2; i <= cgwzcount; i++) {
            cgwzurlArr.push($.getdata(`cgwzurl${i}`))
            cgwzhdArr.push($.getdata(`cgwzhd${i}`))

        }
        console.log(
            `\n\n=============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() +
                new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000
            ).toLocaleString()} ===============================================\n`);
        for (let i = 0; i < cgwzhdArr.length; i++) {
            if (cgwzhdArr[i]) {

                cgwzurl = cgwzurlArr[i];
                cgwzhd = cgwzhdArr[i];


                $.index = i + 1;
                console.log(`\n\n开始【猜歌王者${$.index}】`)
                
                for (let l = 0; l < 3; l++) {
                    $.index = l + 1
                    console.log(`\n【开始第${l + 1}次整点抢现金!】\n`)
                    await cgwzqxj()
                }
             
                
                await $.wait(3000)
                await cgwzsign()
                await $.wait(3000)

                await cgwzcheckdjlq()
                await $.wait(5000)

                await cgwzcheckmrhb()
                await $.wait(3000)

                await cgwztencheck()
                await $.wait(3000)


                for (let k = 0; k < 5; k++) {
                    $.index = k + 1
                    console.log(`\n【开始第${k + 1}次执行答题!】\n等待2秒开始答题`)
                    await $.wait(2000)
                    await cgwzdtinfo()
                    await $.wait(3000)
                }





                await cgwzmyinfo()
                await $.wait(3000)

                message()
            }
        }
    }
})()

    .catch((e) => $.logErr(e))
    .finally(() => $.done())



function cgwzck() {
    if ($request.url.indexOf("my/info?") > -1) {
        const cgwzurl = $request.url
        if (cgwzurl) $.setdata(cgwzurl, `cgwzurl${status}`)
        $.log(cgwzurl)

        const cgwzhd = JSON.stringify($request.headers)
        if (cgwzhd) $.setdata(cgwzhd, `cgwzhd${status}`)
        $.log(cgwzhd)



        $.msg($.name, "", `猜歌王者${status}获取数据成功`)

    }
}



//个人信息页面
function cgwzmyinfo(timeout = 0) {
    return new Promise((resolve) => {
        uid = cgwzurl.match(/uid=(\d+)/)[1]
        let url = {
            url: `https://api.litemob.com/caigewangzhe_ios/my/info?uid=${uid}`,
            headers: JSON.parse(cgwzhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【用户名】：${result.data.nickname}\n`)
                    console.log(`【当前现金余额】：${result.data.count}\n`)
                    console.log(`【当前金币余额】：${result.data.gold}\n`)
                    console.log(`【用户活跃度】：${result.data.huoyue}\n`)
                    $.message += `【用户名】：${result.data.nickname}\n`
                    $.message += `【当前现金余额】：${result.data.count}\n`
                    $.message += `【当前金币余额】：${result.data.gold}\n`
                    $.message += `【用户活跃度】：${result.data.huoyue}\n`

                } else {

                    console.log(`【查询用户信息失败】：${result.message}\n`)
                    $.message += `【查询用户信息失败】：${result.message}\n`

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}





//每日签到
function cgwzsign(timeout = 0) {
    return new Promise((resolve) => {
        uid = cgwzurl.match(/uid=(\d+)/)[1]
        let url = {
            url: `https://api.litemob.com/caigewangzhe_ios/sign/task_do?uid=${uid}`,
            headers: JSON.parse(cgwzhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【每日签到】：${result.message}\n`)
                    console.log(`【每日签到获得金币】：${result.data.gold}\n`)
                    $.message += `【每日签到获得金币】：${result.data.gold}\n`

                } else {

                    console.log(`【签到失败】：${result.message}\n`)
                    $.message += `【签到失败】：${result.message}\n`

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//每日签到翻倍
function cgwzsigndouble(timeout = 0) {
    return new Promise((resolve) => {
        uid = cgwzurl.match(/uid=(\d+)/)[1]
        let url = {
            url: `https://api.litemob.com/caigewangzhe_ios/sign/double?uid=${uid}`,
            headers: JSON.parse(cgwzhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【签到翻倍】：${result.message}\n`)
                    console.log(`【签到翻倍获得金币】：${result.data.gold}\n`)
                    $.message += `【签到翻倍获得金币】：${result.data.gold}\n`

                } else {

                    console.log(`【签到翻倍失败】：${result.message}\n`)
                    $.message += `【签到翻倍失败】：${result.message}\n`

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}




//查询点击领取时间
function cgwzcheckdjlq(timeout = 0) {
    return new Promise((resolve) => {
        uid = cgwzurl.match(/uid=(\d+)/)[1]
        let url = {
            url: `https://api.litemob.com/caigewangzhe_ios/my/check_add_gold?uid=${uid}`,
            headers: JSON.parse(cgwzhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【查询点击领取剩余时间】\n`)
                    if (result.message == 300) {
                        console.log(`【时间未到，剩余时间】：${result.data.time}\n`)

                    } else {
                        console.log(`【时间到了，等待开始】：${result.message}\n`)
                        await $.wait(DD)
                        await cgwzdjlq()
                        await $.wait(DD)
                    }

                } else {

                    console.log(`【查询点击领取时间失败】：${result.message}\n`)
                    $.message += `【查询点击领取时间失败】：${result.message}\n`

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//点击领取
function cgwzdjlq(timeout = 0) {
    return new Promise((resolve) => {
        uid = cgwzurl.match(/uid=(\d+)/)[1]
        let url = {
            url: `https://api.litemob.com/caigewangzhe_ios/my/add_gold?uid=${uid}`,
            headers: JSON.parse(cgwzhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【点击领取】：${result.message}\n`)
                    console.log(`【点击领取获得金币】：${result.data.gold}\n`)
                    $.message += `【点击领取获得金币】：${result.data.gold}\n`

                } else {

                    console.log(`【点击领取任务失败】：${result.message}\n`)
                    $.message += `【点击领取任务失败】：${result.message}\n`

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//每日红包信息查询
function cgwzcheckmrhb(timeout = 0) {
    return new Promise((resolve) => {
        uid = cgwzurl.match(/uid=(\d+)/)[1]
        let url = {
            url: `https://api.litemob.com/caigewangzhe_ios/red_packet/status?uid=${uid}`,
            headers: JSON.parse(cgwzhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【开始查询未领取红包】：${result.message}\n`)
                    if (result.data.type == 1) {

                        if (result.data.info[0].price == 0) {
                            console.log(`【类型1红包未领取，等待开始领取】\n`)
                            await $.wait(DD)
                            await cgwzmrhb1()
                        } else {
                            console.log(`【类型1红包已领取】\n`)
                        }

                    } else if (result.data.type == 2) {


                        if (result.data.info[3].price == 0) {
                            console.log(`【类型2红包未领取，等待开始领取】\n`)
                            await $.wait(DD)
                            await cgwzmrhb2()
                            await $.wait(DD)
                        } else {
                            console.log(`【类型2红包已领取】\n`)
                        }


                    }

                } else {

                    console.log(`【开始查询未领取红包失败】：${result.message}\n`)
                    $.message += `【开始查询未领取红包失败】：${result.message}\n`

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//每日红包1
function cgwzmrhb1(timeout = 0) {
    return new Promise((resolve) => {
        uid = cgwzurl.match(/uid=(\d+)/)[1]
        let url = {
            url: `https://api.litemob.com/caigewangzhe_ios/red_packet/today?uid=${uid}`,
            headers: JSON.parse(cgwzhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【每日红包类型1】：${result.message}\n`)
                    console.log(`【获得金币】：${result.data.info}\n`)
                    $.message += `【每日红包类型1获得金币】：${result.data.info}\n`

                } else {

                    console.log(`【每日红包类型1获得金币失败】：${result.message}\n`)
                    $.message += `【每日红包类型1获得金币失败】：${result.message}\n`

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//每日红包2
function cgwzmrhb2(timeout = 0) {
    return new Promise((resolve) => {
        uid = cgwzurl.match(/uid=(\d+)/)[1]
        let url = {
            url: `https://api.litemob.com/caigewangzhe_ios/red_packet/six?uid=${uid}`,
            headers: JSON.parse(cgwzhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【每日红包类型2】：${result.message}\n`)
                    console.log(`【获得金币】：${result.data.price}\n`)
                    $.message += `【每日红包类型2获得金币】：${result.data.price}\n`
                    console.log(`【开始翻倍，等待中。。。】\n`)
                    await $.wait(DD)
                    await cgwzmrhb2fb()
                    await $.wait(DD)
                } else {

                    console.log(`【每日红包类型2获得金币失败】：${result.message}\n`)
                    $.message += `【每日红包类型2获得金币失败】：${result.message}\n`

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//每日红包2翻倍
function cgwzmrhb2fb(timeout = 0) {
    return new Promise((resolve) => {
        uid = cgwzurl.match(/uid=(\d+)/)[1]
        let url = {
            url: `https://api.litemob.com/caigewangzhe_ios/red_packet/six?uid=${uid}`,
            headers: JSON.parse(cgwzhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {
                    console.log(`【每日红包类型2翻倍共获得金币】：${result.data.price}\n`)
                    $.message += `【每日红包类型2翻倍共获得金币】：${result.data.price}\n`
                } else {

                    console.log(`【每日红包类型2翻倍失败】：${result.message}\n`)
                    $.message += `【每日红包类型2翻倍失败】：${result.message}\n`

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}





//十秒挑战查看次数
function cgwztencheck(timeout = 0) {
    return new Promise((resolve) => {
        uid = cgwzurl.match(/uid=(\d+)/)[1]
        let url = {
            url: `https://api.litemob.com/caigewangzhe_ios/ten_sec/info?uid=${uid}`,
            headers: JSON.parse(cgwzhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {
                    console.log(`【查询剩余次数】：${result.data.num}\n`)
                    if (rusult.data.num == 0) {
                        console.log(`【无剩余次数】\n`)
                    } else {
                        console.log(`【开始挑战十秒】\n`)
                        await $.wait(DD)
                        await cgwzten()
                    }

                } else {

                    console.log(`【查询剩余次数失败】：${result.message}\n`)
                    $.message += `【查询剩余次数失败】：${result.message}\n`

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//十秒挑战
function cgwzten(timeout = 0) {
    return new Promise((resolve) => {
        uid = cgwzurl.match(/uid=(\d+)/)[1]
        let url = {
            url: `https://api.litemob.com/caigewangzhe_ios/ten_sec/add_gold`,
            headers: JSON.parse(cgwzhd),
            body: `{
            "uid": "${uid}"
          }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {
                    console.log(`【十秒挑战获得金币】：${result.data.gold}\n`)
                    $.message += `【十秒挑战获得金币】：${result.data.gold}\n`
                    did = result.data.double_id
                    await $.wait(DD)
                    await cgwztendouble()
                } else {

                    console.log(`【十秒挑战获得金币失败】：${result.message}\n`)
                    $.message += `【十秒挑战获得金币失败】：${result.message}\n`

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}




//十秒挑战翻倍
function cgwztendouble(timeout = 0) {
    return new Promise((resolve) => {
        uid = cgwzurl.match(/uid=(\d+)/)[1]
        let url = {
            url: `https://api.litemob.com/caigewangzhe_ios/ten_sec/double`,
            headers: JSON.parse(cgwzhd),
            body: `{
                "uid": "${uid}",
                "double_id": "${did}"
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {
                    console.log(`【十秒挑战翻倍获得金币】：${result.data.gold}\n`)
                    $.message += `【十秒挑战翻倍获得金币】：${result.data.gold}\n`
                    await $.wait(DD)
                    await cgwztencout()

                } else {

                    console.log(`【十秒挑战翻倍获得金币失败】：${result.message}\n`)
                    $.message += `【十秒挑战翻倍获得金币失败】：${result.message}\n`

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//十秒挑战存储次数
function cgwztencout(timeout = 0) {
    return new Promise((resolve) => {
        uid = cgwzurl.match(/uid=(\d+)/)[1]
        let url = {
            url: `https://api.litemob.com/caigewangzhe_ios/ten_sec/dec`,
            headers: JSON.parse(cgwzhd),
            body: `{
                "uid": "${uid}",
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {
                    console.log(`【十秒挑战存储次数】：${result.message}\n`)
                    $.message += `【十秒挑战存储次数】：${result.message}\n`

                } else {

                    console.log(`【十秒挑战存储次数失败】：${result.message}\n`)
                    $.message += `【十秒挑战存储次数失败】：${result.message}\n`

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}






//猜歌王者答题信息获取
function cgwzdtinfo(timeout = 0) {
    return new Promise((resolve) => {
        uid = cgwzurl.match(/uid=(\d+)/)[1]
        let url = {
            url: `https://api.litemob.com/caigewangzhe_ios/song/info?uid=${uid}&is_test=0`,
            headers: JSON.parse(cgwzhd),

        }
        $.get(url, async (err, resp, data) => {

            try {
                const result = JSON.parse(data)
                if (result.code == 200) {
                    ans = result.data.answer
                    $.log(`\n猜歌王者题目答案:${result.data.answer}`)
                    //$done()
                    await cgwz()
                } else {
                    

                    console.log(data)

                }

            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}
//答题
function cgwz(timeout = 0) {
    return new Promise((resolve) => {
        const headers = {
            'Accept': `*/*`,
            'Accept-Encoding': `gzip, deflate, br`,
            'Connection': `keep-alive`,
            'Content-Type': `application/json`,
            'Host': `api.litemob.com`,
            'User-Agent': `cai ge wang zhe/1.3.0 (iPhone; iOS 14.4.1; Scale/3.00)`,
            'version': `1.3.0`,
            'Accept-Language': `zh-Hans-CN;q=1`
        };
        let url = {
            url: 'https://api.litemob.com/caigewangzhe_ios/song/reply',
            headers: headers,
            body: `{"uid":"${uid}","text":"${ans}","is_test":"0"}`,
        }
        $.post(url, async (err, resp, data) => {

            try {
                const result = JSON.parse(data)
                if (result.code == 200) {
                    dtdid = result.data.double_id
                    $.log(`\n猜歌王者答题成功:获得:${result.data.gold}`)
                    await $.wait(15000)
                    await cgwzfb()
                    //$done()
                } else {

                    $.log(`\n猜歌王者答题失败：${result.message}`)
                    console.log(data)

                }

            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}


//答题翻倍
function cgwzfb(timeout = 0) {
    return new Promise((resolve) => {
        const headers = {
            'Accept': `*/*`,
            'Accept-Encoding': `gzip, deflate, br`,
            'Connection': `keep-alive`,
            'Content-Type': `application/json`,
            'Host': `api.litemob.com`,
            'User-Agent': `cai ge wang zhe/1.3.0 (iPhone; iOS 14.4.1; Scale/3.00)`,
            'version': `1.3.0`,
            'Accept-Language': `zh-Hans-CN;q=1`
        };
        let url = {
            url: 'https://api.litemob.com/caigewangzhe_ios/song/double',
            headers: headers,
            body: `{"uid":"${uid}","double_id":"${dtdid}"}`,
        }
        $.post(url, async (err, resp, data) => {

            try {
                const result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`\n猜歌王者答题翻倍成功:获得:${result.data.gold}`)
                    await $.wait(1000)
                    await cgwz1()
                    //$done()
                } else {
                   
                    console.log(data)

                }

            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}


function cgwz1(timeout = 0) {
    return new Promise((resolve) => {
        const headers = {
            'Accept': `*/*`,
            'Accept-Encoding': `gzip, deflate, br`,
            'Connection': `keep-alive`,
            'Content-Type': `application/json`,
            'Host': `api.litemob.com`,
            'User-Agent': `cai ge wang zhe/1.3.0 (iPhone; iOS 14.4.1; Scale/3.00)`,
            'version': `1.3.0`,
            'Accept-Language': `zh-Hans-CN;q=1`
        };
        let url = {
            url: 'https://api.litemob.com/caigewangzhe_ios/song/next',
            headers: headers,
            body: `{"uid":"${uid}","is_test":"0"}`,
        }
        $.post(url, async (err, resp, data) => {

            try {
                const result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`\n猜歌王者上报数据:${result.data.info}`)
                    //$done()
                    await $.wait(10000)
                    await cgwzdtjh()
                } else {
                    await $.wait(100);

                    console.log(result.message)

                }

            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}
//获取答题机会
function cgwzdtjh(timeout = 0) {
    return new Promise((resolve) => {
        const headers = {
            'Accept': `*/*`,
            'Accept-Encoding': `gzip, deflate, br`,
            'Connection': `keep-alive`,
            'Content-Type': `application/json`,
            'Host': `api.litemob.com`,
            'User-Agent': `cai ge wang zhe/1.3.0 (iPhone; iOS 14.4.1; Scale/3.00)`,
            'version': `1.3.0`,
            'Accept-Language': `zh-Hans-CN;q=1`
        };
        let url = {
            url: 'https://api.litemob.com/caigewangzhe_ios/song/video',
            headers: headers,
            body: `{"uid":"${uid}"}`,
        }
        $.post(url, async (err, resp, data) => {

            try {
                const result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`\n猜歌王者获取答题机会:${result.data.info}`)
                    //$done()
                } else {
                    await $.wait(100);

                    console.log(result.message)

                }

            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}




//抢现金
function cgwzqxj(timeout = 0) {
    return new Promise((resolve) => {
        const headers = {
            'Accept': `*/*`,
            'Accept-Encoding': `gzip, deflate, br`,
            'Connection': `keep-alive`,
            'Content-Type': `application/json`,
            'Host': `api.litemob.com`,
            'User-Agent': `cai ge wang zhe/1.3.0 (iPhone; iOS 14.4.1; Scale/3.00)`,
            'version': `1.3.0`,
            'Accept-Language': `zh-Hans-CN;q=1`
        };
        let url = {
            url: 'https://api.litemob.com/caigewangzhe_ios/zheng_dian/check',
            headers: headers,
            body: `{"uid":"${uid}"}`,
        }
        $.post(url, async (err, resp, data) => {

            try {
                const result = JSON.parse(data)
                if (result.code == 302) {
                    $.log(`\n抢现金失败:${result.message}`)
                    //$done()
                } else {

                    console.log(result.message)

                }

            } catch (e) {
                //$.logErr(e, resp);
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

