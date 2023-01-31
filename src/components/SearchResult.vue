<script>
export default {
  name: "SearchResult",
  props:{
    result:{
      type:Object,
      required: true,
    }
  },
  computed:{
    downloadUrl(){
      const path = '/photo_proxy'+this.result.urls.raw.replace("https://images.unsplash.com", '');
      return (new URL(path, window.location).href)
    }
  }
}
</script>
<template>
<figure>
  <a :href="downloadUrl" :download="result.id" class="download"><span>Download</span></a>
  <img :src="result.urls.small" :alt="result.alt_description">
  <figcaption>
    <p v-if="result.description !== ''">{{result.description}}</p>
    <p>
      Image by <a class="profile" :href="result.user.links.self" target="_blank">{{result.user.name}}</a>
    </p>
  </figcaption>
</figure>
</template>


<style scoped>
figure{
  margin:0;
  width: 100%;
  display:grid;
  grid-template-areas: "image" "description";
}
 figcaption{
   grid-area: description;
   --ink:aqua;
   background-color: rebeccapurple;
   color:var(--ink);
   min-height: 100%;
 }
 img{
   grid-area:image;
   width:100%;
   aspect-ratio: 16/9;
   object-fit: contain;
 }
 p{
   margin:0;
 }
.profile:is(:link,:active,:visited,:hover,:focus){
   color:var(--ink);
 }

.download:is(:link,:active,:visited,:hover,:focus){
  grid-area: image;
  z-index:2;
  background-color: rgba(0, 253, 253, 0.25);
  display:grid;
  place-content: center;
}

.download>span{
  background-color: rebeccapurple;
  color: aqua;
}

.download{
  opacity:0;
  transition: opacity 0.3s ease-in-out ;
}
.download:is(:hover,:focus-visible){
  opacity:1;
}
</style>
