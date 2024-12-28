<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logolibros.jpg">
    <HelloWorld msg="Bienvenido a la aplicación de Catalogo de Libros"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
