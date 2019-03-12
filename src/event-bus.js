/**
 * @file 事件总线
 * @author lincenying(lincenying@qq.com)
 */

const install = Vue => {
    const bus = new Vue({
        data: {
            default: {}
        }
    })

    Object.defineProperties(bus, {
        on: {
            get() {
                return this.$on
            }
        },
        once: {
            get() {
                return this.$once
            }
        },
        off: {
            get() {
                return this.$off
            }
        },
        emit: {
            get() {
                return this.$emit
            }
        }
    })

    Vue.bus = bus

    Object.defineProperty(Vue.prototype, '$bus', {
        get() {
            return bus
        }
    })
}
export default {
    install
}
