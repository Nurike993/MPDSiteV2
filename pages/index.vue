<script setup>
import { computed, ref } from "vue";
import data from "~/static/data.json";

// SEO
useHead({
    title: "Fizmat Schedule | Расписание уроков физмат | MPD Club",
    meta: [
        { name: "description", content: "Расписание занятий РФМШ! Удобный просмотр расписания школы Fizmat для учеников!" },
        { name: "keywords", content: "РФМШ расписание уроки Fizmat mpd MPD FIZMAT Schedule кесте" },
    ],
});

useSeoMeta({
    title: "Fizmat Schedule | Расписание уроков физмат | MPD Club",
    ogTitle: "🐧 Расписание FizMat MPD",
    description: "Расписание занятий РФМШ! Удобный просмотр расписания школы Fizmat для учеников!",
    ogDescription: "Расписание занятий РФМШ! Удобный просмотр расписания школы Fizmat для учеников!",
    ogImage: "mpd/img/fav.png",
});

const times = ["8.00 - 8.45", "8.50 - 9.35", "9.50 - 10.35", "10.40 - 11.25", "11.45 - 12.30", "12.35 - 13.20", "13.40 - 14.25", "14.30 - 15.15", "15.40 - 16.25", "16.30 - 17.15"];
const startAndEndLessons = [480, 525, 530, 575, 590, 635, 640, 685, 705, 750, 755, 800, 820, 865, 870, 915, 940, 985];

function timeForEnd(quantityLessons, minutesForTimeForEnd) {
    // console.log(minutesForTimeForEnd);
    for (let i = 0; i <= quantityLessons; i += 1) {
        if (minutesForTimeForEnd >= startAndEndLessons[i * 2] && minutesForTimeForEnd <= startAndEndLessons[i * 2 + 1]) {
            $(`.text-untill-end`).text(`До Конца Урока Осталось Менее ${startAndEndLessons[i * 2 + 1] - minutesForTimeForEnd} Минут`);
            break;
        }
    }
}

function timeForStartLesson(quantityLessons, minutesForTimeForEnd) {
    // console.log(timeInMinutes);
    if (minutesForTimeForEnd <= 480 && minutesForTimeForEnd >= 421) {
        $(`.text-untill-end`).text(`До Начала Урока Осталось Менее ${480 - minutesForTimeForEnd} Минут`);
    } else {
        for (let i = 0; i <= quantityLessons; i += 1) {
            if (minutesForTimeForEnd >= startAndEndLessons[i * 2 + 1] && minutesForTimeForEnd <= startAndEndLessons[(i + 1) * 2]) {
                $(`.text-untill-end`).text(`До Начала Урока Осталось Менее ${startAndEndLessons[(i + 1) * 2] - minutesForTimeForEnd} Минут`);
                break;
            }
        }
    }
}

const day = ref(new Date().getDay());
const timeInMinutes = ref(new Date().getMinutes() + new Date().getHours() * 60);

// parse class
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

