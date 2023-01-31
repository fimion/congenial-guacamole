<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import SearchResult from "./components/SearchResult.vue"
import useFetchGet from "./composables/useFetchGet.js"
import {PuppySearch} from './dev-data/puppySearch.js';
export default {
  components:{HelloWorld, SearchResult},
  setup(){
    const search = useFetchGet('/.netlify/functions/unsplash');
    search.response = PuppySearch;
    search.status = "RESOLVED";

    const handleSubmit = ($e)=>{
      const formData = new FormData($e.target);
      search.fetch(formData)

    }
    return {
      search,
      handleSubmit,
    }
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" id="search" class="search">
    <label for="query">Search: </label>
    <input type="text" name="query" id="query" />
    <button>Go!</button>
  </form>
  <output form="search">
    <ul v-if="search.isResolved" class="search-results">
      <li class="result-item"
          v-for="result in search.response.response.results"
          :key="result.id"
          :style="{'--bg-color':result.color}">
        <search-result :result="result" />
      </li>
    </ul>
  </output>
  <details>
    <summary>Debug info</summary>
    <pre v-if="search.isResolved">
    {{search.response}}
  </pre>
  </details>


</template>

<style>
*{
  box-sizing: border-box;
}

:root{
  --ink:burlywood;
}

#app {

  font-family: "Comic Sans MS", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--ink);
  margin-top: 20px;
  background-color: darkblue;
  padding-block: 20px;
  border-radius: 20px;
  border: 12px ridge deeppink;
}

.search{
 display:flex;
  justify-content: center;
}

.search-results{
  display:grid;
  --cols: 1;
  grid-template-columns: repeat(var(--cols), 1fr);
  list-style: none;
  place-content: center;
  gap: 20px;
  padding-inline:20px;
}

@media screen and (min-width: 820px) {
  .search-results{
    --cols: 2;
  }
}
@media screen and (min-width: 1240px) {
  .search-results{
    --cols: 3;
  }
}

.result-item{
 background-color: var(--bg-color, #42b983);
  border-radius: 20px;
  border: 12px ridge #7effd4;
  max-width: fit-content;
}


</style>
