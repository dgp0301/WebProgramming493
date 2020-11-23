<template>
<div class ="level section">
<div class="level-item">
<form>
    <div class="field">
    <p class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="Email">
        <span class="icon is-small is-left">
        <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
        <i class="fas fa-check"></i>
        </span>
    </p>
    </div>
    <div class="field">
    <p class="control has-icons-left">
        <input class="input" type="password" placeholder="Password">
        <span class="icon is-small is-left">
        <i class="fas fa-lock"></i>
        </span>
    </p>
    </div>
    <div class="field">
    <p class="control">
        <button class="button is-success" @click.prevent="login">
        Login
        </button>
        <button class="button is-primary" @click.prevent="fblogin">
        FB Login
        </button>
        <button class="button is-warning" @click.prevent="googleLogin">
        Google Login
        </button>
    </p>
    </div>
</form>
</div>
</div>
</template>

<script>
import session from "@/models/session";

export default {
    methods: {
        login(){
            session.user = {
                name:'Maria De La Cruz',
                handle: 'maria.pimentel.908',
                profile: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/120970608_3675989932451570_8765047977384829050_n.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=JnTC5Xk8ZqsAX8xq0U6&_nc_ht=scontent-lga3-1.xx&oh=0f17e668998362917926f9d1434a69cc&oe=5FA6E0CA'
            }
            session.addNotification('Yay! You logged in','primary');
            this.$router.push('feed');
        },
        fblogin(){
            FB.login( function(authInfo){
                console.log(authInfo)
                FB.api("me?fields=id,name,email,profile-pic", x=> console.log(x));
            }, { scope: 'public_profile,email,user-photos' } )
        },
        googleLogin(){
            
        }
    }

}

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '371215270830283',
      cookie     : true,
      xfbml      : true,
      version    : 'v9.0'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


</script>

<style>

</style>