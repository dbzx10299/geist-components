<script setup lang="ts">

// https://nodejs.org/api/packages.html#packages_self_referencing_a_package_using_its_name
import { Text, Grid } from 'geistjs/components'

// import { Text, Grid } from '../lib/components/main.ts'
</script>

<template>
  <div>
    <Grid>
      <Grid.Cell>1</Grid.Cell>
      <Grid.Cell>2</Grid.Cell>
      <Grid.Cell>3</Grid.Cell>
    </Grid>

    <Text
      as="h1"
      color="#a1a1a1"
      :variant="{ sm: 'heading-16', md: 'heading-48' }"
    >
      This is text from a text component
    </Text>
  </div>
</template>
