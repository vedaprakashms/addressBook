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
                Name Details
            </div>
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="First Name"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Last Name"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder=" Surname"
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
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Mobile 2"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Phone"
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
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="House Name"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Street / Lane"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Road"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Area"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Landmark"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="City"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="State"
                value="Karnataka"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="country"
                value="India"
            />
            <input
                type="text"
                class="inputClass sm: col-span-3 md:col-span-1"
                placeholder="Pincode"
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
                    "
                    @click="entry"
                >
                    Add Address
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Home',
    components: {},
    methods: {
        entry: () => {
            console.log('Button for data enty clicked')
            alert('Button for data enty clicked')
        },
    },
}
</script>
