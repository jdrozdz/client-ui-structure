<template>
  <div>
    <h1>Test PROXY</h1>
    <button type="button" @click="testApi()">Test API</button>
    <pre id="console"></pre>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    testApi: function () {
      axios.get('https://localhost:5301/api/v1/Account').then(res => {
        const b = document.querySelector('#console')
        b.innerHTML = res
      })
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
