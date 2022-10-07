<template>
  <h3>Testing UI backend</h3>
  <button type="button" @click="getAccountInformation()">Get Account</button>
</template>

<script>


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    getAccountInformation: function() {
      alert('Hello July');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
