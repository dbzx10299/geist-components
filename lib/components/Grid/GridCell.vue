<script setup lang="ts">
import styles from './grid.module.css'
</script>

<template>
  <div :class="styles.cell"><slot/></div>
</template>