<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa deseja iniciar?"
                    v-model="descricao"/>

            </div>
            <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
            <div class="column">
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa"/>                

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from 'vuex';

import { key } from '@/store';
import { computed } from '@vue/reactivity';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import Notificador from '@/hooks/notificador';

export default defineComponent({
    name: 'Formulario',
    emits: ['aoSalvarTarefa'],
    components: {
        Temporizador
    },
    // data() {
    //     return {
    //         descricao: '',
    //         idProjeto: ''
    //     }
    // },
    methods: {
        // finalizarTarefa(tempoEmSegundos: number) : void {
        //     const projeto = this.projetos.find((p) => p.id == this.idProjeto);
        //     if(!projeto) {
        //         this.notificar(TipoNotificacao.FALHA, 'Ops!', 'Selecione um projeto antes de finalizar a tarefa!') //via mixins
        //         // this.store.commit(NOTIFICAR, {
        //         //     titulo: 'Ops!',
        //         //     texto: "Selecione um projeto antes de finalizar a tarefa!",
        //         //     tipo: TipoNotificacao.FALHA,
        //         // });
        //         return;
        //     }
        //     this.$emit("aoSalvarTarefa", {
        //         duracaoEmSegundos: tempoEmSegundos,
        //         descricao: this.descricao,
        //         //projeto: this.projetos,
        //         projeto: this.projetos.find(proj => proj.id == this.idProjeto)
        //     });
        //     this.descricao = '';
        // }
    },
    setup(props, {emit}) {
        const store = useStore(key);

        const descricao = ref('');
        const idProjeto = ref('');

        const projetos = computed(() => store.state.projeto.projetos)

        const finalizarTarefa = (tempoEmSegundos: number) : void =>{
            
            emit("aoSalvarTarefa", {
                duracaoEmSegundos: tempoEmSegundos,
                descricao: descricao.value,
                projeto: projetos.value.find(proj => proj.id == idProjeto.value)
            });
            descricao.value = '';
        }

        const { notificar } = Notificador();
        return {
            descricao, //mesma coisa que descricao = descricao
            idProjeto,
            projetos,
            finalizarTarefa,
            notificar
        }
    }
    }
);
</script>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>