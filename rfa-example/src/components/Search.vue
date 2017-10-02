<template>
  <div id="app">
    <v-layout row wrap>
      <v-flex xs12>
        <v-form ref="form" class="findProperty" v-on:submit="findProperty">

          <v-flex xs12 sm6 md3 as-item>
            <v-menu
              lazy
              :close-on-content-click="false"
              v-model="checkInMenu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-left="40"
              max-width="290px"
              xs12 sm3
            >
            <v-text-field
              slot="activator"
              label="Check-In"
              v-model="checkIn"
              prepend-icon="event"
              readonly
              ></v-text-field>
              <v-date-picker v-model="checkIn" no-title scrollable actions>
                <template scope="{ save, cancel }">
                  <v-card-actions>
                    <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                    <v-btn flat primary @click.native="save()">Save</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs12 sm6 md3 as-item>
            <v-menu
              lazy
              :close-on-content-click="false"
              v-model="checkOutMenu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-left="40"
              max-width="290px"
              xs12 sm3
            >
            <v-text-field
              slot="activator"
              label="Check-Out"
              v-model="checkOut"
              prepend-icon="event"
              readonly
              xs12 sm3
            ></v-text-field>
            <v-date-picker v-model="checkOut" no-title scrollable actions>
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat primary @click.native="save()">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-menu>
          </v-flex>

          <v-flex xs12 sm6 md3 as-item>
            <v-btn class="submit light-blue darken-1"@click="findProperty">Search Availability</v-btn>
          </v-flex>

          <v-flex xs12 sm6 md3 as-item>
            <v-btn @click="clear">clear</v-btn>
          </v-flex>
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
        checkIn: '',
        checkOut: '',
        checkInMenu: false,
        checkOutMenu: false,
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
        if (this.checkIn && this.checkOut) {
          start = moment(start).format('YYYY-MM-DD');
          end = moment(end).format('YYYY-MM-DD');
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
      }
    }
  }

</script>

<style>
  .as-item {
    padding: 10px;
    width: 100%;
  }
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
    width: 100%;
    display: flex;
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