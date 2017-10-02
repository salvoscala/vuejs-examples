<template>
  <div id="app">
    <v-layout row wrap>
      <v-flex xs12>
        <v-form ref="form" class="findProperty" v-on:submit="findProperty">
          <div class="datePicker checkIn">
            <div class="label">Check In</div>
            <v-date-picker label="Check In" v-model="checkIn"></v-date-picker>
          </div>

          <div class="datePicker checkOut">
            <div class="label">Check Out</div>
            <v-date-picker v-model="checkOut"></v-date-picker>
          </div>
          <v-btn class="submit light-blue darken-1"@click="findProperty">Search Availability</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-flex>
      <v-flex style="padding:6px" d-flex xs12 sm6 md4 v-for="property in properties">
        <v-card class="property grey lighten-3">
          <v-card-text>
            <div class="name"> {{property.name}} </div>
            <div class="description">{{property.field_sp_short_description}} </div>
            <img :src = "property.field_sp_featured_image.src" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import moment from 'moment';
  var apiURL = 'https://vuejs-o2rgq6a-y6sjsg6j57eww.eu.platform.sh/available-properties';

  export default {
    name: 'search',
    data: function() {
      return {
        properties: [],
        propertyId: '',
        checkIn: new Date(),
        checkOut: new Date(),
        menu: false,
      };
    },
    created: function () {
      this.$http.get(apiURL).then(function(response){
        this.properties = response.data;
      })
    },
    methods: {
      findProperty: function(e) {
        var start = new Date(this.checkIn);
        var end = new Date(this.checkOut);
        //Filter.
        if (start && end) {
          start = moment(start).format('YYYY-MM-DD');
          end = moment(end).format('YYYY-MM-DD');
          //bat_start_date=2017-10-11&bat_end_date=2017-10-14
          this.$http.get(apiURL + '?bat_start_date=' + start + '&bat_end_date=' + end).then(function(response){
            this.properties = response.data;
          });
        }
        // Get all properties.
        else {
          this.$http.get(apiURL).then(function(response){
            this.properties = response.data;
          })
        }
      },
      clear () {
        this.$refs.form.reset()
        this.findProperty()
      },
      moment: function () {
        return moment();
      }
    }
  }

</script>

<style>
  .datePicker {
    display: inline-block;
    float: left;
    margin-right: 40px; 
    margin-bottom: 40px;
  }
  .datePicker label {
    font-size: 20px;
  }
  .date {
    margin-bottom: 40px;
  }
  .findProperty {
    margin-bottom: 40px;
    background: #ececec;
    padding: 10px;
    display: inline-block;
    width: 100%;
  }
  .findProperty .submit {
    color: white;
  }
  .property .name {
    font-size: 26px;
    font-weight: 500;
  }
  .property {
    min-height: 250px;
    padding: 15px;
  }
  .property .description {
    font-weight: 300;
    margin-bottom: 10px;
    font-style: italic;
  }
  .property img {
    width: 100%;
  }
  body {
    font-size: 16px;
  }

</style>