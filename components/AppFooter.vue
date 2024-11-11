<script setup>
import {ref} from "vue";

const abau = ref(false);
</script>

<template>
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
        <nav class="flex flex-col md:flex-row md:gap-10">
            <p class="link link-hover hover:no-underline hover:text-yellow-500 hover:duration-300">MPD Club</p>
            <p class="link link-hover hover:no-underline hover:text-yellow-500 hover:duration-300">Developers</p>
            <p class="link link-hover hover:no-underline hover:text-yellow-500 hover:duration-300">Privacy Policy</p>
            <p class="link link-hover hover:no-underline hover:text-yellow-500 hover:duration-300">Terms & Conditions</p>
        </nav>
        <aside>
            <p @click="abau=true">INFERNO Copyright © 2021 Inferno - All rights reserved</p>
        </aside>
    </footer>
</template>
