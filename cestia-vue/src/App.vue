
<template>
  <div class="app-layout">

    <main class="app-main">
      <!-- <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav> -->


      <router-view />
    </main>

    <FooterComponent />
  </div>
</template>

<script setup>

import FooterComponent from './components/FooterComponent.vue';
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: #dbccb2;
  padding-inline: 0.75rem;
}

.app-main {

  flex: 1;
}

@supports not (min-height: 100dvh) {

  .app-main {
    margin: 0 auto;
    width: 80%;
    flex: 1;
  }

  .app-layout {
    min-height: 100vh;
  }
}

/* Mobile grande */
@media (min-width: 480px) {
  .app-layout {
    padding-inline: 1rem;
  }
}

/* Tablet */
@media (min-width: 768px) {
  .app-layout {
    padding-inline: 1.5rem;
  }
}

/* Laptop / Desktop */
@media (min-width: 1024px) {
  .app-layout {
    margin: 0 auto;

    padding-inline: 2rem;
  }
}

/* Pantallas grandes */
@media (min-width: 1280px) {
  .app-layout {
    padding-inline: 3rem;
  }
}
</style>
