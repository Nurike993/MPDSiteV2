<template>
    <div id="all-cards">
        <div v-for="key in keys" :key="key" itemscope itemtype="https://schema.org/EducationalOrganization" class="product-card">
            <div class="main-images">
                <a :href="clubs[key].link" target="_blank">
                    <NuxtImg itemprop="logo" :src="`clubsLogos/${clubs[key].logo}`" :alt="`${key} fizmat club`" loading="lazy" />
                </a>
            </div>
            <div class="shoe-details" style="text-align: center; width: 100%;">
                <a itemprop="name" :href="clubs[key].link" class="link-to-group" target="_blank">{{ key }}</a>
                <p itemprop="description" style="color: black" class="shoe-detail-paragraph">{{ clubs[key].disc }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import data from "./assets/clubs.json";

// SEO
useHead({
  title: 'Fizmat Clubs | Все клубы физмата | MPD Club',
  meta: [
    { name: 'description', content: 'Расписание занятий РФМШ! Удобный просмотр расписания школы Fizmat для учеников!' },
    { name: 'keywords', content: 'РФМШ расписание уроки Fizmat mpd MPD FIZMAT Schedule кесте' }
  ]
});

useSeoMeta({
  title: 'Fizmat Clubs | Все клубы физмата | MPD Club',
  ogTitle: '🐧 Расписание FizMat MPD',
  description: 'Расписание занятий РФМШ! Удобный просмотр расписания школы Fizmat для учеников!',
  ogDescription: 'Расписание занятий РФМШ! Удобный просмотр расписания школы Fizmat для учеников!',
  ogImage: 'mpd/img/fav.png'
});

const clubs = data;
const keys = Object.keys(data);
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
.great-color {
    color: #adbabd;
}

.yellow-color {
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

.product-card .main-images img {
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
        display: flex;
    }

    .product-card .main-images img {
        height: 100%;
        max-width: 150px;
        border-radius: 8px;
    }

    .shoe-detail-paragraph {
        margin-top: -5px;
        font-size: 14px;
    }

    .blue {
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 5px;
    }
}

#all-cards {
    justify-content: center;
    /* margin: auto; */
    margin-top: 100px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 55px;
}

.link-to-group {
    font-size: 24px;
    color: black;
    text-decoration: none;
}

.club-text {
    margin-top: 3px;
}

#header-clubs {
    color: white;
    text-align: center;
    margin-bottom: -40px;
    margin-top: 100px;
}
</style>
