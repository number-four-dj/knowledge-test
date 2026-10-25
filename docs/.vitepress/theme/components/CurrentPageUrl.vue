<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

interface CurrentPageUrlConfig {
  origin: string
  base?: string
  label?: string
}

const { page, site, theme } = useData()

const config = computed<CurrentPageUrlConfig | undefined>(
  () => theme.value.currentPageUrl
)

const pageUrl = computed(() => {
  if (!config.value || page.value.isNotFound) return ''

  let path = page.value.relativePath

  if (path === 'index.md') {
    path = ''
  } else if (path.endsWith('/index.md')) {
    path = path.slice(0, -'index.md'.length)
  } else {
    path = path.replace(/\.md$/, site.value.cleanUrls ? '' : '.html')
  }

  const origin = config.value.origin.replace(/\/+$/, '')
  const base = (config.value.base ?? '').replace(/^\/+|\/+$/g, '')

  return [origin, base, encodeURI(path)].filter(Boolean).join('/')
})

const pageUrlParts = computed(() => {
  const parts = pageUrl.value.split('/')

  return parts.map((part, index) =>
    index < parts.length - 1 ? `${part}/` : part
  )
})
</script>

<template>
  <p v-if="pageUrl" class="current-page-url">
    <span class="current-page-url__label">
      {{ config?.label || '当前网址' }}：
    </span>
    <a
      class="current-page-url__link"
      :href="pageUrl"
      :title="pageUrl"
      target="_blank"
      rel="noreferrer"
    >
      <template v-for="(part, index) in pageUrlParts" :key="index">
        <span>{{ part }}</span>
        <wbr v-if="index < pageUrlParts.length - 1" />
      </template>
    </a>
  </p>
</template>

<style scoped>
.current-page-url {
  display: flex;
  align-items: flex-start;
  min-width: 0;
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}

.current-page-url__label {
  flex: none;
  color: inherit;
}

.current-page-url__link {
  flex: 1;
  min-width: 0;
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 3px;
  word-break: normal;
}

@media (min-width: 640px) {
  .current-page-url {
    line-height: 32px;
  }
}
</style>

<style>
.VPDocFooter {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  row-gap: 4px;
}

.VPDocFooter .edit-info {
  display: contents;
}

.VPDocFooter .current-page-url {
  grid-column: 1;
  grid-row: 1;
}

.VPDocFooter .last-updated {
  grid-column: 1;
  grid-row: 2;
}

.VPDocFooter .prev-next {
  grid-column: 1;
  grid-row: 3;
}
</style>
