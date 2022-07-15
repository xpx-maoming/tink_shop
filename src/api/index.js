import ajax from "./ajax";
// const bacs_url='/api';
const bacs_url='';


// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)
export const reqAddress=(geohash)=>ajax(`${bacs_url}/position/${geohash}`)
// [2、获取食品分类列表](#2获取食品分类列表)
export const reqFooter=()=>ajax(`${bacs_url}/index_category`)

// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)
export const reqShps=(longitude,latitude)=>ajax(`${bacs_url}/shops`,{longitude,latitude})

// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)
export const reqSarchShops=(geohash,keyword)=>ajax(`${bacs_url}/search_shops`,{keyword,geohash})

// [5、获取一次性验证码](#5获取一次性验证码)
export const reqCaptcha=()=>ajax(`${bacs_url}/captcha`)


// [6、用户名密码登陆](#6用户名密码登陆)
export const reqLoginPwd=({name,pwd,captcha})=>ajax(`${bacs_url}/login_pwd`,{name,pwd,captcha},'POST')

// [7、发送短信验证码](#7发送短信验证码)
export const reqSendcode=(phone)=>ajax(`${bacs_url}/sendcode`,{phone})


// [8、手机号验证码登陆](#8手机号验证码登陆)
export const reqLoginSms=(phone,code)=>ajax(`${bacs_url}/login_sms`,{phone,code},'POST')


// [9、根据会话获取用户信息](#9根据会话获取用户信息)
export const reqUserinfo=()=>ajax(`${bacs_url}/userinfo`)


// [10、用户登出](#10用户登出)
export const reqLogout=()=>ajax(`${bacs_url}/logout`)


//3个mock模拟数据接口
export const reqShopGoods=()=>ajax(`/shopGoods`)
export const reqShopInfo=()=>ajax(`/shopInfo`)
export const reqShopRating=()=>ajax(`/shopRating`)
export const reqShopSousuo=()=>ajax(`/sousuo`)


