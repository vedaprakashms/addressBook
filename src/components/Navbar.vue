<template>
    <div id="nav" class="tiptop flex justify-center text-center">
        <router-link :to="i.path" v-for="i in paths" :key="i" class="px-2">
            {{ i.name }}
        </router-link>
    </div>
</template>

<script>
export default {
    computed: {
        paths() {
            return this.$router.options.routes
        },
    },
}
</script>

<style lang="scss" scoped>
.tiptop {
    height: 4vh;
    border: 1px;
    border-style: dotted;
}
#nav {
    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
