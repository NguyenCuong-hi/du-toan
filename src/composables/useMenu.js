import { ref, computed } from 'vue'
import menuData from '@/mockup/menu.json'

// Global reactive active module name across the app
const activeModuleName = ref(menuData[0]?.name || 'Setup')

export function useMenu() {
  const modules = computed(() => menuData)

  const activeModule = computed(() => {
    return (
      modules.value.find((m) => m.name === activeModuleName.value) ||
      modules.value[0]
    )
  })

  const currentModuleItems = computed(() => {
    return activeModule.value?.items || []
  })

  function setActiveModule(name) {
    const found = modules.value.find((m) => m.name === name)
    if (found) {
      activeModuleName.value = found.name
    }
  }

  function syncWithRoute(route) {
    if (!route) return
    const path = route.fullPath || route.path
    const basePath = route.path

    // 1. If current active module contains this route, keep it
    const currentItems = activeModule.value?.items || []
    const isInCurrent =
      activeModule.value?.to === basePath ||
      currentItems.some((it) => {
        const target = it.to || it.route
        return target === path || target === basePath
      })

    if (isInCurrent) return

    // 2. Otherwise find the module that owns this route or sub-route
    for (const mod of menuData) {
      const matchParent = mod.to === basePath
      const matchChild = mod.items?.some((it) => {
        const target = it.to || it.route
        return (
          target === path ||
          target === basePath ||
          (target && target.split('?')[0] === basePath)
        )
      })

      if (matchParent || matchChild) {
        activeModuleName.value = mod.name
        return
      }
    }
  }

  return {
    modules,
    activeModule,
    activeModuleName,
    currentModuleItems,
    setActiveModule,
    syncWithRoute,
  }
}
