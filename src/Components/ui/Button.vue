<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-medium gap-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizeClasses[size],
      variantClasses[variant],
      className,
      {
        'cursor-not-allowed opacity-50': disabled || loading,
        'cursor-pointer': !disabled && !loading,
        'w-full': fullWidth,
      },
    ]"
    @click="handleClick"
    :disabled="disabled || loading"
    :type="type"
    :aria-label="ariaLabel"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <!-- Start icon -->
    <span v-else-if="startIcon" class="flex items-center">
      <component :is="startIcon" />
    </span>

    <!-- Button text -->
    <span v-if="!loading || showTextWhileLoading">
      <slot></slot>
    </span>

    <!-- End icon -->
    <span v-if="endIcon && !loading" class="flex items-center">
      <component :is="endIcon" />
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "md",
    validator: (v) => ["xs", "sm", "md", "lg", "xl"].includes(v),
  },
  variant: {
    type: String,
    default: "primary",
    validator: (v) =>
      [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "outline",
        "ghost",
        "link",
      ].includes(v),
  },
  type: {
    type: String,
    default: "button",
    validator: (v) => ["button", "submit", "reset"].includes(v),
  },
  startIcon: { type: Object, default: null },
  endIcon: { type: Object, default: null },
  onClick: { type: Function, default: null },
  className: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  showTextWhileLoading: { type: Boolean, default: true },
  ariaLabel: { type: String, default: "" },
  fullWidth: { type: Boolean, default: false },
});

const sizeClasses = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-4 py-2.5 text-base",
  xl: "px-6 py-3 text-base",
};

const variantClasses = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 disabled:bg-primary-300",
  secondary:
    "bg-primary-100 text-primary-900 hover:bg-primary-200 focus:ring-primary-500 disabled:bg-gray-100 disabled:text-gray-400",
  success:
    "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-300",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300",
  warning:
    "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 disabled:bg-yellow-300",
  outline:
    "bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 disabled:border-gray-300 disabled:text-gray-400",
  ghost:
    "bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-primary-500 disabled:text-gray-400",
  link: "bg-transparent text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline focus:ring-primary-500 disabled:text-gray-400",
};

const handleClick = (event) => {
  if (!props.disabled && !props.loading && props.onClick) {
    props.onClick(event);
  }
};
</script>
