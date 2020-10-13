<template>
<div class="">
    <Nav />
    <div class="container">
      <Notifications/>
       <router-view/>
    </div>
  </div>
</template>

<script>
import Notifications from "@/components/Notifications";
import Nav from "@/components/Nav";

export default {
    components:{
      Nav, Notifications
    }
}
</script>

<style lang="scss">

</style>
