<template>
  <div id="app">
    <gmap-map
      :center="center"
      :zoom="7"
      map-type-id="roadmap"
      style="width: 600px; height: 600px"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
      ></gmap-marker>
    </gmap-map>

  </div>
</template>

<script>
  import Search from './Search';
  export default {
    components: {
      name: 'GeoMap',
    },
    data: function() {
      return {
        msg: 'pippo',
      }
    },
    props: [
      'markers',
      'center',
    ]
  }
</script>
