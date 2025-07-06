<template>
    <header
        class="bg-primary/10 dark:bg-primary/5 text-primary dark:text-primary-dark py-4 px-4 sm:px-6 relative overflow-hidden">
        <div class="container mx-auto relative z-10 flex sm:flex-row items-center justify-between gap-4 sm:gap-0">
            <div class="flex sm:flex-row items-center text-start">
                <img src="/profile-photo.jpg" alt="Salem Yaslem Al-saiari"
                    class="w-20 h-20 sm:w-24 sm:h-24 rounded-full me-6 border-2 border-primary dark:border-primary-dark shadow-lg animate-fadeIn mb-2 sm:mb-0">
                <div>
                    <h1 class="text-2xl sm:text-3xl font-bold animate-slideInFromRight">{{ personalInfo.name }}</h1>
                    <p class="text-lg sm:text-xl mt-1 animate-slideInFromRight text-primary-dark dark:text-primary">{{
                        personalInfo.title }}</p>
                </div>
            </div>
            <!-- Hamburger button for mobile -->
            <button
                class="sm:hidden mx-1 px-3 py-1 rounded-md text-sm font-medium text-primary dark:text-primary-dark hover:bg-primary/10 dark:hover:bg-primary/5 transition-colors items-center"
                @click="menuOpen = !menuOpen" aria-label="Toggle navigation">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <!-- Desktop nav -->
            <div class="hidden sm:flex items-center print:hidden">
                <nav class="flex items-center mx-2">
                    <NuxtLink :to="localePath('/')"
                        class="text-primary dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary transition-colors mx-2">
                        {{ $t('navigation.home') }}</NuxtLink>
                    <NuxtLink :to="localePath('/repos')"
                        class="text-primary dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary transition-colors mx-2">
                        {{ $t('navigation.repositories') }}</NuxtLink>
                    <NuxtLink :to="localePath('/services')"
                        class="text-primary dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary transition-colors mx-2">
                        {{ $t('navigation.services') }}</NuxtLink>
                </nav>
                <button @click="switchLanguage($i18n.locale === 'en' ? 'ar' : 'en')"
                    class="mx-1 px-3 py-1 rounded-md text-sm font-medium text-primary dark:text-primary-dark hover:bg-primary/10 dark:hover:bg-primary/5 transition-colors flex items-center">
                    <svg class="w-5 h-5 me-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    {{ $i18n.locale === 'en' ? 'العربية' : 'English' }}
                </button>
                <ThemeToggle />
            </div>
        </div>
        <!-- Mobile nav fullscreen overlay -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="menuOpen"
                    class="fixed inset-0 z-50 bg-gray-100/95 dark:bg-gray-900/95 text-primary-dark dark:text-primary flex flex-col items-center justify-center print:hidden animate-fadeIn backdrop-blur-md">
                    <button
                        class="fixed bottom-4 px-4 py-2 rounded-full text-lg font-medium text-primary dark:text-primary-dark bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-primary/20 dark:hover:bg-primary/10 transition-colors flex items-center z-[60] focus:outline-none focus:ring-2 focus:ring-primary"
                        @click="menuOpen = false" aria-label="Close navigation">
                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <nav class="flex flex-col items-center gap-6">
                        <NuxtLink :to="localePath('/')" class="text-2xl font-semibold" @click="menuOpen = false">
                            {{ $t('navigation.home') }}
                        </NuxtLink>
                        <NuxtLink :to="localePath('/repos')" class="text-2xl font-semibold" @click="menuOpen = false">
                            {{ $t('navigation.repositories') }}
                        </NuxtLink>
                        <NuxtLink :to="localePath('/services')" class="text-2xl font-semibold"
                            @click="menuOpen = false">
                            {{ $t('navigation.services') }}
                        </NuxtLink>
                        <button @click="switchLanguage($i18n.locale === 'en' ? 'ar' : 'en'); menuOpen = false"
                            class="px-3 py-1 text-lg font-medium mt-4 rounded-md font-medium text-primary dark:text-primary-dark hover:bg-primary/10 dark:hover:bg-primary/5 transition-colors flex items-center">
                            <svg class="w-5 h-5 me-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            {{ $i18n.locale === 'en' ? 'العربية' : 'English' }}
                        </button>
                        <div class="mt-4">
                            <ThemeToggle />
                        </div>
                    </nav>
                </div>
            </transition>
        </Teleport>
    </header>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { usePersonalInfo } from '../common/utils'
const personalInfo = await usePersonalInfo()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const menuOpen = ref(false)

async function switchLanguage(language: string) {
    const switchLanguage = switchLocalePath(language as Parameters<typeof switchLocalePath>[0]);
    router.push(switchLanguage)
}
</script>
<style>
.router-link-active {
    font-weight: 600;
    position: relative;
}

.router-link-active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: currentColor;
    border-radius: 2px;
}

/* Optional: fadeIn animation for mobile menu */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.2s ease;
}
</style>