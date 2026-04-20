<template>
  <video ref="videoRef" autoplay playsinline></video>
  <canvas ref="canvasRef" style="display:none"></canvas>

  <div class="boton-escanear-container">
    <button class="btn-escanear" @click="escanearTicket">Escanear ticket</button>
  </div>
  <img ref="imgRef" :src="imagenCapturada" alt="Imagen capturada" v-if="imagenCapturada" />
</template>


<script setup>
import { ref } from 'vue';

const videoRef = ref(null);
const canvasRef = ref(null)
const imagenCapturada = ref(null)



async function escanearTicket() {
  //alert('Escaneando ticket...');
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  videoRef.value.srcObject = stream

  // Espera a que el vídeo esté listo antes de capturar
  videoRef.value.onloadedmetadata = () => {
    capturarFotograma()
    //const imagen = capturarFotograma()
    //console.log(imagen) // Verás una URL base64 en la consola
  }
}

function capturarFotograma() {
  const video = videoRef.value
  const canvas = canvasRef.value

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  canvas.getContext('2d').drawImage(video, 0, 0)

  // return canvas.toDataURL('image/png')
  imagenCapturada.value = canvas.toDataURL('image/png')

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


