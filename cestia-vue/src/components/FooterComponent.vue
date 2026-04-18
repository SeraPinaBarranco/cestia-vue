<template>

<footer>
  <div class="footer-content">
    <router-link class="enlaces-footer " to="/"><p class="elementos-footer"><span class="footer-icons">&#127968;</span>Inicio</p></router-link>
    <router-link class="enlaces-footer " to="#"><p class="elementos-footer"><span class="footer-icons">&#128210;</span>Consejos</p></router-link>
    <router-link class="enlaces-footer " to="/about"><p class="elementos-footer"><span class="footer-icons">&#128100;</span>Perfil</p></router-link>
  </div>
  <p>© 2024 Cestia. All rights reserved.</p>
</footer>

</template>



<style scoped>

  footer {
    background-color: #d0d0d0;
    background-image: linear-gradient(180deg, #dddddd 0%, #c9c9c9 100%);
    padding: 10px;
    padding-bottom: calc(20px + env(safe-area-inset-bottom));
    text-align: center;
    color: #555;
    /* border: 1px solid #bcbcbc; */
    border-radius: 5px;
    margin: 0px 1vw 1.5vh 1vw;
    box-shadow:
      0 6px 14px rgba(0, 0, 0, 0.16),
      0 2px 4px rgba(0, 0, 0, 0.12),
      /* inset 0 1px 0 rgba(255, 255, 255, 0.7), */
      inset 0 -2px 4px rgba(0, 0, 0, 0.08);
  }

  .footer-content {
   display: flex;
   justify-content: space-around;
   align-items: center;
   margin-bottom: 0.5vh;
  }

  .footer-icons {
    border-radius: 50%;
    padding: 5px;
    background-color: #555;
    border: 1px solid #555;
    font-size: 35px;
    color: #555;
  }


  .enlaces-footer {
    text-decoration: none;
  }

  .elementos-footer{
    display: flex;
    flex-direction: column;
    align-items: center;

  }


</style>
