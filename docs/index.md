---
layout: false
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { withBase } from 'vitepress'

onMounted(() => {
  window.location.replace(withBase('/Examples/jiaorong-agent/started.html'))
})
</script>
