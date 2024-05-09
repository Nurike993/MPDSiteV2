<script setup>
import { computed, ref } from "vue";
import data from "~/static/data.json";

const times = ["8.00 - 8.45", "8.50 - 9.35", "9.50 - 10.35", "10.40 - 11.25", "11.45 - 12.30", 
                "12.35 - 13.20", "13.40 - 14.25", "14.30 - 15.15", "15.40 - 16.25", "16.30 - 17.15"];

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

const selectedGrade = useCookie('selectedGrade', {default: () => (7),});
const selectedSection = useCookie('selectedSection', {default: () => ("A"),});

const selectGrade = (grade) => {
    selectedGrade.value = grade;

    const sectionsForGrade = Object.keys(data)
        .filter((item) => item.startsWith(grade.toString()))
        .map((key) => parseClassIdentifier(key).section);

    if (!sectionsForGrade.includes(selectedSection.value)) {
        selectedSection.value = "A";
    }
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

    const rotated = scheduleMatrix[0].map((_, colIndex) => scheduleMatrix.map((row) => row[colIndex]));

    rotated.pop();

    return rotated.map((periodEntries) =>
        periodEntries.map((entry) => {
            if (entry === "NAN") {
                return "-";
            }
            const parts = entry.split("|");
            const subject = parts[0];
            const room = parts[1] || "Unknown";
            return `${subject}\n${room}`;
        })
    );
});
</script>

<template>
    <div class="flex items-center justify-center flex-col my-5 gap-3">
        <h1 class="text-4xl font-extrabold">Fizmat Schedule</h1>
        <h2 class="text-lg text-center">{{ $t("main-desc") }} <br />{{ $t("second-desc") }}</h2>
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

    <div class="hidden md:block">
        <div class="overflow-x-auto flex items-center justify-center my-7">
            <table class="table w-9/12 text-lg text-center whitespace-pre-line">
                <thead>
                    <tr class="text-lg bg-base-200">
                        <th>N</th>
                        <th>{{ $t("time") }}</th>
                        <th>{{ $t("monday") }}</th>
                        <th>{{ $t("tuesday") }}</th>
                        <th>{{ $t("wednesday") }}</th>
                        <th>{{ $t("thursday") }}</th>
                        <th>{{ $t("friday") }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(items, index) in filteredData" :key="index">
                        <th>{{ index + 1 }}</th>
                        <th>{{ times[index] }}</th>
                        <td v-for="(item, idx) in items" :key="idx">{{ item }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style>
.overlay {
    height: 100vh;
    width: 100%;
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.9);
    overflow-y: hidden;
    transition: 0.5s;
}
.overlay-content {
    overflow: hidden;
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;
}
.overlay a {
    padding: 8px;
    text-decoration: none;
    font-size: 24px;
    color: #818181;
    display: block;
    transition: 0.3s;
}
.overlay a:hover,
.overlay a:focus {
    color: #f1f1f1;
}
@media screen and (max-height: 450px) {
    .overlay a {
        font-size: 20px;
    }
}
.overlay-content h1 {
    cursor: pointer;
    font-size: 24px;
    color: #818181;
    font-weight: normal;
}
</style>
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
