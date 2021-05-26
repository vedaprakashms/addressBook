<template>
    <div>
        <div class="text-yellow-400 grid md:grid-cols-3 gap-1 p-1">
            <div
                class="
                    col-span-3
                    flex
                    justify-center
                    text-xl
                    font-bold
                    uppercase
                "
            >
                Modifying Details of Entry #
                <span class="text-pink-300"> {{ $route.params.id }} </span>
            </div>
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="First Name"
                v-model="address.fname"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Last Name"
                v-model="address.lname"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder=" Surname"
                v-model="address.surname"
            />
            <div
                class="
                    col-span-3
                    flex
                    justify-center
                    text-xl
                    font-bold
                    uppercase
                "
            >
                Phone / Mobile Details
            </div>
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Mobile 1"
                v-model="address.mobile1"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Mobile 2"
                v-model="address.mobile2"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Phone"
                v-model="address.landline"
            />
            <div
                class="
                    col-span-3
                    flex
                    justify-center
                    text-xl
                    font-bold
                    uppercase
                "
            >
                Address Details
            </div>
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Door No"
                v-model="address.doorNo"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="House Name"
                v-model="address.houseName"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Street / Lane"
                v-model="address.streetName"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Road"
                v-model="address.road"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Area"
                v-model="address.area"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Landmark"
                v-model="address.landmark"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="City"
                v-model="address.city"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="State"
                v-model="address.state"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="country"
                v-model="address.country"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Pincode"
                v-model="address.pincode"
            />
            <div
                class="
                    col-span-3
                    flex
                    justify-center
                    text-xl
                    font-bold
                    uppercase
                "
            >
                <button
                    type="submit"
                    class="
                        px-3
                        py-3
                        my-3
                        rounded
                        w-full
                        bg-gradient-to-r
                        from-red-500
                        via-green-600
                        to-yellow-400
                        text-gray-100 text-xl
                        font-bold
                        m-2
                    "
                    @click="update"
                >
                    Update Address
                </button>
                <button
                    type="submit"
                    class="
                        px-3
                        py-3
                        my-3
                        rounded
                        w-full
                        bg-gradient-to-r
                        from-red-500
                        via-green-600
                        to-yellow-400
                        text-gray-100 text-xl
                        font-bold
                        m-2
                    "
                    @click="del"
                >
                    Delete Address
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
// import axios from 'axios'
import mongoose from 'mongoose'
import address from '../model/addressModel'
import router from '@/router'
export default {
    name: 'Home',
    props: ['id'],
    data: () => {
        return {
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
            idno: null,
        }
    },
    components: {},
    mounted() {
        console.log(this.$router.currentRoute.value.href)
        console.log(this.$route.params.id)
        this.entry(this.$route.params.id)
        this.idno = this.$route.params.id
    },
    methods: {
        async entry(id) {
            var k = this.address
            console.log(k)
            await mongoose
                .connect('mongodb://localhost/addressbook', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
                .then((res) => {
                    console.log(res)
                    address.findById(id).then((o) => {
                        console.log(o)
                        this.address = o._doc
                    })
                })
                .catch((err) => {
                    console.log(err)
                    return {}
                })
        },
        async update() {
            var k = this.address
            console.log(k)
            await mongoose
                .connect('mongodb://localhost/addressbook', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
                .then((res) => {
                    console.log(res)
                    address
                        .findByIdAndUpdate(this.idno, this.address)
                        .then((o) => {
                            console.log(o._doc)
                            router.push({ path: `/addressList` })
                        })
                        .catch((err) => {
                            console.log('unable to update due to error: ', err)
                            alert(err)
                            router.push({ path: `/addressList` })
                        })
                })
                .catch((err) => {
                    console.log(err)
                    return {}
                })
        },
        async del() {
            var k = this.address
            console.log(k)
            await mongoose
                .connect('mongodb://localhost/addressbook', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
                .then((res) => {
                    console.log(res)
                    address
                        .findByIdAndDelete(this.idno)
                        .then((o) => {
                            console.log(o._doc)
                            router.push({ path: `/addressList` })
                        })
                        .catch((err) => {
                            console.log('unable to update due to error: ', err)
                            alert(err)
                            router.push({ path: `/addressList` })
                        })
                })
                .catch((err) => {
                    console.log(err)
                    return {}
                })
        },
    },
}
</script>
