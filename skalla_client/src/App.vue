<template>
  <div id="app">
    <notifications></notifications>
    <router-view/>
  </div>
</template>
<style>
 /* Scrollbar styles */
* {
  scrollbar-width: thin;
  scrollbar-color: #525f7f69;;
}

/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 10px;
  height:10px
}
*::-webkit-scrollbar-track {
  /* background: white; */
}
*::-webkit-scrollbar-thumb {
    background-color: #525f7f69;
    border-radius: 20px;
}
</style>

