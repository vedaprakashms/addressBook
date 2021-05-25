<template>
    <div class="text-yellow-100 grid md:grid-cols-4 gap-2">
        <div class="flex justify-center col-span-4 text-3xl" @click="print">
            <h1 class="">Address Lists</h1>
        </div>
        <AddressCard
            :Address="value"
            v-for="value in returnval"
            :key="value._id"
        />
    </div>
</template>
<script>
import { ref } from 'vue'
import mongoose from 'mongoose'
import * as remote from '@electron/remote'
import path from 'path'
import fs from 'fs'
import address from '../model/addressModel'
import AddressCard from '@/components/AddressCard.vue'
export default {
    setup() {
        var returnval = ref([])
        const db = async () => {
            await mongoose
                .connect('mongodb://localhost/addressbook', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
                .then((res) => {
                    console.log(res)
                    address.find().then((o) => {
                        console.log(o)
                        returnval.value.push(...o)
                    })
                })
                .catch((err) => {
                    console.log(err)
                    return {}
                })
        }

        const print = () => {
            var d = new Date()
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
                        'temp ' +
                            d.toString().substring(0, 15) +
                            ' ' +
                            d.getHours() +
                            d.getMinutes() +
                            d.getSeconds() +
                            '.pdf'
                    )
                    fs.writeFile(pdfPath, data, (error) => {
                        if (error) throw error
                        console.log(`Wrote PDF successfully to ${pdfPath}`)
                    })
                })
        }

        return { returnval, db, print }
    },
    mounted() {
        this.db()
        console.log('page mounted')
    },
    components: {
        AddressCard,
    },
}
</script>
<style></style>
