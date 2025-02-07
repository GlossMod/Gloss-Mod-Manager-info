<script lang='ts' setup>

</script>
<template>
    <div class="search">
        <div class="search-title">{{ $t('Search') }}</div>
        <div class="search-wrap">
            <!-- 插槽 -->
            <slot></slot>
        </div>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'ExploreSearch',
}
</script>
<style lang='less' scoped>
.search {
    // height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .search-title,
    .search-wrap {
        z-index: 3;
    }

    .search-title {
        padding: 1.5rem;
        font-size: 1.2rem;
        font-weight: bold;
        text-shadow: 0 0 1px #000;
    }

    .search-wrap {
        width: 600px;
        max-width: 90%;
        position: relative;
        // background: rgba(255, 255, 255, 0.3);

        .search-btn {
            border: none;
            position: absolute;
            top: 0;
            right: 0;
        }
    }
}
</style>