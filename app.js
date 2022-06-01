import fetch from "node-fetch"
import {Telegraf} from 'telegraf'

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

const bot = new Telegraf("5349660310:AAHTQFzjaY9CiGuW02aXKstz0RkwWaaqngw")
let groups = []

bot.start((ctx) => {
    let msg = ctx.message.chat
    let obj = {to:msg,id:msg.id}
    let bool = false
    
    for (let gp of groups){
        if (gp.id===obj.id) {return bool = true}
    }
    if (!bool) groups.push(obj)
    ctx.reply('فعالیت من شروع شد. خبرتون میکنم. ')
})
bot.launch()

let get = async () => {
    try {
        
        let result = await fetch("https://hostservice.raja.ir/Api/ServiceProvider/TrainListEq?q=ywLVWzxYz2DPZn1+vZWcSk2GBragETsvwnPDhFnleR1Ep07YlsYII7jiZXOYXMm8PnRY2R3w+J/9m9wreg0RXakXbT1zI+5YAopkbbL27dk=", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9,fa;q=0.8,ps;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
                "content-type": "application/json",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://www.raja.ir/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        });
        if(result.status === 200){
            groups.map(obj=>{
                bot.telegram.sendMessage(obj.id,"باز شد");
            })            
        }
    } catch (error) {
        console.log(error.message)
    }

}

get()
// let t = setInterval(get, 0.5 * 3600 * 1000);
let t = setInterval(get, 10000);
