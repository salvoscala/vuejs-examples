<template>
  <div id="availability-search">
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
              required
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
              required
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
            <v-btn class="submit light-blue darken-1" @click="findProperty">Search Availability</v-btn>
          </v-flex>

          <v-flex xs12 sm6 md3 as-item>
            <v-btn @click="clear">clear</v-btn>
          </v-flex>
        </v-form>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex flex xs12 md4>
        <div class="facets" v-for="facetType in facets">
          <div class="facetType">
            <h4>{{facetType.label}}</h4>
            <div class="facets" v-for="facetLink in facetType.links">
              <v-btn small primary color="primary" @click="clickedFacet(facetLink.link)"> {{ facetLink.title }} </v-btn>
            </div>
          </div>
        </div>
      </v-flex>

      <v-flex flex xs12 md8>
        <!-- Print a list of properties -->
        <properties :properties="properties"></properties>
      </v-flex>

    </v-layout>


  </div>
</template>

<script>
  import moment from 'moment';
  import GeoMap from './GeoMap';
  import Properties from './Properties';

  var siteUrl = 'https://vuejs-o2rgq6a-y6sjsg6j57eww.eu.platform.sh';
  var apiURL = 'https://vuejs-o2rgq6a-y6sjsg6j57eww.eu.platform.sh/available-properties';

  export default {
    name: 'search',
    components: {
      GeoMap,
      Properties
    },
    data: function() {
      return {
        properties: [],
        propertyId: '',
        checkIn: '',
        checkOut: '',
        checkInMenu: false,
        checkOutMenu: false,
        center: {},
        markers: [],
        facets: {},
      };
    },
    // Initialize Data.
    created: function () {

      this.$http.get(apiURL).then(function(response) {
        this.properties = response.data.results;
        this.updatesMarkers();
        this.createFacets(response.data.facets);
      })
    },
    methods: {
      findProperty: function(e) {
        var start = new Date(this.checkIn);
        var end = new Date(this.checkOut);
        // Filter.
        if (this.checkIn && this.checkOut) {
          start = moment(start).format('YYYY-MM-DD');
          end = moment(end).format('YYYY-MM-DD');
          this.$http.get(apiURL + '?bat_start_date=' + start + '&bat_end_date=' + end).then(function(response) {
            this.properties = response.data.results;
            this.updatesMarkers();
            this.createFacets(response.data.facets);
          });
        }
        // Get all properties.
        else {
          this.$http.get(apiURL).then(function(response){
            this.properties = response.data.results;
            this.updatesMarkers();
          })
        }
      },
      clear () {
        this.$refs.form.reset()
        this.findProperty()
      },
      updatesMarkers () {
        this.markers = [];
        this.center = {};
        for (var key in this.properties) {
          var coordinates = this.properties[key].field_sp_location.split(",");
          coordinates = {'position' : {'lat': parseFloat(coordinates[0]),'lng': parseFloat(coordinates[1])}};
          this.markers.push(coordinates);
        }
        this.center = {'lat': this.markers[0].position.lat, 'lng': this.markers[0].position.lng}
      },

      createFacets (responseFacets) {
        for (var type in responseFacets) {
          this.facets[type] = {};
          this.facets[type]['links'] = {};
          if (type === 'field_sp_area') {
            this.facets[type]['label'] = 'Area';
          }
          else if (type === 'property_bat_type_reference:field_st_amenities') {
            this.facets[type]['label'] = 'Amenities';
          }
          else {
            this.facets[type]['label'] = type;
          }
          for (var key in responseFacets[type]) {
            var facetUrl = responseFacets[type][key].split('<a href="').pop();
            facetUrl = '<a href="' + siteUrl + facetUrl;

            // Create a dummy element.
            var el = document.createElement('div');
            el.innerHTML = facetUrl;
            // Remove unwanted span tags.
            $(el).find('span').remove();
            // Change text if the facet is active.
            if ($(el).find('a.facetapi-active').length !== 0) {
              $(el).find('a').text($(el).text());
            }

            this.facets[type]['links'][key] = {'link': $(el).find('a').attr('href'), 'title': $(el).find('a').text()};
          }
        }
        console.log(this.facets);
      },
      clickedFacet(link) {
        this.$http.get(link).then(function(response) {
          this.properties = response.data.results;
          this.createFacets(response.data.facets);
        });
      },
    }
  }

</script>

<style>
  #properties {
    margin: 40px 0;
  }
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
  .property .details {
    padding: 25px;
  }
  .property .item {
    margin-bottom: 6px;
  }
  .property .name {
    font-size: 20px;
    font-weight: 500;
    text-transform: uppercase;
    color: #1976d2;
  }
  .property .area {
    font-size: 12px;
    color: #6c6c6c;
  }
  .property {
    min-height: 360px;
    padding: 0px;
  }
  .property .description {
    font-weight: 300;
    font-style: italic;
  }
  .property img {
    width: 100%;
  }
  body {
    font-size: 16px;
  }
  .facetType {
    display: inline-block;
    width: 100%;
    margin-bottom: 30px;
    padding: 25px;
  }
  .facets button {
    display: inline-block;
    float: left;
  }

</style>