<template>
  <div class="escaner-wrapper">
    <div class="escaner-container" v-if="streamActivo">
      <video ref="videoRef" autoplay playsinline></video>
      <div ref="guiaRef" class="guia-recorte" :style="marcoEstilo">
        <div class="handle arriba-izquierda" @pointerdown="iniciarRedimensionado('arriba-izquierda', $event)"></div>
        <div class="handle arriba-derecha"   @pointerdown="iniciarRedimensionado('arriba-derecha', $event)"></div>
        <div class="handle abajo-izquierda"  @pointerdown="iniciarRedimensionado('abajo-izquierda', $event)"></div>
        <div class="handle abajo-derecha"    @pointerdown="iniciarRedimensionado('abajo-derecha', $event)"></div>
      </div>
    </div>

    <canvas ref="canvasRef" style="display:none"></canvas>

    <div class="boton-escanear-container">
      <button v-if="!streamActivo" class="btn-escanear" @click="escanearTicket">Escanear ticket</button>
      <button v-else class="btn-escanear btn-capturar" @click="capturarFotograma">Capturar</button>
    </div>

    <img :src="imagenCapturada" v-if="imagenCapturada" />
    <p v-if="textoOCR">{{ textoOCR }}</p>
  </div>
</template>


<script setup>
import { ref, computed, nextTick } from 'vue';
import Tesseract from 'tesseract.js';

const videoRef = ref(null)
const canvasRef = ref(null)
const guiaRef = ref(null)
const imagenCapturada = ref(null)
const textoOCR = ref('')
const streamActivo = ref(false)
const stream = ref(null)

const marco = ref({ top: 15, left: 5, width: 90, height: 70 })

const marcoEstilo = computed(() => ({
  top:    `${marco.value.top}%`,
  left:   `${marco.value.left}%`,
  width:  `${marco.value.width}%`,
  height: `${marco.value.height}%`,
}))

function iniciarRedimensionado(esquina, event) {
  event.preventDefault()
  const contenedor = event.target.closest('.escaner-container').getBoundingClientRect()

  const onMove = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY

    const x = ((clientX - contenedor.left) / contenedor.width) * 100
    const y = ((clientY - contenedor.top) / contenedor.height) * 100

    if (esquina.includes('derecha')) {
      marco.value.width = Math.max(20, x - marco.value.left)
    }
    if (esquina.includes('abajo')) {
      marco.value.height = Math.max(20, y - marco.value.top)
    }
    if (esquina.includes('izquierda')) {
      const nuevoLeft = Math.min(x, marco.value.left + marco.value.width - 20)
      marco.value.width += marco.value.left - nuevoLeft
      marco.value.left = nuevoLeft
    }
    if (esquina.includes('arriba')) {
      const nuevoTop = Math.min(y, marco.value.top + marco.value.height - 20)
      marco.value.height += marco.value.top - nuevoTop
      marco.value.top = nuevoTop
    }
  }

  const onEnd = () => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onEnd)
  }

  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onEnd)
}

async function escanearTicket() {
  stream.value = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  streamActivo.value = true

  await nextTick()
  videoRef.value.srcObject = stream.value
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

.guia-recorte {
  position: absolute;
  border: 2px solid white;
  border-radius: 4px;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
}

.handle {
  position: absolute;
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 50%;
  touch-action: none;
}

.arriba-izquierda { top: -14px;  left: -14px;  cursor: nwse-resize; }
.arriba-derecha   { top: -14px;  right: -14px; cursor: nesw-resize; }
.abajo-izquierda  { bottom: -14px; left: -14px;  cursor: nesw-resize; }
.abajo-derecha    { bottom: -14px; right: -14px; cursor: nwse-resize; }

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

.btn-capturar {
  background-color: hsl(210, 70%, 50%);
}

.btn-capturar:hover {
  background-color: hsl(210, 70%, 40%);
}

.btn-escanear:hover {
  background-color: hsl(116, 21%, 43%);
  cursor: pointer;
  color: antiquewhite;
}
</style>
