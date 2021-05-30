# AddressBook 📔

This is a product which acts as a digital address book, it has features like :

-   Saving Address to Mongodb (community version to be installed in the local system using this product)
-   Making a list of address saved so far.
-   Generating lable view for quick lable print (PDF generation only).
-   Clicking on individual lable in lable view gives update or delete options.
-   Each Lable is encoded with Unique QR code which can be read back by the system for quick check.
-   The readback QRcode corseponding address can be put in a excel for easy export.

# If any one want to replicate the project here are the prerequisets:

1. Install MongoDB local version (tested with Only Community version.).
2. Download or clone the GitHub Repo.
3. Follow the steps in Project Steps and down.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Electron Compiles and hot-reloads for development

```
yarn electron:serve
```

### Electron Compiles and Minifies for Production

```
yarn electron:build
```

change electron builder option in [vue.config.js](vue.config.js)

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Icon Attribution

<div>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

<div>Icons made by <a href="https://smashicons.com/" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

# Other Components usage with License Disclaimer.

## This page utilizes various 3rd party packages, and 3rd party packages dependency, those have been noted in a separate file with their licenses in separate file. Please have a look at this page for the same ["License Disclaimer"](license-Disclaimer.md).

## The Direct dependency and Dev dependency too can be found in the "License Disclaimer", but for faster access, direclty reffer to [package.json](package.json) file for the same.
