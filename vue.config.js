module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
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
                    target: ['nsis', 'portable', '7z'],
                    icon: './build/icons',
                },
                portable: {
                    artifactName: '${productName}-${version}-portable.exe',
                },
            },
        },
    },
}
