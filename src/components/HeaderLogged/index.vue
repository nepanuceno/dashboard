<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-36">
      <img class="w-full" src="../../assets/images/logo_white.png" alt="">
    </div>
  </div>

  <div class="flex items-stretch">
    <ul class="flex list-none ">
      <li
        @click="() => router.push({ name: 'Credencials' })"
        class="px-6 py-2 my-auto mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none">
        Credenciais
      </li>

       <li
        @click="() => router.push({ name: 'Feedbacks' })"
        class="px-6 py-2 my-auto mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none">
        FeedBacks
      </li>

      <li
        @click="handleLogout"
        class="h-10 px-6 py-2 my-auto font-bold bg-white rounded-full cursor-pointer text-brand-main focus:outline-none">
        {{ logoutLabel }}
      </li>
    </ul>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { useStore } from '../../hooks/useStore'
import { computed } from 'vue'
import { cleanCurrentUser } from '../../store/user'

export default {
  setup () {
    const router = useRouter()
    const store = useStore('User')

    const logoutLabel = computed(() => {
      if (!store.currentUser.name) {
        return '...'
      }
      console.log('User Name: ', store.currentUser.name)
      return `${store.currentUser.name} (sair)`
    })

    function handleLogout () {
      window.localStorage.removeItem('token')
      cleanCurrentUser()
      router.push({ name: 'Home' })
    }

    return {
      router,
      logoutLabel,
      handleLogout
    }
  }
}
</script>
