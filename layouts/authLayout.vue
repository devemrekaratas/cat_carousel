<template>
    <div class="h-screen flex items-center">
        <div class="w-1/2 h-screen hidden lg:block">
            <img src="../public/cover.jpg" alt="cat"
                class="object-cover w-full h-full">
        </div>
        <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <slot />
        </div>
    </div>
</template>