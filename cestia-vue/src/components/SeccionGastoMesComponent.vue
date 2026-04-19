<template>
  <section class="gasto-card">
    <h3 class="gasto-card__title">Gasto del Mes</h3>

    <div class="gasto-card__progress" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
      <div class="gasto-card__progress-fill" />
    </div>

    <footer class="gasto-card__footer">
      <span>Gasto promedio</span>
      <span>81 €</span>
    </footer>
  </section>
</template>


<script setup>


</script>

<style scoped>
.gasto-card {
  margin-top: 1vh;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-sizing: border-box;
}

.gasto-card__title {
  margin: 0 0 12px;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.gasto-card__progress {
  width: 100%;
  height: 10px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.gasto-card__progress-fill {
  width: 65%;
  height: 100%;
  background: #22c55e;
}

.gasto-card__footer {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
