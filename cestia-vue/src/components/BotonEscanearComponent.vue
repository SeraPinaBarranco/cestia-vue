<template>
  <video ref="videoRef" autoplay playsinline></video>
  <div class="boton-escanear-container">
    <button class="btn-escanear" @click="escanearTicket">Escanear ticket</button>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const videoRef = ref(null);


async function escanearTicket() {
  alert('Escaneando ticket...');
  // const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  // videoRef.value.srcObject = stream
}

</script>




<style scoped>
.boton-escanear-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.btn-escanear {
  width: 70%;
  background-color: hsl(116, 21%, 53%);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 26px;
  border-radius: 5px;
  font-weight: bold;

}

.input-imagen-ticket {
  display: none;
}

.btn-escanear:hover {
  background-color: hsl(116, 21%, 43%);
  cursor: pointer;
  color: antiquewhite;
}
</style>


