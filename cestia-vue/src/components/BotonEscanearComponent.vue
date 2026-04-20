<template>
  <div class="escaner-wrapper">
    <div class="escaner-container" v-if="streamActivo">
      <video ref="videoRef" autoplay playsinline></video>
      <div class="overlay-oscuro"></div>
      <div ref="guiaRef" class="guia-recorte"></div>
    </div>

    <canvas ref="canvasRef" style="display:none"></canvas>

    <div class="boton-escanear-container">
      <button class="btn-escanear" @click="escanearTicket">Escanear ticket</button>
    </div>

    <img :src="imagenCapturada" v-if="imagenCapturada" />
    <p v-if="textoOCR">{{ textoOCR }}</p>
  </div>
</template>


<script setup>
import { ref, nextTick } from 'vue';
import Tesseract from 'tesseract.js';

const videoRef = ref(null)
const canvasRef = ref(null)
const guiaRef = ref(null)
const imagenCapturada = ref(null)
const textoOCR = ref('')
const streamActivo = ref(false)
const stream = ref(null)

async function escanearTicket() {
  stream.value = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  streamActivo.value = true

  await nextTick()
  videoRef.value.srcObject = stream.value
  videoRef.value.onloadedmetadata = async () => {
    await capturarFotograma()
  }
}

async function capturarFotograma() {
  const video = videoRef.value
  const canvas = canvasRef.value
  const guia = guiaRef.value

  const videoBounds = video.getBoundingClientRect()
  const guiaBounds = guia.getBoundingClientRect()

  const scaleX = video.videoWidth / videoBounds.width
  const scaleY = video.videoHeight / videoBounds.height

  const cropX = (guiaBounds.left - videoBounds.left) * scaleX
  const cropY = (guiaBounds.top - videoBounds.top) * scaleY
  const cropAncho = guiaBounds.width * scaleX
  const cropAlto = guiaBounds.height * scaleY

  canvas.width = cropAncho
  canvas.height = cropAlto

  const ctx = canvas.getContext('2d')
  ctx.filter = 'contrast(150%) grayscale(100%)'
  ctx.drawImage(video, cropX, cropY, cropAncho, cropAlto, 0, 0, cropAncho, cropAlto)

  imagenCapturada.value = canvas.toDataURL('image/png')

  stream.value.getTracks().forEach(track => track.stop())
  streamActivo.value = false

  const resultado = await Tesseract.recognize(imagenCapturada.value, 'spa')
  textoOCR.value = resultado.data.text
}
</script>


<style scoped>
.escaner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.escaner-container {
  position: relative;
  width: 100%;
}

.escaner-container video {
  width: 100%;
  display: block;
}

.overlay-oscuro {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.guia-recorte {
  position: absolute;
  top: 15%;
  left: 5%;
  width: 90%;
  height: 70%;
  border: 2px solid white;
  border-radius: 4px;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
}

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
