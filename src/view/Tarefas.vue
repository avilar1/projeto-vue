<template>

  <Formulario @aoSalvarTarefa="adicionarTarefa" />
  <div class="lista">
    <Box v-if="listaEstaVazia">
      Você falhou e fez nada ainda hein
    </Box>
    <Tarefa v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index" />

  </div>

</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import ITarefa from '../interfaces/ITarefa';
//import IProjeto from '@/interfaces/IProjeto';

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  data() {
    return {
      tarefas: [] as ITarefa[]
    }
  },

  methods: {
    adicionarTarefa(tarefa:ITarefa) : void {
      this.tarefas.push(tarefa);
    }
  },
    computed: {
      listaEstaVazia() :boolean {
        return this.tarefas.length == 0
      }
  }

});
</script>
