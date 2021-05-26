<template>
    <div class="card hover:shadow-lg border-purple-900 border-4 text-black">
        <div class="pl-1 h-36">
            <span class="font-bold text-black overflow-auto">
                {{ Address.fname }} {{ Address.lname }} {{ Address.surname }}
            </span>
            <span class="block text-gray-700 text-sm font-semibold flex-wrap">
                Door NO: {{ Address.doorNo }}, {{ Address.houseName }},
                {{ Address.streetName }}, {{ Address.road }},
                {{ Address.area }}, {{ Address.landmark }},{{ Address.city }},{{
                    Address.state
                }}, {{ Address.country }}, -
                {{ Address.pincode }}
            </span>

            <span class="block text-gray-700 font-semibold overflow-auto">
                Mobile|Phone : {{ Address.mobile1 }} | {{ Address.mobile2 }} |
                {{ Address.landline }}
            </span>
        </div>
        <svg
            id="code128"
            :jsbarcode-value="Address._id"
            jsbarcode-textmargin="0"
            jsbarcode-fontoptions="bold"
            class="h-20 w-full object-cover"
        ></svg>
    </div>
</template>

<script>
import JsBarcode from 'jsbarcode'
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
        JsBarcode('#code128').init()
    },
}
</script>

<style></style>
