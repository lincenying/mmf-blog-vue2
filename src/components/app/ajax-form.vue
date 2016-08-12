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
            'method' : {
                type     : String,
                required : true
            },
            'enctype': String,
            'beforeFormSubmit': {
                type: Function,
                default() {
                    return function(){}
                }
            },
            'onFormError': {
                type: Function,
                default() {
                    return function(){}
                }
            },
            'onFormComplete': {
                type: Function,
                default() {
                    return function(){}
                }
            },
            'onFormProgress': {
                type: Function,
                default() {
                    return function(){}
                }
            },
            'afterFormSubmit': {
                type: Function,
                default() {
                    return function(){}
                }
            }
        },
        methods: {
            handleAjaxFormSubmit () {
                this.beforeFormSubmit()
                var handleError = err => {
                    this.onFormError(err)
                }
                if (!this.method) {
                    this.method = 'post'
                }
                // eslint-disable-next-line
                var xhr = new XMLHttpRequest()
                var handleFinish = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status < 400) {
                            this.onFormComplete(xhr.response)
                        } else {
                            this.onFormError(xhr.statusText)
                        }
                    }
                }
                var handleProgress = evt => {
                    if (evt.lengthComputable) {
                        evt.percent = evt.loaded / evt.total * 100
                        this.onFormProgress(evt)
                    }
                }
                xhr.open(this.method, this.action, true)
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
                xhr.setRequestHeader('Authorization', 'Basic dGVzdDpwYXNzd2Q=')
                if (this.vResponseType) {
                    xhr.responseType = this.vResponseType
                } else {
                    xhr.responseType = 'json'
                }
                if (xhr.upload) xhr.upload.addEventListener('progress', handleProgress)
                xhr.addEventListener('readystatechange', handleFinish)
                xhr.addEventListener('error', handleError)
                xhr.addEventListener('abort', handleError)
                // eslint-disable-next-line
                var data = new FormData(event.target)
                xhr.send(data)
                this.afterFormSubmit()
            }
        }
    }
</script>
