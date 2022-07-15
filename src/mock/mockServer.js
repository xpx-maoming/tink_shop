import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/shopGoods', {code:0, data:data.goods})
Mock.mock('/shopInfo', {code:0, data:data.info})
Mock.mock('/shopRating', {code:0, data:data.ratings})
Mock.mock('/sousuo', {code:0,data:data.sousuo})

