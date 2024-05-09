<script setup>
import { computed, ref } from "vue";
import data from "~/static/data.json";

const parseClassIdentifier = (classKey) => {
    if (!classKey) {
        console.error("Invalid classKey:", classKey);
        return { grade: null, section: null };
    }
    const matches = classKey.match(/(\d+)([A-Z]+)/);
    if (!matches) {
        console.error("No matches found for classKey:", classKey);
        return { grade: null, section: null };
    }
    return {
        grade: parseInt(matches[1], 10),
        section: matches[2],
    };
};

const selectedGrade = ref(7);
const selectedSection = ref("A");

const selectGrade = (grade) => {
    selectedGrade.value = grade;
};
const selectSection = (section) => {
    selectedSection.value = section;
};

const uniqueGrades = computed(() => {
    const grades = Object.keys(data).map((key) => parseClassIdentifier(key).grade);
    return [...new Set(grades)].sort((a, b) => a - b);
});

const currentSections = computed(() => {
    return Object.keys(data)
        .filter((item) => item.startsWith(selectedGrade.value.toString()))
        .map((key) => parseClassIdentifier(key).section);
});

const filteredData = computed(() => {
    const classKey = selectedGrade.value + selectedSection.value;
    if (!data[classKey]) return [];

    const scheduleMatrix = Object.values(data[classKey]);

    const rotated = scheduleMatrix[0].map((_, colIndex) => scheduleMatrix.map(row => row[colIndex] || "-"));

    return rotated.map(periodEntries => periodEntries.map(entry => {
        const parts = entry.split('|');
        const subject = parts[0];
        const room = parts[1] || "Unknown"; 
        return `${subject}\n${room}`;
    }));
});
</script>

<template>
    <div class="flex items-center justify-center flex-col my-5 gap-3">
        <h1 class="text-4xl font-extrabold">Fizmat Schedule</h1>
        <h2 class="font-medium text-center"><b>Расписание занятий РФМШ</b> <br/>Удобный просмотр расписания по дням и классам, актуальная информация для учеинков.</h2>
    </div>
    <div class="flex flex-wrap justify-center gap-1 my-1">
        <div v-for="grade in uniqueGrades" :key="grade" :class="{ 'active-btn': selectedGrade == grade }" class="btn btn-circle font-bold text-xl text-black bg-white hover:bg-gray-200 cursor-pointer" @click="selectGrade(grade)">
            {{ grade }}
        </div>
    </div>
    <div class="flex flex-wrap justify-center gap-1">
        <div v-for="section in currentSections" :key="section" :class="{ 'active-btn': selectedSection == section }" class="btn btn-circle font-bold text-xl text-black bg-white hover:bg-gray-200 cursor-pointer" @click="selectSection(section)">
            {{ section }}
        </div>
    </div>

    <div class="flex items-center justify-center text-3xl font-extrabold my-5 py-3 w-full bg-yellow-500 text-white">
        <h1>{{ selectedGrade }}{{ selectedSection }}</h1>
    </div>

    <div>
        <div class="overflow-x-auto flex items-center justify-center">
            <table class="table w-9/12 text-lg text-center whitespace-pre-line">
                <thead>
                    <tr>
                        <th>N</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(items, index) in filteredData" :key="index">
                        <th>{{ index + 1 }}</th>
                        <td v-for="(item, idx) in items" :key="idx">{{ item }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.active-btn {
    background-color: rgb(255, 215, 0); /* Brighter color for better visibility */
    color: black;
    border: 2px solid black; /* Added border for better distinction */
}
.btn:hover {
    transform: scale(1.05); /* Scale on hover for interactive feel */
    transition: transform 0.3s ease-in-out;
}
</style>
