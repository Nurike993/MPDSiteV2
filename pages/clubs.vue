<template>
<header id="header-clubs"><h1>Чтобы вступить в группу клуба -> кликните на картинку</h1></header>
  <div id="all-cards">
    <div v-for="n in number" class="product-card" :key="n">
      <div class="main-images">
          <a :href="clubs[keys[n]]['link']" target="_blank"> <img id="blue" class="blue active" :src="'.//public/clubsLogos/' + clubs[keys[n]]['logo']" :alt="keys[n]"> </a>
          
      </div>
      <div class="shoe-details" style="text-align: center;">
          <a :href="clubs[keys[n]]['link']" class="link-to-group" target="_blank"> {{keys[n]}} </a>
          <p style="margin-top: -5px; color:black;" class="shoe-detail-paragraph">{{ clubs[keys[n]]['disc'] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import data from './assets/clubs.json'

const keysArray = [];
let len_of_clubs = 0;
for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
        keysArray.push(key);
        len_of_clubs += 1;
    }
}

export default {
  name: "App",
  components: {},
  data() {
    return {
      number: len_of_clubs-1,
      clubs:data,
      keys:keysArray
    };
  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Poppins:400,500,600,700);


h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
.great-color{
    color: #adbabd;
}

.yellow-color{
    color: #ffbf00;
}

.product-card {
    max-width: 300px;
    width: 100%;
    border-radius: 25px;
    background: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    margin-bottom: 20px;
}

.product-card .main-images img{
    height: 300px;
    width: 300px;
    left: 12px;
    top: -40px;
}
@media (min-width: 674px) {
  .product-card {
    height: 500px;

  }
}

@media (max-width: 674px) {
    .product-card {
        margin-bottom: 15px;
        background-color: white;
        border-radius: 14px;
        min-width: 100%;
        max-width: 100%;
        display:flex;
    }

    .product-card .main-images img{
      height: 150px;
      width: 150px;
      border-radius: 8px;
    }

    .shoe-detail-paragraph{
      margin-top: -5px;
      font-size: 14px;
    }

    .blue{
      margin-top: 10px;
      margin-left: 10px;
      margin-right: 5px;
  }

}



#all-cards{
    justify-content: center;
    /* margin: auto; */
    margin-top: 100px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 55px;
}


.link-to-group{
    font-size: 24px;
    color:black;
    text-decoration: none;
}




.club-text{
    margin-top: 3px;
}

#header-clubs{
    color:white;
    text-align: center;
    margin-bottom: -40px;
    margin-top: 100px;
}


</style>