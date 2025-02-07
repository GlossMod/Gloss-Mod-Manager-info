<script lang='ts' setup>

const prop = defineProps<{
    items: any[]
}>()

</script>
<template>
    <v-col cols="12">
        <ul class="breadcrumbs">
            <v-icon icon="mdi-home"></v-icon>
            <li v-for=" (item, index) in items" :key="index">
                <RouterLink :to="item.href" class="link" :class="{ 'disabled': item.disabled }">
                    {{ $t(item.text as string) }}
                </RouterLink>
            </li>
        </ul>
    </v-col>
</template>
<script lang='ts'>

export default {
    name: 'Breadcrumbs',
}
</script>
<style lang='less' scoped>
.breadcrumbs {
    padding: 8px 12px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 0.8rem;

    .link {
        color: unset;
        text-decoration: none;
        transition: all .5s;

        &:hover {
            opacity: .7;
        }
    }

    li {
        list-style: none;
        display: flex;
        align-items: center;
        margin-left: 8px;

        &::after {
            content: '/';
            display: inline-block;
            padding: 0 8px;
            vertical-align: middle;
        }

        &:last-child::after {
            content: ''
        }

        .disabled {
            opacity: .7;
            cursor: context-menu;
        }

    }
}
</style>