<script lang='ts' setup>



const props = defineProps<{
    modList: IModInfo[],
    subheader: string
}>()

const packs = usePacks()

function select(all: boolean) {
    // console.log(packs.packs);
    if (all) {
        packs.packs = props.modList
    } else {
        // 反选
        packs.packs = props.modList.filter(item => !packs.packs.includes(item))
    }
}

</script>
<template>
    <v-item-group multiple v-model="packs.packs">
        <v-list-subheader>
            <div class="subheader">
                <div class="text">{{ `${subheader} (${packs.packs.length})` }}</div>
                <div class="btn">
                    <v-chip label append-icon="mdi-check" @click="select(true)" variant="text">
                        {{ $t('Select All') }}</v-chip>
                    <v-chip label append-icon="mdi-close" @click="select(false)" variant="text">
                        {{ $t('Invert Select') }}</v-chip>
                </div>
            </div>
        </v-list-subheader>
        <div class="list-wrap">
            <v-item v-for="item in modList" v-slot="{ isSelected, toggle }" :value="item">
                <v-list-item @click="toggle">
                    <template #title>
                        <v-chip v-for="item2 in item.tags" label :key="item2.name" :color="item2.color">
                            {{ item2.name }}</v-chip>
                        {{ item.modName }}
                    </template>
                    <template v-slot:prepend>
                        <v-list-item-action start>
                            <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>
                        </v-list-item-action>
                    </template>
                </v-list-item>
            </v-item>
        </div>
    </v-item-group>
</template>
<script lang='ts'>

export default {
    name: 'PackList',
}
</script>
<style lang='less' scoped>
.list-wrap {
    max-height: 400px;
    overflow-y: auto;
}

.subheader {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
</style>