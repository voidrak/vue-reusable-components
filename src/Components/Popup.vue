<script setup>
    defineProps({
        modelValue: {
            type: Boolean, default: false,
        },
        title: {
            type: String, default: "Popup Title",
        },
        position: {
            type: String, default: "center",
        }
    })

    defineEmits(["update:modelValue"])
</script>

<template>
    <div
        @click="$emit('update:modelValue', false)"
        v-if="modelValue"
        :class="[
            `fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto`,
            position === 'right' ? 'items-end pr-10' : ''
        ]">
        <div
            :class="[
                'bg-white rounded-lg shadow-2xl shadow-black/50 max-w-lg w-full relative p-6',
                position === 'right' ? 'ml-auto mr-4 self-bottom rounded-b-none' : ''
            ]"
            :style="position === 'right' ? { bottom: '0', right: '0' } : {}">
            <div class="flex justify-between items-center">

                <h2 class="text-xl text-gray-700 font-semibold ">{{ title }}</h2>
                <svg 
                @click="$emit('update:modelValue', false)"
                class=" cursor-pointer"
                width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
            </div>
            <slot />
        </div>
    </div>
</template>


