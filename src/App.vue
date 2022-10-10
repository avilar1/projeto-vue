<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuroAtivo}">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="adicionarTarefa" />
      <div class="lista">

        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <Box v-if="listaEstaVazia">
          Você falhou e fez nada ainda hein
        </Box>
      </div>

    </div>
  </main>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Formulario from './components/Formulario.vue';
import Tarefa from './components/Tarefa.vue';
import Box from './components/Box.vue';
import ITarefa from './interfaces/ITarefa';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario,
    Tarefa,
    Box,
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false,
    };
  },
  computed: {
    listaEstaVazia() : boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    adicionarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
    trocarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
  }

});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #F2F2F2;
  --texto-primario: #0F0F0F;

}

main.modo-escuro {
  --bg-primario: #2B2B2B;
  --texto-primario: #FDFDFD;

}

.conteudo {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>
