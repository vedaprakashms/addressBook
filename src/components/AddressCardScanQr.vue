<template>
    <div class="bg-white rounded text-black text-lg">
        <div v-if="Address._id">
            <h1 class="text-3xl text-green-600 underline">
                Last Scanned Address for ID : {{ Address._id.toHexString() }}
            </h1>
            <div class="text-2xl">
                <label class="text-green-800">Name: </label>
                <label>
                    {{ Address.fname }} {{ Address.lname }}
                    {{ Address.surname }}
                </label>
            </div>
            <div class="text-2xl">
                <label class="text-green-800"> Address: </label>
                <label>
                    {{ Address.doorNo }}, {{ Address.houseName }},
                    {{ Address.streetName }}, {{ Address.road }},
                    {{ Address.area }}, {{ Address.landmark }},{{
                        Address.city
                    }},{{ Address.state }}, {{ Address.country }}, PINCODE :
                    {{ Address.pincode }}.
                </label>
            </div>
            <div class="text-2xl">
                <label> Mobile Nos: </label>
                <label>
                    {{ Address.mobile1 }} | {{ Address.mobile2 }} |
                    {{ Address.landline }}
                </label>
            </div>
        </div>
        <div></div>
        <button
            @click="genXL"
            class="
                w-full
                rounded
                bg-gradient-to-r
                from-red-500
                via-green-600
                to-yellow-400
                text-gray-100 text-xl
                font-bold
            "
        >
            Generate Scanned Excel Sheet
        </button>
    </div>
</template>

<script>
import XLSX from 'xlsx'
import * as remote from '@electron/remote'
export default {
    props: {
        Address: {
            type: Object,
            required: true,
            // default: function () {
            //     return {
            //         fname: 'To be Scanned',
            //         lname: 'To be Scanned',
            //         surname: 'To be Scanned',
            //         mobile1: 'To be Scanned',
            //         mobile2: 'To be Scanned',
            //         landline: 'To be Scanned',
            //         doorNo: 'To be Scanned',
            //         houseName: 'To be Scanned',
            //         streetName: 'To be Scanned',
            //         road: 'To be Scanned',
            //         area: 'To be Scanned',
            //         landmark: 'To be Scanned',
            //         city: 'To be Scanned',
            //         state: 'Karnataka',
            //         country: 'India',
            //         pincode: 'To be Scanned',
            //     }
            // },
        },
    },
    data() {
        var Addrs = []
        return { Addrs }
    },
    watch: {
        Address: {
            immediate: true,
            handler(val) {
                this.Addrs.push(val)
            },
        },
    },
    methods: {
        genXL: async function () {
            this.Addrs.shift()
            console.log(this.Addrs)
            const d = new Date()
            var temp = []
            await this.Addrs.map((r) => {
                var k = r._id.toHexString()
                r._id = k
                temp.push(r)
            })

            const ws = XLSX.utils.json_to_sheet(temp)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, 'test')
            let { filePath, canceled } = await remote.dialog.showSaveDialog({
                title: 'Save Excel',
                defaultPath:
                    'Addersslist Scan' +
                    '_' +
                    d.toDateString() +
                    '-' +
                    d.getHours() +
                    '-' +
                    d.getMinutes() +
                    '-' +
                    d.getSeconds() +
                    '.xlsx',
            })
            console.log(filePath, canceled)
            if (!canceled) {
                XLSX.writeFile(wb, filePath)
            }
        },
    },
}
</script>

<style></style>
