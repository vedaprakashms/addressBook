<template>
    <div class="text-yellow-100 block">
        <div class="grid md:grid-cols-5 gap-2 text-3xl">
            <h1 class="col-span-5 flex justify-center">Address Lists</h1>
            <input
                type="text"
                class="inputClass m-1 sm: col-span-5 md:col-span-4 px-2 my-3"
                placeholder="Searchbox"
                v-model="search"
            />
            <button
                type="button"
                class="
                    px-3
                    py-3
                    my-3
                    sm:
                    col-span-5
                    md:col-span-1 md:col-start-5
                    rounded
                    w-full
                    bg-gradient-to-r
                    from-red-500
                    via-green-600
                    to-yellow-400
                    text-gray-100 text-xl
                    font-bold
                "
                @click="printpage(abc)"
            >
                Label Print
            </button>
        </div>

        <div v-if="!returnval.length" class="flex justify-center text-3xl">
            No Data found, please enter address in the Address entry form
        </div>

        <div id="abc">
            <div class="block p-1">
                <div
                    class="inline-block p-1"
                    style="width: 33%"
                    v-for="value in filteredBlogs"
                    :key="value._id"
                    @click="clickval(value._id)"
                >
                    <AddressCard :Address="value"></AddressCard>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import mongoose from 'mongoose'
import address from '../model/addressModel'
import router from '@/router'
import AddressCard from '@/components/AddressCardqr.vue'
import * as remote from '@electron/remote'
import fs from 'fs'
//import printJS from 'print-js'
export default {
    setup() {
        var returnval = ref([])
        var search = ref()
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
                        '.pdf',
                })
                .then((pdfPath) => {
                    if (!pdfPath.canceled) {
                        remote
                            .getCurrentWindow()
                            .webContents.printToPDF({
                                marginsType: 1,
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

        const clickval = function (id) {
            //alert('Clicked Card with ID ' + id)
            //var k = id.toHexString()
            router.push({ path: `/addressmodify/${id}` })
        }

        return { returnval, db, printpage, clickval, search }
    },
    mounted() {
        console.log('page mounted')
    },
    beforeMount() {
        this.db()
    },
    components: {
        AddressCard,
    },
    computed: {
        filteredBlogs: function () {
            console.log(this.returnval)
            console.log(this.search)
            return (
                this.returnval.filter((blog) => {
                    return blog.fname.match(this.search)
                }) ||
                this.returnval.filter((blog) => {
                    return blog.lname.match(this.search)
                }) ||
                this.returnval.filter((blog) => {
                    return blog.surname.match(this.search)
                })
            )
        },
    },
}
</script>

<style scope>
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
    div div {
        page-break-inside: avoid;
    }
}
</style>
