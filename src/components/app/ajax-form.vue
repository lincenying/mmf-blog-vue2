<template>
    <form :action="action" :method="method" :enctype="enctype" @submit.prevent="handleAjaxFormSubmit">
        <slot></slot>
    </form>
</template>
<script lang="babel">
    export default {
        props: {
            'action' : {
                type    : String,
                required: true
            },
            'method': {
                type: String,
                default() {
                    return 'POST'
                }
            },
            'enctype': {
                type: String,
                default() {
                    return 'multipart/form-data'
                }
            },
            'responsetype': {
                type: String,
                default() {
                    return 'json'
                }
            },
            'before': {
                type: Function,
                default() {
                    return function(){}
                }
            },
            'error': {
                type: Function,
                default() {
                    return function(){}
                }
            },
            'complete': {
                type: Function,
                default() {
                    return function(){}
                }
            },
            'progress': {
                type: Function,
                default() {
                    return function(){}
                }
            },
            'after': {
                type: Function,
                default() {
                    return function(){}
                }
            }
        },
        methods: {
            handleAjaxFormSubmit () {
                this.before()
                var handleError = err => {
                    this.error(err)
                }
                if (!this.method) {
                    this.method = 'post'
                }
                // eslint-disable-next-line
                var xhr = new XMLHttpRequest()
                var handleFinish = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status < 400) {
                            this.complete(xhr.response)
                        } else {
                            this.error(xhr.statusText)
                        }
                    }
                }
                var handleProgress = evt => {
                    if (evt.lengthComputable) {
                        evt.percent = evt.loaded / evt.total * 100
                        this.progress(evt)
                    }
                }
                xhr.open(this.method, this.action, true)
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
                xhr.setRequestHeader('Authorization', 'Basic dGVzdDpwYXNzd2Q=')
                xhr.responseType = this.responsetype
                if (xhr.upload) xhr.upload.addEventListener('progress', handleProgress)
                xhr.addEventListener('readystatechange', handleFinish)
                xhr.addEventListener('error', handleError)
                xhr.addEventListener('abort', handleError)
                // eslint-disable-next-line
                var data = new FormData(event.target)
                xhr.send(data)
                this.after()
            }
        }
    }
</script>
