<script lang='ts' setup>
import { ref, computed } from "vue";
const props = defineProps<{
    user: IUser,
}>()
let tag = computed(() => {
    let user = props.user
    if (user?.user_tag && user?.user_tag != '') {

        let color = user.user_tag_colour
        if (!color) color = 'primary'
        else {
            let colorArr = user.user_tag_colour?.split(',')
            // console.log(colorArr);
            if (parseInt(colorArr![0]) < 10 && parseInt(colorArr![1]) < 10 && parseInt(colorArr![2]) < 10) {
                color = '#00E5FF'
            } else {
                color = `rgb(${colorArr![0]},${colorArr![1]},${colorArr![2]})`
            }
        }
        return {
            text: user.user_tag,
            color: color
        }
    }
    return null
})

</script>
<template>
    <v-chip class="tag" label v-if="tag" :color="tag.color">{{ tag.text }}</v-chip>
</template>
<script lang='ts'>
export default {
    name: 'UserTag',
}
</script>
<style lang='less' scoped>
.tag {
    margin: 0 0.5rem;
}
</style>