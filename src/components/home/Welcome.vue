<script lang='ts' setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { computed } from "vue";
const router = useRouter()
const { t } = useI18n()

let list = computed(() => [
    { title: t('Games'), icon: 'mdi-gamepad-variant', to: '/Games' },
    { title: t('Manager'), icon: 'mdi-select-group', to: '/Manager' },
    { title: t('Tour'), icon: 'mdi-gamepad-circle', to: '/Explore' },
    { title: t('Settings'), icon: 'mdi-cog', to: '/Settings' },
])
function to(path: string) {
    router.push(path)
}

</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-card :title="t('Welcome to use {0}, where you can', [t('Gloss Mod Manager')])">
                <v-row>
                    <v-col cols="12" sm="3" v-for="item in list" :key="item.title">
                        <div class="list" @click="to(item.to)"> <v-icon :icon="item.icon"></v-icon> {{ item.title }}
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'Welcome',
}
</script>
<style lang='less' scoped>
.list {

    line-height: 2rem;
    padding: 2rem 2.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: rgba(0, 0, 0, 0.6);
    }

}
</style>
