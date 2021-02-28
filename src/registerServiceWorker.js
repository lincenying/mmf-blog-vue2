/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready() {
            console.log('App is being served from cache by a service worker.\n For more details, visit https://goo.gl/AFskqB')
        },
        registered() {
            console.log('Service worker has been registered.')
        },
        cached() {
            console.log('Content has been cached for offline use.')
        },
        updatefound() {
            console.log('New content is downloading.')
        },
        updated() {
            console.log('New content is available; please refresh.')
            const metas = document.head.getElementsByTagName('meta')

            for (let i = 0, len = metas.length; i < len; i++) {
                const meta = metas[i]

                if (meta.name === 'theme-color') {
                    meta.content = '#000'
                }
            }

            const dom = document.createElement('div')

            /* eslint-disable max-len */
            dom.innerHTML = `
                    <div class="app-refresh" id="app-refresh">
                        <div class="app-refresh-wrap" onclick="location.reload()">
                            <label>发现新的版本, 请刷新加载最新版本</label>
                            <span>点击刷新</span>
                        </div>
                    </div>
                `
            /* eslint-enable max-len */

            document.body.appendChild(dom)
            setTimeout(function () {
                document.getElementById('app-refresh').className += ' app-refresh-show'
            }, 16)
        },
        offline() {
            console.log('No internet connection found. App is running in offline mode.')
        },
        error(error) {
            console.error('Error during service worker registration:', error)
        }
    })
}
