<script setup>
import { ref, computed } from "vue";
const { locale, locales } = useI18n();

const isMenuOpen = ref(false);

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
    document.body.style.overflow = isMenuOpen.value ? "hidden" : "auto";
}
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const availableLocales = computed(() => {
    return locales.value.filter((i) => i.code !== locale.value);
});
</script>

<template>
    <header>
        <div :class="['overlay', { open: isMenuOpen }]" class="overlay">
            <div class="overlay-content">
                <NuxtLink @click="toggleMenu" :to="localePath('/')">🗓️ Schedule 🗓️</NuxtLink>
                <NuxtLink @click="toggleMenu" :to="localePath('/clubs')">🐉 Clubs 🐉</NuxtLink>
                <h1 @click="toggleMenu" id="change-color">✅ Change color ✅</h1>
                <NuxtLink to="/mpd/">🤩 MPD club 🤩</NuxtLink>
                <NuxtLink @click="toggleMenu" target="_blank" to="http://myextra.kz/">📰 Extracurricular 📰</NuxtLink>
            </div>
        </div>

        <label class="absolute right-4 top-4 btn btn-circle swap swap-rotate z-50">
            <input type="checkbox" id="side-menu" class="side-menu" @change="toggleMenu" :checked="isMenuOpen" />
            <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
            <svg class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
        </label>

        <NuxtLink class="btn btn-circle absolute right-4 top-20 font-bold text-xl text-black bg-white hover:bg-white" v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
            {{ locale.code.toUpperCase() }}
        </NuxtLink>
    </header>
</template>

<style scoped>
.overlay {
    max-height: 0;
    transition: max-height 0.3s ease;
}

.overlay.open {
    max-height: 100vh;
}

.change-language {
    align-self: center;
    position: absolute;
    right: 1%;
    top: 11%;
}
</style>
