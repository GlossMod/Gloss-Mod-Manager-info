<script lang='ts' setup>
import { computed } from "vue";

const content = useContent()
const main = useMain()

let slides = computed(() => {
    let slides: string[] = []
    if (content.modData?.mods_image_url) {
        slides.push(main.host + content.modData?.mods_image_url)
    } else {
        slides.push(main.host + content.modData?.game_imgUrl)
    }
    if (content.modData?.mods_images_url) {
        let urls = content.modData?.mods_images_url.split(',')
        urls.forEach(url => {
            slides.push(`${main.host}/static/upload/mod/${url}@webp`)
        });
    }
    return slides
})

</script>
<template>
    <!-- <v-carousel cycle height="290" hide-delimiter-background show-arrows="hover" interval="2000">
        <v-carousel-item v-for="(slide, i) in slides" :key="i" cover :src="slide"></v-carousel-item>
    </v-carousel> -->
    <el-carousel height="290px" indicator-position="none">
        <el-carousel-item v-for="(slide, i) in slides" :key="i">
            <el-image :src="slide" :preview-src-list="slides" :initial-index="i" preview-teleported></el-image>
        </el-carousel-item>
    </el-carousel>
</template>
<script lang='ts'>

export default {
    name: 'ExploreContentCarousel',
}
</script>
<style lang='less' scoped></style>