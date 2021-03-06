module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            nodeGypRebuild: true,
            externals: [
                'mongoose',
                'mongodb',
                'vue3-qrcode-reader',
                'vue-toastification',
            ],
            homepage: 'https://github.com/vedaprakashms',
            builderOptions: {
                // options placed here will be merged with default configuration and passed to electron-builder
                appId: 'io.addressbook.desktop',
                productName: 'Address Book App',
                linux: {
                    target: ['deb', 'AppImage', '7z'],
                    category: 'Utility',
                    icon: './build/icons',
                },
                win: {
                    target: [
                        {
                            target: 'nsis',
                            arch: ['x64'],
                        },
                        {
                            target: 'portable',
                            arch: ['x64'],
                        },
                        '7z',
                    ],
                    icon: './build/icons',
                },
                portable: {
                    artifactName: '${productName}-${version}-portable.exe',
                    splashImage: './public/splash.bmp',
                },
                nsis: {
                    oneClick: false,
                    perMachine: true,
                    allowElevation: true,
                    allowToChangeInstallationDirectory: true,
                    createDesktopShortcut: true,
                    createStartMenuShortcut: true,
                    deleteAppDataOnUninstall: true,
                },
            },
        },
    },
}
