const SERVERURL = "http://127.0.0.1:7001/"
const LOCALURL = "http://1.15.65.175:8022/"
// 服务器
const URL = {
	lorUser: LOCALURL + 'user/loruser',
	home: '/dotashop/stable.json',
	getGoodsInfo: LOCALURL + 'goods/getgoodsinfo',
	getCategoryGoods: LOCALURL + 'goods/getcategorygoods',
	getSearchList: LOCALURL + 'goods/getsearchList',
	saveAddress: LOCALURL + 'user/saveaddress',
	getAddressList: LOCALURL + 'user/getaddresslist',
}
module.exports = URL