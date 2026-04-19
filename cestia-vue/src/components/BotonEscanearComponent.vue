<template>
  <div class="boton-escanear-container">
   
    <button @click="escanear" class="btn-escanear">Escanear ticket</button>

  </div>
</template>


<script setup>

</script>






<style scoped>
.boton-escanear-container {
  display: flex;
  justify-content: center;
  align-items: center;

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


