<template>

  <Formulario @aoSalvarTarefa="adicionarTarefa" />
  <div class="lista">
    <Box v-if="listaEstaVazia">
      Você falhou e fez nada ainda hein
    </Box>

    <div class="field">
      <p class="control has-icons-left ">
        <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>

      </p>
    </div>

    <Tarefa v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index" @aoTarefaClicada="selecionarTarefa" />

    <Modal :mostrar="tarefaSelecionada != null">

      <!--<header class="modal-card-head">-->
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>
      <!--<section class="modal-card-body">-->
        <template v-slot:corpo>
        <div class="field">
          <label for="descricaoDaTarefa" class="label">
            Descricao
          </label>
          <input 
            type="text" 
            class="input" 
            v-model="tarefaSelecionada!.descricao" 
            id="nomeDaTarefa">
        </div>
        <div class="field">

        </div>
      </template>
      <!--<footer class="modal-card-foot">-->
        <template v-slot:rodape>
        <button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
        <button @click="fecharModal" class="button">Cancelar</button>
      </template>

    </Modal>
    <!-- <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa</p>
          <button @click="fecharModal" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">
              Descricao
            </label>
            <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="nomeDaTarefa">
          </div>
          <div class="field">

          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </footer>
      </div>
    </div> -->


  </div>

</template>
  
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import Modal from '../components/Modal.vue';
//import ITarefa from '../interfaces/ITarefa';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import { useStore } from '@/store';
import ITarefa from '@/interfaces/ITarefa';
//import IProjeto from '@/interfaces/IProjeto';

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box,
    Modal,
  },
  // data() {
  //   return {
  //     tarefas: [] as ITarefa[]
  //   }
  // },

  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    }
  },
  methods: {
    adicionarTarefa(tarefa: ITarefa): void {
      //this.tarefas.push(tarefa);
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa): void {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal(): void {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => {
          this.fecharModal();
        });
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length == 0
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    //isso aqui é muito legal: você pode usar o computed do vue para criar um computed que vai ser atualizado sempre que o estado do store mudar
    //traduzindo o que o vue faz: ele vai observar o estado do store e quando ele mudar, ele vai executar a função que você passou e vai atualizar o valor do computed
    //isso é muito legal porque você não precisa ficar fazendo subscribe no store e atualizando o valor do computed

    //agora sem as palavras do copilot: isso aqui é muito útil para realizar pesquisas e filtros que se atualizam automaticamente. Você pode criar um computed que vai ser atualizado sempre que o estado do store mudar
    // const tarefas = computed(() =>
    //   store.state.tarefa.tarefas.filter(
    //     t => !filtro.value || t.descricao.toLowerCase().includes(filtro.value.toLowerCase())
    //   )
    // );

    //agora usando API. observa a dependencia do filtro
    const filtro = ref('')
    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    })


    return {
      // store,
      tarefas: computed(() => store.state.tarefa.tarefas),
      //sem o filtro em memória -> tarefas,
      store,
      filtro
    }
  },

});
</script>
