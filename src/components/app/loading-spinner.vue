<style>
.spinner {
    width: 90px;
    height: 90px;
    position: absolute;
    z-index: 10099;
    left: 50%;
    top: 50%;
    margin: -125px 0 0 -45px;
    text-align: center;
    -webkit-animation: rotate 2s infinite linear;
    animation: rotate 2s infinite linear;
}
.dot1,
.dot2 {
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: #67cf22;
    border-radius: 100%;

    -webkit-animation: bounce 2s infinite ease-in-out;
    animation: bounce 2s infinite ease-in-out;
}
.dot2 {
    top: auto;
    bottom: 0;
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
}
@-webkit-keyframes rotate {
    100% {
        -webkit-transform: rotate(360deg);
    }
}
@keyframes rotate {
    100% {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }
}
@-webkit-keyframes bounce {
    0%,
    100% {
        -webkit-transform: scale(0);
    }
    50% {
        -webkit-transform: scale(1);
    }
}
@keyframes bounce {
    0%,
    100% {
        transform: scale(0);
        -webkit-transform: scale(0);
    }
    50% {
        transform: scale(1);
        -webkit-transform: scale(1);
    }
}
</style>

<template>
    <div v-if="loading" class="spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
    </div>
</template>

<script>
export default {
    props: ['loading']
}
</script>
