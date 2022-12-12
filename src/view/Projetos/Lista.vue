<template>
    <section>
        <!-- <h1 class="title">Projetos</h1> -->
        <router-link to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>
        <!-- <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do projeto
                </label>
                <input type="text" class="input"
                v-model="nomeDoProjeto" 
                id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>

        </form> -->

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <router-link :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                                <span class="icon is-small">
                                    <i class="fas fa-trash"></i>
                                </span>
                            </button>
                        
                    </td>

                </tr>
            </tbody>

        </table>
    </section>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/tipo-acoes';
//import { EXCLUIR_PROJETO } from '@/store/tipo-mutacoes';
import { computed, defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
// import IProjeto from '../interfaces/IProjeto';
export default defineComponent({
    name: "Lista",

    // data() {
    //     return {
    //         nomeDoProjeto: '',
    //         // projetos: [] as IProjeto[]
    //     };
    // },
    // methods: {
    //     salvar() {
    //         this.store.commit('ADCIONA_PROJETO', this.nomeDoProjeto);
    //         // console.log(this.nomeDoProjeto);
    //         // const projeto: IProjeto = {
    //         //     nome: this.nomeDoProjeto,
    //         //     id: new Date().toISOString()
    //         // }
    //         // this.projetos.push(projeto);
    //         this.nomeDoProjeto = '';
    //     }
    // },
    methods: {
        excluir(id: string) {
            //this.store.commit(EXCLUIR_PROJETO, id);
            this.store.dispatch(REMOVER_PROJETO, id);
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_PROJETOS)
        return {
            // store,
            projetos: computed(() => store.state.projeto.projetos),
            store
        }
    },
});


</script>

