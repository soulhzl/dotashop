const SERVERURL = "http://127.0.0.1:8022/"
const LOCALURL = "http://1.15.65.175:8022/"
// 服务器
const URL = {
	lorUser: SERVERURL + 'user/loruser',
	home: '/dotashop/stable.json',
	getGoodsInfo: SERVERURL + 'goods/getgoodsinfo',
	getCategoryGoods: SERVERURL + 'goods/getcategorygoods',
	getSearchList: SERVERURL + 'goods/getsearchList',
	saveAddress: SERVERURL + 'user/saveaddress',
	getAddressList: SERVERURL + 'user/getaddresslist',
}
module.exports = URL