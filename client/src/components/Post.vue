<template>
  <div class="card">
  <div class="card-image">
    <figure class="image">
      <img :src="post.URL">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48 ">
          <img :src="`http://localhost:3001/public/profiles/${post.Owner_id}.jpg`">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{post.FirstName}} {{post.LastName}}</p>
        <p class="subtitle is-6">@{{post.primaryEmail}}</p>
      </div>
    </div>

    <div class="content">
      {{post.Text}}
      <time :datetime="post.created_at">11:09 PM - {{post.created_at}} Jan 2016</time>
    </div>
  </div>
</div>
</template>

<script>
export default {
    props: {
        post: Object,
        i: Number
    }
}
</script>

<style>
  time{
    font-size: smaller;
    font-style: italic;
    float: right;
  }
  .card .card-content .media{
    margin: 0;
  }

</style>