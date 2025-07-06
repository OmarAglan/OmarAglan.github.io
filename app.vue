<template>
  <div class="min-h-screen transition-colors duration-200"
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <Header></Header>

    <NuxtPage />

    <Footer></Footer>
  </div>
</template>
<style>
body {
  @apply bg-gray-100 dark:bg-gray-900;
}

* {
  font-family: Rubik;
}
</style>