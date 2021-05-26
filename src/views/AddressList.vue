<template>
    <div class="text-yellow-100">
        <div class="flex justify-center text-3xl">
            <h1 class="">Address Lists</h1>
        </div>
        <button
            type="button"
            class="flex justify-center text-3xl"
            @click="printpage(abc)"
        >
            Print Form
        </button>
        <div v-if="!returnval.length" class="flex justify-center text-3xl">
            No Data found, please enter address in the Address entry form
        </div>
        <div class="grid md:grid-cols-3 gap-2" id="abc">
            <AddressCard
                id="pds"
                class="col-span-1"
                :Address="value"
                v-for="value in returnval"
                :key="value._id"
            />
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import mongoose from 'mongoose'
import address from '../model/addressModel'
import AddressCard from '@/components/AddressCard.vue'
import * as remote from '@electron/remote'
import fs from 'fs'
//import printJS from 'print-js'
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

        const printpage = () => {
            var d = new Date()
            remote.dialog
                .showSaveDialog({
                    title: 'Save PDF',
                    defaultPath:
                        'Addersslist' +
                        '_' +
                        d.toDateString() +
                        '-' +
                        d.getHours() +
                        '-' +
                        d.getMinutes() +
                        '-' +
                        d.getSeconds() +
                        '-' +
                        '.pdf',
                })
                .then((pdfPath) => {
                    if (!pdfPath.canceled) {
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
                                fs.writeFile(
                                    pdfPath.filePath,
                                    data,
                                    (error) => {
                                        if (error) throw error
                                        console.log(
                                            `Wrote PDF successfully to ${pdfPath.filePath}`
                                        )
                                        // alert(
                                        //     `Wrote PDF successfully to ${pdfPath.filePath}`
                                        // )
                                        remote.shell.openPath(pdfPath.filePath)
                                    }
                                )
                            })
                    } else {
                        alert('No File Name Given / File location selected!!!')
                    }
                })
        }

        return { returnval, db, printpage }
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
<style>
@media print {
    body * {
        visibility: hidden;
    }
    #abc,
    #abc * {
        visibility: visible;
    }
    #abc {
        position: absolute;
        left: 0;
        top: 0;
    }
    #pds {
        page-break-inside: avoid;
    }
}
</style>
