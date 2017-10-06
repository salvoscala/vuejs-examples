<template>
  <div id="properties">
    
    <v-layout row wrap>
      <v-flex flex xs12 sm6 style="padding:10px" v-for="property in properties" :key="property.property_id">
        <v-card class="property grey lighten-3">
          <a v-bind:href="property.url" target="_blank">
            <img :src = "property.field_sp_featured_image.src" />
          </a>
          <div class="details">
            <div class="item name"> {{property.name}} </div>
            <div class="item area"> {{property.field_sp_area}} </div>
            <div class="item description">{{property.field_sp_short_description}} </div>
          </div>
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
 