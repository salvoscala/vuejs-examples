<template>
  <div id="app">
    <ais-search-box  class="form-search-property" placeholder="Find a property..." :search-store="searchStore"></ais-search-box>
    <ais-index :search-store="searchStore" index-name="Properties">

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
  table.properties th {
    text-align: left;
    padding: 10px 25px;
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

</style>