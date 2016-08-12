<style>
    .loading-bar {
        transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease;
        -o-transition: all 0.3s ease
    }
    .loading-bar {
        position: fixed;
        top: 0;
        background: #74bc48;
        height: 3px;
        opacity: 1
    }
    .glow-bar {
        top: 0;
        position: absolute;
        width: 100px;
        height: 100%;
        box-shadow: -3px 0 15px 1px rgba(0, 255, 231, 0.4)
    }
    .to-right.loading-bar {
        left: 0
    }
    .to-right .glow-bar {
        right: 0
    }
    .to-left.loading-bar {
        right: 0
    }
    .to-left .glow-bar {
        left: 0
    }
    .full.loading-bar {
        transition: all 0.1s ease;
        -moz-transition: all 0.1s ease;
        -webkit-transition: all 0.1s ease;
        -o-transition: all 0.1s ease;
        height: 0;
        opacity: 0
    }
    .error.loading-bar {
        background: #F44336
    }
    .error .glow-bar {
        box-shadow: -3px 0 15px 1px rgba(244, 67, 54, 0.4)
    }
</style>

<template>
    <div v-if="show"
         class="loading-bar to-{{ direction }} {{ full }} {{ error ? 'error' : '' }}"
         :style="styling()">
        <div class="glow-bar"></div>
    </div>
</template>

<script lang="babel">
    export default {
        props: {
            progress: Number,
            direction: {
                type: String,
                default: "right"
            },
            error: Boolean
        },
        data() {
            return {
                show: true,
                full: '',
                width: 0,
                wait: false
            }
        },
        methods: {
            styling() {
                if (!this.wait) {
                    return {width: `${this.width}%`}
                } else {
                    return {width: `100%`}
                }
            }
        },
        watch: {
            progress(val, old){
                if (old == 0 && val > 0) {
                    this.$dispatch('loading-bar:started')
                }
                if (val > 1 && val < 100) {
                    this.$dispatch('loading-bar:loading')
                }
                if (this.progress == 100) {
                    this.wait = true
                    this.width = 100
                    setTimeout(() => {
                        this.full = 'full'
                        this.error = false
                        setTimeout(() => {
                            this.show = false
                            this.progress = 0
                            this.wait = false
                            setTimeout(() => {
                                this.full = ''
                                this.show = true
                                this.$dispatch('loading-bar:loaded')
                            })
                        }, 250)
                    }, 700)
                } else {
                    this.full = ''
                    this.width = val
                }
            },
            error(val, old){
                this.progress = 100
                this.$dispatch('loading-bar:error')
            }
        }
    }
</script>
