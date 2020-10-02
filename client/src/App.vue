<template>
<section class="section">
    <Nav />
    <div class="container">
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
