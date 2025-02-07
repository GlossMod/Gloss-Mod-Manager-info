<script lang='ts' setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import Markdown from '@/components/Model/Markdown.vue'
import axios from "axios";
let readme = ref('')
const { locale } = useI18n()

let readmeFile = computed(() => {
    // console.log(locale.value);
    // let host = `https://raw.githubusercontent.com/GlossMod/Gloss-Mod-Manager-info/main/`
    let file = `README_${locale.value}.md`
    if (locale.value == "en_US") file = 'README.md'
    return `https://p.aoe.top/githubusercontent/GlossMod/Gloss-Mod-Manager-info/main/${file}`
})

async function getReadme() {
    try {
        let { data } = await axios.get(readmeFile.value)
        readme.value = data
    } catch (error) {
        let { data } = await axios.get(`https://p.aoe.top/githubusercontent/GlossMod/Gloss-Mod-Manager-info/main/README.md`)
        readme.value = data
    }

}

watch(() => readmeFile.value, () => {
    getReadme()
})
getReadme()


</script>
<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="about">
                <Markdown :text="readme"></Markdown>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'About',
}
</script>
<style lang='less' scoped>
.about {
    padding: 1rem;
    overflow: auto;
    max-height: calc(100vh - 100px);

}
</style>