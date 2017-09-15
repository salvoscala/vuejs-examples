<template>
  <div class="users">
    <h1>Users Component</h1>
    <form v-on:submit="addUser">
      <input type="text" v-model="newUser.name" placeholder="name"></input>
      <input type="text" v-model="newUser.email" placeholder="email"></input>
      <input type="submit" value="Submit">
    </form>
    <ul>
      <li v-for="user in users">
        {{user.name}}: {{user.email}}
        <span>
          <button v-on:click="deleteUser(user)">x</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'users',
    props: {

    },
    data() {
      return {
        newUser: {},
        users: [
        ]
      }
    },
    methods: {
      addUser: function(e) {
        this.users.push({
          name: this.newUser.name,
          email: this.newUser.email,
        })
        e.preventDefault();
      },
      deleteUser: function(user) {
        this.users.splice(this.users.indexOf((user), 1));
      }
    },
    created: function() {
      this.$http.get('https://jsonplaceholder.typicode.com/users').then(function(response){
        this.users = response.data;

      })
    },
    computed: {

    }
  }
</script>

<style scoped>

</style>