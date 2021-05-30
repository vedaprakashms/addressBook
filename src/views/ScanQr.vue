<template>
    <div>
        <div class="flex justify-center">
            <select
                id="select"
                @change="viewChange"
                class="rounded text-xl p-2 ml-2"
            >
                <option value="">Select Camera</option>
            </select>
            <button
                type="reset"
                class="
                    p-2
                    ml-2
                    rounded
                    w-1/6
                    bg-gradient-to-r
                    from-red-500
                    via-green-600
                    to-yellow-400
                    text-gray-100 text-xl
                    font-bold
                "
                @click="stopVideo"
            >
                Stop Camera
            </button>
        </div>

        <div class="grid grid-cols-2 gap-2 m-2">
            <canvas id="canvas" class="col-span-1"></canvas>
            <div class="col-span-1 col-start-2 text-white text-center">
                placeholder for address verification
            </div>
        </div>
    </div>
</template>

<script>
import { useToast } from 'vue-toastification'
import mongoose from 'mongoose'
import address from '../model/addressModel'
import jsQR from 'jsqr'
export default {
    data() {
        let currentStream
        let video
        return {
            result: '',
            error: '',
            lastscan: '',
            currentscan: '',
            currentStream,
            address: {
                fname: '',
                lname: '',
                surname: '',
                mobile1: null,
                mobile2: null,
                landline: null,
                doorNo: null,
                houseName: '',
                streetName: '',
                road: '',
                area: '',
                landmark: '',
                city: '',
                state: 'Karnataka',
                country: 'India',
                pincode: null,
            },
            video,
        }
    },
    setup() {
        const toast = useToast()
        return { toast }
    },
    components: {},
    methods: {
        stopVideo: function () {
            if (typeof this.currentStream !== 'undefined') {
                this.currentStream.getTracks().forEach((t) => {
                    t.stop()
                })
            }
        },
        startVideo: (video) => {
            navigator.mediaDevices
                .getUserMedia({ video: { facingMode: 'environment' } })
                .then(function (stream) {
                    video.srcObject = stream
                    video.setAttribute('playsinline', true) // required to tell iOS safari we don't want fullscreen
                    video.play()
                })
        },
        getDevices: async function () {
            await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            })
            await navigator.mediaDevices.enumerateDevices().then((r) => {
                this.gotDevices(r)
            })
        },
        gotDevices: function (mediaDevices) {
            const select = document.getElementById('select')
            //select.innerHTML = ''
            //select.appendChild(document.createElement('option'))
            let count = 1
            mediaDevices.forEach((mediaDevice) => {
                if (mediaDevice.kind === 'videoinput') {
                    const option = document.createElement('option')
                    option.value = mediaDevice.deviceId
                    const label = mediaDevice.label || `Camera ${count++}`
                    const textNode = document.createTextNode(label)
                    option.appendChild(textNode)
                    select.appendChild(option)
                }
            })
        },
        viewChange: function () {
            const select = document.getElementById('select')
            this.video = document.createElement('video')
            //var canvasElement = document.getElementById('canvas')
            //var canvas = canvasElement.getContext('2d')
            if (typeof this.currentStream !== 'undefined') {
                this.currentStream.getTracks().forEach((t) => {
                    t.stop()
                })
            }
            const videoConstraints = {}
            if (select.value === '') {
                console.log('selected camera closing')
                // videoConstraints.facingMode = 'environment'
                this.currentStream.getTracks().forEach((t) => {
                    t.stop()
                })
            } else {
                videoConstraints.deviceId = { exact: select.value }
            }
            const constraints = {
                video: videoConstraints,
                audio: false,
            }

            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                this.currentStream = stream
                this.video.srcObject = stream
                this.video.play()
                requestAnimationFrame(() => {
                    this.getQR(this.video)
                })
            })
        },
        getQR: function async(video) {
            var canvasElement = document.getElementById('canvas')
            var canvas = canvasElement.getContext('2d')
            //var video = document.getElementById('video')
            video.addEventListener(
                'loadedmetadata',
                function () {
                    // retrieve dimensions
                    const height = this.videoHeight
                    const width = this.videoWidth
                    canvasElement.height = this.videoHeight
                    canvasElement.width = this.videoWidth
                    // send back result
                    return { height, width }
                },
                false
            )
            canvas.drawImage(
                video,
                0,
                0,
                canvasElement.width,
                canvasElement.height
            )
            var imageData = canvas.getImageData(
                0,
                0,
                canvasElement.width,
                canvasElement.height
            )
            var code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'dontInvert',
            })
            if (code) {
                this.currentscan = code.data
                if (this.currentscan != this.lastscan && code.data != '') {
                    //update the actual code logic to get the elements from db here
                    this.lastscan = this.currentscan
                    console.log('Found QR code', code.data)
                    console.log(code.data)

                    this.entry(code.data)
                }

                this.drawLine(
                    code.location.topLeftCorner,
                    code.location.topRightCorner,
                    '#FF3B58'
                )
                this.drawLine(
                    code.location.topRightCorner,
                    code.location.bottomRightCorner,
                    '#FF3B58'
                )
                this.drawLine(
                    code.location.bottomRightCorner,
                    code.location.bottomLeftCorner,
                    '#FF3B58'
                )
                this.drawLine(
                    code.location.bottomLeftCorner,
                    code.location.topLeftCorner,
                    '#FF3B58'
                )
            }
            requestAnimationFrame(() => {
                this.getQR(video)
            })
        },
        drawLine: function (begin, end, color) {
            var canvasElement = document.getElementById('canvas')
            var canvas = canvasElement.getContext('2d')
            canvas.beginPath()
            canvas.moveTo(begin.x, begin.y)
            canvas.lineTo(end.x, end.y)
            canvas.lineWidth = 4
            canvas.strokeStyle = color
            canvas.stroke()
        },
        async entry(id) {
            await mongoose
                .connect('mongodb://localhost/addressbook', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
                .then(() => {
                    address
                        .findById(id)
                        .then((o) => {
                            console.log(o)
                            this.address = o._doc
                            this.toast.success(o._id.toHexString(), {
                                transition: 'Vue-Toastification__bounce',
                                maxToasts: 20,
                                newestOnTop: false,
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                            this.toast.error(
                                'Did not find the address, Due to Error: ' +
                                    err,
                                {
                                    transition: 'Vue-Toastification__bounce',
                                    maxToasts: 20,
                                    newestOnTop: false,
                                }
                            )
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    console.log(this.address)
                })
        },
    },
    mounted() {
        //this.startVideo()
        //this.getDevices()
        // navigator.mediaDevices.getUserMedia({
        //     audio: true,
        //     video: true,
        // })
        navigator.mediaDevices.enumerateDevices().then((r) => {
            this.gotDevices(r)
        })
    },
}
</script>

<style></style>
