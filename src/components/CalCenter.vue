<template>
    <div>
        <tab>
          <tab-item selected @on-item-click="onItemClick">第一步</tab-item>
          <tab-item @on-item-click="onItemClick">第二步</tab-item>
        </tab>
    </div>
</template>


<script>
    export default {}
</script>

<style scoped>
</style>
