<template>
    <div
        class="
            tiptop
            bg-gradient-to-r
            from-gray-900
            via-gray-800
            to-gray-900
            grid grid-cols-12
            text-yellow-200 text-lg
        "
    >
        <div
            class="
                col-start-1 col-span-1
                flex
                justify-start
                text-gray-50
                align-middle
                pl-2
            "
        >
            <fa
                :icon="['fab', 'osi']"
                class="mx-1 mt-1"
                size="lg"
                @click="license"
            />
        </div>
        <div class="flex justify-center align-middle col-span-10 tiptop">
            Copyright @ 2021, All right Reserved
        </div>
        <div class="col-start-12 col-span-1 flex justify-end text-gray-50">
            <fa
                :icon="['fab', 'facebook-square']"
                class="mx-1 mt-1"
                size="lg"
                @click="facebook"
            />
            <fa
                :icon="['fab', 'github-square']"
                class="mx-1 mt-1"
                size="lg"
                @click="github"
            />
            <fa
                :icon="['fab', 'twitter-square']"
                class="mx-1 mt-1"
                size="lg"
                @click="twitter"
            />
        </div>
    </div>
</template>

<script>
import * as remote from '@electron/remote'
export default {
    methods: {
        facebook: () => {
            remote.shell.openExternal('https://www.facebook.com/vedms')
        },
        github: () => {
            remote.shell.openExternal('http://github.com/vedaprakashms')
        },
        twitter: () => {
            remote.shell.openExternal('https://twitter.com/vedms')
        },
        license: () => {
            remote.shell.openExternal(
                'https://github.com/vedaprakashms/addressBook/blob/master/LICENSE'
            )
        },
    },
}
</script>

<style lang="scss" scoped>
.tiptop {
    height: 4vh;
}
</style>
