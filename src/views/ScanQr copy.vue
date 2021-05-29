<template>
    <div class="grid grid-cols-5">
        <div class="col-span-2">
            <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
        </div>
    </div>
</template>

<script>
import { QrcodeStream } from 'vue3-qrcode-reader'
import { useToast } from 'vue-toastification'
export default {
    data() {
        return {
            result: '',
            error: '',
        }
    },
    setup() {
        const toast = useToast()
        return { toast }
    },
    components: { QrcodeStream },
    methods: {
        paintOutline(decodeData, ctx) {
            var points = []

            for (var k in decodeData) {
                switch (k) {
                    case 'topLeftCorner':
                        points[0] = decodeData[k]
                        break
                    case 'topRightCorner':
                        points[1] = decodeData[k]
                        break
                    case 'bottomRightCorner':
                        points[2] = decodeData[k]
                        break
                    case 'bottomLeftCorner':
                        points[3] = decodeData[k]
                        break
                    default:
                        break
                }
            }
            ctx.strokeStyle = 'green'
            ctx.lineWidth = 5

            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y)
            for (const { x, y } of points) {
                ctx.lineTo(x, y)
            }
            ctx.lineTo(points[0].x, points[0].y)
            ctx.closePath()
            ctx.stroke()
        },
        onDecode(result) {
            this.toast.success(result, {
                transition: 'Vue-Toastification__bounce',
                maxToasts: 20,
                newestOnTop: true,
            })
            this.result = result
        },

        async onInit(promise) {
            try {
                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    this.error =
                        'ERROR: you need to grant camera access permisson'
                } else if (error.name === 'NotFoundError') {
                    this.error = 'ERROR: no camera on this device'
                } else if (error.name === 'NotSupportedError') {
                    this.error =
                        'ERROR: secure context required (HTTPS, localhost)'
                } else if (error.name === 'NotReadableError') {
                    this.error = 'ERROR: is the camera already in use?'
                } else if (error.name === 'OverconstrainedError') {
                    this.error = 'ERROR: installed cameras are not suitable'
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error =
                        'ERROR: Stream API is not supported in this browser'
                }
            }
            if (this.error != '') {
                this.toast.error(this.error, {
                    transition: 'Vue-Toastification__bounce',
                    maxToasts: 20,
                    newestOnTop: true,
                })
            }
        },
    },
    mounted() {},
}
</script>

<style></style>
