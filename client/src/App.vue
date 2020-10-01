<template>
<section class="section">
    <div class="container">
      <Nav />
      <h1 class="title">
        Hello World
      </h1>
      <p class="subtitle">
        My first website with <strong>Bulma</strong>!
      </p>
       <router-view/>
    </div>
  </section>
</template>

<script>
import Nav from "@/components/Nav";

export default {
    components:{
      Nav
    }
}
</script>

<style lang="scss">

</style>
