<template>
  <div id="properties">
    
    <v-layout>
      <v-flex style="padding:10px" xs12 sm6 md4 v-for="property in properties" :key="property.property_id">
        <v-card class="property grey lighten-3">
          <img :src = "property.field_sp_featured_image.src" />
          <div class="name"> {{property.name}} </div>
          <div class="description">{{property.field_sp_short_description}} </div>
        </v-card>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
  import Search from './Search';
  export default {
    props: [
      'properties',
    ],
  }

</script>
 