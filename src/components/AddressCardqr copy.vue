<template>
    <div
        class="card hover:shadow-lg text-black print:text-black print:h-52"
        id="ajd"
    >
        <div class="pl-1 grid grid-cols-7 print:text-black">
            <div class="col-span-4">
                <span class="font-bold text-black overflow-auto uppercase">
                    {{ Address.fname }} {{ Address.lname }}
                    {{ Address.surname }}
                </span>
                <span
                    class="
                        block
                        text-gray-700 text-sm
                        font-semibold
                        flex-wrap
                        uppercase
                        text-justify
                        print:text-black
                    "
                >
                    {{ Address.doorNo }}, {{ Address.houseName }},
                    {{ Address.streetName }}, {{ Address.road }},
                    {{ Address.area }}, {{ Address.landmark }}
                </span>
                <span
                    class="
                        block
                        text-gray-700 text-sm
                        font-semibold
                        flex-wrap
                        uppercase
                        text-justify
                        print:text-black
                    "
                >
                    {{ Address.city }},{{ Address.state }},
                    {{ Address.country }}, PINCODE : {{ Address.pincode }},
                </span>

                <span
                    class="
                        block
                        text-gray-700
                        font-semibold
                        overflow-auto
                        uppercase
                        text-justify
                        print:text-black
                    "
                >
                    Mobile: {{ Address.mobile1 }} | {{ Address.mobile2 }} |
                    {{ Address.landline }}
                </span>
            </div>
            <div class="col-span-3 flex justify-center print:text-black">
                <canvas :id="Address._id.toHexString()" class="p-2"></canvas>
            </div>
        </div>
        <!-- <svg
            id="code128"
            :jsbarcode-value="Address._id"
            jsbarcode-textmargin="0"
            jsbarcode-fontoptions="bold"
            class="h-20 w-full object-cover"
        ></svg> -->
    </div>
</template>

<script>
//import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode'
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
        var canvas = document.getElementById(this.Address._id.toHexString())
        QRCode.toCanvas(
            canvas,
            this.Address._id.toHexString(),
            {
                errorCorrectionLevel: 'm',
                color: {
                    dark: '#00F', // Blue dots
                    light: '#0000', // Transparent background
                },
            },
            function (error) {
                if (error) console.error(error)
                console.log('success!')
            }
        )
    },
}
</script>

<style scoped>
@media print {
    #ajd {
        page-break-before: always;
    }
}
</style>
