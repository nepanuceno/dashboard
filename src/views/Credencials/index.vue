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
        <span v-if='state.hasErrors'> Erro ao carregar a ApiKey</span>
        <span v-else>{{ store.User.currentUser.apiKey }}</span>
        <div class="flex ml-2" v-if="!state.hasErrors">
          <icon
          @click='handleCopy'
            name='copy'
            :color='brandColors.graydark'
            size='24'
            class='cursor-pointer'
          />
          <icon
            @click='handleGenerateApikey'
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
        <span v-if='state.hasErrors'> Erro ao carregar o Script</span>
        <pre v-else>&lt;script src="https://nepanuceno-feedbacker-widget.netlify.app?api_key={{store.User.currentUser.apiKey}}"&gt;&lt;/script&gt;</pre>
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
import { reactive, watch } from 'vue'
import services from '../../services'
import { setApiKey } from '../../store/user'
import { useToast } from 'vue-toastification'

export default {
  components: { HeaderLogged, Icon, ContentLoader },

  setup () {
    const toast = useToast()
    const store = useStore()
    const state = reactive({
      hasErrors: false,
      isLoading: false
    })

    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handleError(true)
      }
    })

    function handleError (error) {
      state.isLoading = false
      state.hasErrors = !!error
    }

    async function handleGenerateApikey () {
      try {
        state.isLoading = true
        const { data } = await services.users.generateApikey()
        setApiKey(data.apiKey)
        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    async function handleCopy () {
      toast.clear()
      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey)
        toast.success('Copiado')
      } catch (error) {
        handleError(error)
      }
    }

    return {
      store,
      state,
      handleError,
      handleCopy,
      handleGenerateApikey,
      brandColors: palette.brand
    }
  }
}
</script>
