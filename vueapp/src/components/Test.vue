<template>
  <div class="test">
    <input type="text" v-model="title"><br />
    <h1>{{ title }}</h1>
    <label>First Name</label><input type="text" v-model="user.firstName">First Name</input>
    <p v-if="showName">{{ user.firstName }}</p>
    <p>{{ user.lastName }}</p>

    <li v-for="info in infos">{{ info.type }} => {{info.value}}</li>
    <button v-on:click="greet">Say Hi!</button>
    <hr>
    <h2>{{ fullname }}</h2>
    <hr>
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
  export default {
    name: 'test',
    props: {
      msg: {
        type: String,
        default: 'this is a message',
      }
    },
    data() {
      return {
        title: 'Hello World',
        user: {
          firstName: 'John',
          lastName: 'Smith'
        },
        infos: [
          {type: 'Height', value: '177'},
          {type: 'Weight', value: '77'},
          {type: 'Hairs', value: 'blonde'},
          {type: 'Eyes', value: 'Brown'},
        ],
        showName: true,
      }
    },
    methods: {
      greet: function() {
        alert('Hi man!');
      }
    },
    computed: {
      fullname: function(){
        return this.user.firstName + ' ' + this.user.lastName;
      }
    }
  }
</script>

<style scoped>

</style>