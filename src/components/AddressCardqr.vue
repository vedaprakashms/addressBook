<template>
    <div class="card hover:shadow-lg text-black h-44">
        <div class="print:text-black m-1">
            <div class="" style="width: 70%">
                <span class="font-bold text-black overflow-x-hidden">
                    {{ Address.fname }} {{ Address.lname }}
                    {{ Address.surname }}
                </span>
                <span
                    class="
                        inline-block
                        ow-anywhere
                        text-gray-700 text-sm
                        font-semibold
                        print:text-black
                    "
                >
                    {{ Address.doorNo }}, {{ Address.houseName }},
                    {{ Address.streetName }}, {{ Address.road }},
                    {{ Address.area }}, {{ Address.landmark }},{{
                        Address.city
                    }},{{ Address.state }}, {{ Address.country }}, PINCODE :
                    {{ Address.pincode }}. Mobile: {{ Address.mobile1 }} |
                    {{ Address.mobile2 }} |
                    {{ Address.landline }}
                </span>
            </div>
            <!-- <div class="absolute bottom-0 right-0">
                <canvas :id="Address._id.toHexString()" class="p-2"></canvas>
            </div> -->
            <div
                :id="Address._id.toHexString()"
                class="absolute top-0 right-0 p-1"
            ></div>
        </div>
    </div>
</template>

<script>
//import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode'
import QRCodeStyling from 'qr-code-styling'
export default {
    props: {
        Address: {
            type: Object,
            required: true,
            default: function () {
                return {
                    fname: '',
                    lname: '',
                    surname: '',
                    mobile1: '',
                    mobile2: '',
                    landline: '',
                    doorNo: '',
                    houseName: '',
                    streetName: '',
                    road: '',
                    area: '',
                    landmark: '',
                    city: '',
                    state: 'Karnataka',
                    country: 'India',
                    pincode: '',
                }
            },
        },
    },
    mounted() {
        //JsBarcode('#code128').init()
        // var canvas = document.getElementById(this.Address._id.toHexString())
        // QRCode.toCanvas(
        //     canvas,
        //     this.Address._id.toHexString(),
        //     {
        //         errorCorrectionLevel: 'm',
        //     },
        //     function (error) {
        //         if (error) console.error(error)
        //         console.log('success!')
        //     }
        // )
        this.getqrs()
    },
    methods: {
        getqr() {
            var canvas = document.getElementById(this.Address._id.toHexString())
            QRCode.toCanvas(
                canvas,
                this.Address._id.toHexString(),
                {
                    errorCorrectionLevel: 'm',
                },
                function (error) {
                    if (error) console.error(error)
                    console.log('success!')
                }
            )
        },
        getqrs() {
            const qrCode = new QRCodeStyling({
                width: 90,
                height: 90,
                margin: 0,
                data: this.Address._id.toHexString(),
                qrOptions: {
                    typeNumber: '0',
                    mode: 'Byte',
                    errorCorrectionLevel: 'H',
                },
                imageOptions: {
                    hideBackgroundDots: true,
                    imageSize: 1,
                    margin: 0,
                },
                dotsOptions: { type: 'dots', color: '#ffff00', gradient: null },
                backgroundOptions: { color: '#ffffff' },
                image: null,
                dotsOptionsHelper: {
                    colorType: { single: true, gradient: false },
                    gradient: {
                        linear: true,
                        radial: false,
                        color1: '#6a1a4c',
                        color2: '#6a1a4c',
                        rotation: '0',
                    },
                },
                cornersSquareOptions: {
                    type: 'extra-rounded',
                    color: '#000000',
                    gradient: null,
                },
                cornersSquareOptionsHelper: {
                    colorType: { single: true, gradient: false },
                    gradient: {
                        linear: true,
                        radial: false,
                        color1: '#000000',
                        color2: '#000000',
                        rotation: '0',
                    },
                },
                cornersDotOptions: { type: 'dot', color: '#000000' },
                cornersDotOptionsHelper: {
                    colorType: { single: true, gradient: false },
                    gradient: {
                        linear: true,
                        radial: false,
                        color1: '#000000',
                        color2: '#000000',
                        rotation: '0',
                    },
                },
                backgroundOptionsHelper: {
                    colorType: { single: true, gradient: false },
                    gradient: {
                        linear: true,
                        radial: false,
                        color1: '#ffffff',
                        color2: '#ffffff',
                        rotation: '0',
                    },
                },
            })

            qrCode.append(
                document.getElementById(this.Address._id.toHexString())
            )
        },
    },
}
</script>

<style scoped>
/* @media print {
    #ajd {
        page-break-before: always;
    }
} */
.ow-anywhere {
    overflow-wrap: anywhere;
}
</style>
