import { ref, watchEffect } from 'vue'

const isDark = ref(false)

export function useTheme() {
  watchEffect(() => {
    document.documentElement.classList.toggle('dark', isDark.value)
  })

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  return { isDark, toggleTheme }
}
