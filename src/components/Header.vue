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
            <img
                src="../assets/book.svg"
                height="16"
                width="20"
                class="clickto"
                @click="homepage"
            />
        </div>
        <div class="flex justify-center align-middle col-span-10 tiptop">
            Address Book
        </div>
        <div
            class="
                col-start-12 col-span-1
                flex
                justify-end
                text-gray-50
                align-middle
            "
        >
            <button class="px-1 clickto" @click="minimize">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                    />
                </svg>
            </button>
            <button class="px-1 clickto" @click="maximize">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                </svg>
            </button>
            <button class="px-1 clickto" @click="close">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import * as remote from '@electron/remote'
export default {
    methods: {
        close: () => {
            let win = remote.getCurrentWindow()
            win.close()
        },
        minimize: () => {
            let win = remote.getCurrentWindow()
            win.minimize()
        },
        maximize: () => {
            let win = remote.getCurrentWindow()
            if (win.isMaximized()) {
                win.unmaximize()
            } else {
                win.maximize()
            }
        },
        homepage: () => {
            remote.shell.openExternal(
                'https://github.com/vedaprakashms/addressBook'
            )
        },
    },
}
</script>

<style lang="scss" scoped>
.tiptop {
    @media screen and (min-width: 768px) {
        height: 4vh;
    }

    -webkit-app-region: drag;
    text-align: center;
}
.clickto {
    -webkit-app-region: no-drag;
}
</style>
