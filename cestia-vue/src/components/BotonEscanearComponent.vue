<template>
  <video ref="videoRef" autoplay playsinline></video>
  <canvas ref="canvasRef" style="display:none"></canvas>

  <div class="boton-escanear-container">
    <button class="btn-escanear" @click="escanearTicket">Escanear ticket</button>
  </div>
  <img :src="imagenCapturada" v-if="imagenCapturada" />
  <p v-if="textoOCR">{{ textoOCR }}</p>

</template>


<script setup>
import { ref } from 'vue';
import Tesseract from 'tesseract.js';

const videoRef = ref(null);
const canvasRef = ref(null)
const imagenCapturada = ref(null)
const textoOCR = ref('')

async function escanearTicket() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  videoRef.value.srcObject = stream
  videoRef.value.onloadedmetadata = async () => {
    await capturarFotograma()
  }
}

async function capturarFotograma() {
  const video = videoRef.value
  const canvas = canvasRef.value

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0)
  ctx.filter = 'contrast(150%) grayscale(100%)'
  ctx.drawImage(canvas, 0, 0)

  imagenCapturada.value = canvas.toDataURL('image/png')

  const resultado = await Tesseract.recognize(imagenCapturada.value, 'spa')
  textoOCR.value = resultado.data.text
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

.btn-escanear:hover {
  background-color: hsl(116, 21%, 43%);
  cursor: pointer;
  color: antiquewhite;
}
</style>


