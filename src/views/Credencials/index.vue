<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>
  <div class="flex flex-col items-center h-64 justy-center bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800 fint-black">
      Credenciais
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        Instalação e configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Esta aqui é a chave da API
      </p>

      <content-loader
        v-if='store.Global.isLoading || state.isLoading'
        class="rounded"
        width='600px'
        height='50px'
      />

      <div v-else class="flex justify-between w-full py-3 pl-5 pr-2 mt-2 break-all rounded lg:w-2/3 bg-brand-gray">
        <span>{{ store.User.currentUser.apiKey }}</span>
        <div class="flex ml-2">
          <icon
            name='copy'
            :color='brandColors.graydark'
            size='24'
            class='cursor-pointer'
          />
          <icon
            name='loading'
            :color='brandColors.graydark'
            size='24'
            class='ml-3 cursor-pointer'
          />
        </div>
      </div>
      <p class="mt-5 text-lg text-gray-800 font-regular">
       Coloque este script no seu site para começar a receber feedbaks
      </p>

       <content-loader
        v-if='store.Global.isLoading || state.isLoading'
        class="rounded"
        width='600px'
        height='50px'
      />

      <div v-else class="w-full py-3 pl-5 pr-20 mt-2 overflow-x-scroll rounded lg:w-2/3 bg-brand-gray">
        <pre>&lt;script src="https://nepanuceno-feedbacker-widget.netlify.app?api_key={{store.User.currentUser.apiKey}}"&gt;&lt;/script&gt;</pre>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from '../../components/HeaderLogged'
import ContentLoader from '../../components/ContentLoader.vue'
import Icon from '../../components/Icon'
import { useStore } from '../../hooks/useStore'
import palette from '../../assets/js/palette'
import { reactive } from '@vue/reactivity'

export default {
  components: { HeaderLogged, Icon, ContentLoader },

  setup () {
    const store = useStore()
    const state = reactive({
      isLoading: false
    })
    return {
      store,
      state,
      brandColors: palette.brand
    }
  }
}
</script>