const scheduleMatrix = computed(() => {
    const classKey = selectedGrade.value + selectedSection.value;
    if (!data[classKey]) return [];

    const res = Object.values(data[classKey])[day.value - 1].filter((entry) => {
        return entry !== "NAN";
    });

    return res;
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

const changeDay = (delta) => {
    day.value += delta;
    if (day.value <= 0) {
        day.value = 5;
    }
    if (day.value > 5) {
        day.value = 1;
    }
};

const curentlesson = computed(() => {
    const timeRNHigh = timeInMinutes.value;
    if (timeRNHigh >= 525 && timeRNHigh <= 575) return 2; // 8.50 - 9.35
    if (timeRNHigh >= 575 && timeRNHigh <= 635) return 3; // 9.50 - 10.35
    if (timeRNHigh >= 420 && timeRNHigh <= 525) return 1; // 7.00 - 8.45
    if (timeRNHigh >= 635 && timeRNHigh <= 685) return 4; // 10.40 - 11.25
    if (timeRNHigh >= 685 && timeRNHigh <= 750) return 5; // 11.45 - 12.30
    if (timeRNHigh >= 750 && timeRNHigh <= 800) return 6; // 12.35 - 13.20
    if (timeRNHigh >= 800 && timeRNHigh <= 865) return 7; // 13.40 - 14.25
    if (timeRNHigh >= 865 && timeRNHigh <= 915) return 8; // 14.30 - 15.15
    if (timeRNHigh >= 915 && timeRNHigh <= 985) return 9; // 16.30 - 17.15
    return 0;
});

const updateTimeInMinutes = () => {
    const now = new Date();
    timeInMinutes.value = now.getMinutes() + now.getHours() * 60;
};

var selectedGrade, selectedSection;

onMounted(() => {
    updateTimeInMinutes();
    setInterval(updateTimeInMinutes, 1000 * 60); // update every minute instead of every second
});

onBeforeMount(() => {
    selectedGrade = useCookie("selectedGrade");
    selectedSection = useCookie("selectedSection");

    if (selectedGrade.value === undefined) selectedGrade.value = 7;
    if (selectedSection.value === undefined) selectedSection.value = "A";
});

const bs = computed(() => {
    let low = 0;
    let high = startAndEndLessons.length;

    if (timeInMinutes.value > startAndEndLessons[high - 1]) return -1;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        if (startAndEndLessons[mid] <= timeInMinutes.value) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return high;
});
</script>

<template>
    <div class="flex items-center justify-center flex-col my-5 gap-3">
        <h1 class="text-3xl sm:text-4xl font-extrabold">Fizmat Schedule</h1>
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

    <div class="flex items-center flex-col justify-center text-3xl my-5 font-bold py-3 w-full bg-yellow-500 text-white gap-2">
        <h1>{{ selectedGrade }}{{ selectedSection }}</h1>

        <p class="md:hidden" v-if="day == 1">{{ $t("monday") }}</p>
        <p class="md:hidden" v-if="day == 2">{{ $t("tuesday") }}</p>
        <p class="md:hidden" v-if="day == 3">{{ $t("wednesday") }}</p>
        <p class="md:hidden" v-if="day == 4">{{ $t("thursday") }}</p>
        <p class="md:hidden" v-if="day == 5">{{ $t("friday") }}</p>
        <p class="md:hidden" v-if="day == 6">{{ $t("saturday") }}</p>
        <p class="md:hidden" v-if="day == 7">{{ $t("sunday") }}</p>

        <p class="font-normal text-center text-xl md:hidden" v-if="bs != -1 && bs % 2 == 0">{{ $t("last-minuts", { minutes: startAndEndLessons[bs] - timeInMinutes }) }}</p>
        <p class="font-normal text-center text-xl md:hidden" v-if="bs != -1 && bs % 2 != 0">{{ $t("last-minuts-lesson", { minutes: startAndEndLessons[bs] - timeInMinutes }) }}</p>

        <div class="flex flex-row gap-3 md:hidden">
            <button @click="changeDay(-1)" class="btn rounded-full shadow-2xl font-bold text-xl text-black bg-white cursor-pointer">Назад</button>
            <button @click="changeDay(1)" class="btn rounded-full shadow-2xl font-bold text-xl text-black bg-white cursor-pointer">Вперед</button>
        </div>
    </div>

    <div class="hidden md:block">
        <div class="overflow-x-auto flex items-center justify-center my-7">
            <table class="table w-9/12 text-lg text-center whitespace-pre-line">
                <thead>
                    <tr class="text-lg bg-base-200">
                        <th>N</th>
                        <th>{{ $t("time") }}</th>
                        <th :class="day == 1 ? 'active' : ''">{{ $t("monday") }}</th>
                        <th :class="day == 2 ? 'active' : ''">{{ $t("tuesday") }}</th>
                        <th :class="day == 3 ? 'active' : ''">{{ $t("wednesday") }}</th>
                        <th :class="day == 4 ? 'active' : ''">{{ $t("thursday") }}</th>
                        <th :class="day == 5 ? 'active' : ''">{{ $t("friday") }}</th>
                        <th :class="day == 6 ? 'active' : ''">{{ $t("saturday") }}</th>
                        <th :class="day == 7 ? 'active' : ''">{{ $t("sunday") }}</th>
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

    <div class="md:hidden">
        <div class="text-lg text-right m-auto my-5" style="max-width: 320px">
            <div v-for="(item, index) in scheduleMatrix" :class="index + 1 == curentlesson ? 'active' : ''" class="flex flex-row justify-center items-center text-xl gap-5 font-bold my-2">
                <p class="text-2xl">{{ index + 1 }}</p>
                <div class="flex flex-col items-start font-bold gap-1" style="width: 100%">
                    <p>{{ item }}</p>
                    <p>{{ times[index] }}</p>
                    <hr style="color: rgb(255, 255, 255); width: 100%" />
                </div>
            </div>
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
.active {
    color: rgb(255, 215, 0);
}
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
