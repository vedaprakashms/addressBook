<template>
    <div class="text-yellow-100 flex justify-center">
        <div>
            <h1 class="text-3xl">Address Lists</h1>
            <h2>{{ port }}</h2>
            <input type="text" v-model="message" />
            {{ message }}
            <button @click="genbar">abc</button>
            <svg
                id="code128"
                :jsbarcode-value="message"
                jsbarcode-textmargin="0"
                jsbarcode-fontoptions="bold"
                class="m-2"
            ></svg>
        </div>
    </div>
</template>

<script>
import JsBarcode from 'jsbarcode'
export default {
    data: () => {
        return {
            message: '',
            port: '',
        }
    },
    methods: {
        genbar() {
            console.log(this.message)
            var k = this.message
            if (k != '') {
                JsBarcode('#code128').init()
            }
        },
    },
    mounted() {
        this.port = localStorage.getItem('portval')
    },
}
</script>

<style></style>
