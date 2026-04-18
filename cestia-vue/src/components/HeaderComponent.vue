<template>
  <header>
    <h1>Hola {{ usuario }}, <span>{{ emoji_usuario }}</span> </h1>
    <img class="cesta" src="../../public/assets/cesta.png" alt="Imagen de una cesta de compra">

  </header>
</template>


<script setup>
import { ref } from 'vue';


const usuario = ref('UserName');
const emoji_usuario = ref('👤');

</script>

<style scoped>

header {
  margin: 1vh 1.5vw 1vh 1.5vw;
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 10px;
}

h1 {
  margin: 0;
}

span {
  background-color: #37fab3;
  border-radius: 5px;
}

.cesta{
  width: clamp(40px, 10vw, 80px);
  height: clamp(40px, 10vw, 80px);
  margin-left: auto;
  margin-top: 1vh;
}
</style>
