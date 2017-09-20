<template>
  <div id="app">
    <ais-index :search-store="searchStore" index-name="Properties">
      <ais-search-box  class="form-search-property" placeholder="Find a property..." :search-store="searchStore">
      </ais-search-box>

      <v-layout row wrap>
      <!-- Sidebar with facets -->
        <v-flex xs12 md3>
          <!-- Amenities Facet -->
          <ais-refinement-list attribute-name="field_sp_amenities" :class-names="{
            'ais-refinement-list__item': 'checkbox'
            }">
            <div class="facet-label" slot="header"><strong>Amenities</strong></div>
          </ais-refinement-list>

          <!-- Area Facet -->
          <ais-refinement-list attribute-name="field_sp_area" :class-names="{
            'ais-refinement-list__item': 'checkbox'
            }">
            <div class="facet-label" slot="header"><strong>Area</strong></div>
          </ais-refinement-list>
        </v-flex>

        <!-- Content -->
        <v-flex xs12 md9>
          <ais-results inline-template>
            <table class="properties">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Area</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="result in results" :key="result.objectID">
                  <td><strong>{{ result.name }}</strong></td>
                  <td>{{ result.field_sp_short_description }}</td>
                  <td>
                    <span v-for="area in result.field_sp_area" :key="result.objectID">
                      {{ area }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </ais-results>
        </v-flex>
      </v-layout>
    </ais-index>
  </div>
</template>

<script>
  import { createFromAlgoliaCredentials } from 'vue-instantsearch';

  export default {
    name: 'search',
    data: function() {
      return {
        searchStore: createFromAlgoliaCredentials('2KLSFYS1HX', '557e70f6151f1073e2b4572d64bcc866'),
      };
    },
  }
</script>

<style>

  body {
    font-size: 16px;
  }
  table.properties {
    background: #fff;
    padding: 10px;
    border: 1px solid #dfdfdf;
  }
  table.properties th {
    text-align: left;
    padding: 10px 25px;
    text-transform: uppercase;
    border-bottom: 1px solid #dfdfdf;
  }
  table.properties td {
    padding: 10px 25px;
    vertical-align: middle;
  }
  .form-search-property {
    padding: 10px;
    margin-bottom: 20px;
  }
  .form-search-property input {
    border-bottom: 1px solid #dfdfdf;
    margin-right: 10px;
    padding: 0px;
  }
  .form-search-property button {
    margin-right: 10px;
  }
  .ais-refinement-list {
    margin-bottom: 25px;
  }
  .ais-refinement-list .facet-label {
    margin-bottom: 6px;
  }
  .ais-refinement-list .checkbox input {
    margin-right: 8px;
  }
</style>