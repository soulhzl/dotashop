import { moneyFilter } from '../filter/moneyFilter'
export default {
    methods: {
        backRoute() {
            // 返回路由
            this.$router.go(-1)
        }
    }, filters: {
        fixedMoney(money) {
            return moneyFilter(money)
        }
    }
}