<template>
    <footer class="bg-primary text-white text-center p-4 mt-8 print:hidden">
        <p>
            &copy; {{ new Date().getFullYear() }} {{ personalInfo.name }}. {{ $t('home.allRightsReserved') }}
        </p>
    </footer>
</template>
<script setup lang="ts">
import { usePersonalInfo } from '../common/utils'
const personalInfo = await usePersonalInfo()
</script>