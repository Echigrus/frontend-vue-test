<template>
    <a class="base-link" :href="link.url">{{ link.text }}</a>
  </template>
  
  <script>
  export default {
    name: "Link",
    props: ["link"]
  };
  </script>