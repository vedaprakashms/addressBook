<template>
    <div class="text-yellow-100 grid md:grid-cols-3 gap-2">
        <div class="flex justify-center col-span-3 text-3xl" @click="print">
            <h1 class="">Address Lists</h1>
        </div>

        <ul id="v-for-object" class="demo">
            <li v-for="value in db" :key="value._id">
                {{ value }}
            </li>
        </ul>
    </div>
</template>

<script>
//import AddressCard from '@/components/AddressCard.vue'
import * as remote from '@electron/remote'
import path from 'path'
import fs from 'fs'
import mongoose from 'mongoose'
import address from '../model/addressModel'

export default {
    data: () => {
        return {
            address: {
                data: '60ac9d09f011f022106a75c3',
                name: 'Vedaprakash',
                phone: '9449291799',
            },
            addr: [],
        }
    },
    components: {
        // AddressCard,
    },
    methods: {
        print() {
            remote
                .getCurrentWindow()
                .webContents.printToPDF({
                    marginsType: 0,
                    printBackground: false,
                    printSelectionOnly: false,
                    landscape: true,
                    pageSize: 'A4',
                    scaleFactor: 100,
                })
                .then((data) => {
                    const pdfPath = path.join(
                        remote.app.getPath('documents'),
                        'temp.pdf'
                    )
                    fs.writeFile(pdfPath, data, (error) => {
                        if (error) throw error
                        console.log(`Wrote PDF successfully to ${pdfPath}`)
                    })
                })
        },
        async db() {
            var returnval = []
            await mongoose
                .connect('mongodb://localhost/addressbook', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
                .then((res) => {
                    console.log(res)
                    address.find().then((o) => {
                        console.log(o)
                        returnval.push(...o)
                    })
                })
                .catch((err) => {
                    console.log(err)
                    return {}
                })
            console.log('this is the value or return val', returnval)
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.addr.push(...returnval)
            console.log(this.addr)
            return returnval
        },
    },
    async mounted() {
        console.log(this.$router.currentRoute.value.href)
        // var returnval = []
        // await mongoose
        //     .connect('mongodb://localhost/addressbook', {
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true,
        //     })
        //     .then(function () {
        //         address.find({}).then(function (k) {
        //             console.log(k)
        //             returnval.push(...k)
        //         })
        //     })
        // this.addr.push(...returnval)
        // console.log(this.addr)
        this.db()
    },
    // computed: {
    //     db() {
    //         var returnval = []
    //         // eslint-disable-next-line vue/no-async-in-computed-properties
    //         mongoose
    //             .connect('mongodb://localhost/addressbook', {
    //                 useNewUrlParser: true,
    //                 useUnifiedTopology: true,
    //             })
    //             .then((res) => {
    //                 console.log(res)
    //                 address.find().then((o) => {
    //                     console.log(o)
    //                     returnval.push(...o)
    //                 })
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //                 return {}
    //             })
    //         console.log('this is the value or return val', returnval)
    //         // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //         this.addr.push(...returnval)
    //         console.log(this.addr)
    //         return returnval
    //     },
    // },
}
</script>

<style></style>
