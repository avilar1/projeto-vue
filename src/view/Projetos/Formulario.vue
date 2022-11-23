<template>
    <section>
        <!-- <h1 class="title">Projetos</h1> -->
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>

        </form>

    </section>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { notificacoesMixin } from '@/mixins/notificar';
import { useStore } from '@/store';
import { ALTERA_PROJETO, ADCIONA_PROJETO} from '@/store/tipo-mutacoes';
import { defineComponent } from 'vue';
import Notificador from '@/hooks/notificador';

// import IProjeto from '../interfaces/IProjeto';
export default defineComponent({
    name: "Formulario",
    props: {
        id: {
            type: String
        }
    },
    //mixins: [notificacoesMixin],

    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },

    data() {
        return {
            nomeDoProjeto: '',
            // projetos: [] as IProjeto[]
        };
    },
    methods: {
        salvar() {

            if (this.id) {
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })

            } else {
                this.store.commit(ADCIONA_PROJETO, this.nomeDoProjeto);
            }


            // console.log(this.nomeDoProjeto);
            // const projeto: IProjeto = {
            //     nome: this.nomeDoProjeto,
            //     id: new Date().toISOString()
            // }
            // this.projetos.push(projeto);
            this.nomeDoProjeto = '';
            this.notificar(TipoNotificacao.SUCESSO, 'Projeto salvo com sucesso', 'Tudo certo, camarada, o comunismo agradece.') //via mixins
            this.$router.push('/projetos');
        }
        
    },
    setup() {
        const store = useStore();
        const { notificar } = Notificador();
        return {
            store,
            notificar
        }
    },
});


</script>

