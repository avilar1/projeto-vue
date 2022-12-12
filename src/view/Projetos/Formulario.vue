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
//import { notificacoesMixin } from '@/mixins/notificar';
import { useStore } from '@/store';
//import { ALTERA_PROJETO, ADCIONA_PROJETO } from '@/store/tipo-mutacoes';
import { defineComponent, ref } from 'vue';
import Notificador from '@/hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

// import IProjeto from '../interfaces/IProjeto';
export default defineComponent({
    name: "Formulario",
    props: {
        id: {
            type: String
        }
    },
    //mixins: [notificacoesMixin],

    // mounted() {
    //     if (this.id) {
    //         const projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.id)
    //         this.nomeDoProjeto = projeto?.nome || ''
    //     }
    // },

    // data() {
    //     return {
    //         nomeDoProjeto: '',
    //         // projetos: [] as IProjeto[]
    //     };
    // },
    methods: {
        // salvar() {

        //     if (this.id) {
        //         // this.store.commit(ALTERA_PROJETO, {
        //         //     id: this.id,
        //         //     nome: this.nomeDoProjeto
        //         this.store.dispatch(ALTERAR_PROJETO, {
        //             id: this.id,
        //             nome: this.nomeDoProjeto
        //         }).then(() => this.lidarComSucesso())

        //     } else {
        //         //this.store.commit(ADCIONA_PROJETO, this.nomeDoProjeto); -> sem o http
        //         this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
        //             .then(() => this.lidarComSucesso())
        //         //{
        //         // console.log(this.nomeDoProjeto);
        //         // const projeto: IProjeto = {
        //         //     nome: this.nomeDoProjeto,
        //         //     id: new Date().toISOString()
        //         // }
        //         // this.projetos.push(projeto);

        //         //}

        //     }

        // },
        // lidarComSucesso() {
        //     this.nomeDoProjeto = '';
        //     this.notificar(TipoNotificacao.SUCESSO, 'Projeto salvo com sucesso', 'Tudo certo, camarada, o comunismo agradece.') //via mixins
        //     this.$router.push('/projetos');
        // }

    },
    setup(props) {

        const router = useRouter();

        const store = useStore();
        const { notificar } = Notificador();

        const nomeDoProjeto = ref('');

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
            nomeDoProjeto.value = projeto?.nome || ''
        }

        const lidarComSucesso = () => {
            nomeDoProjeto.value = '';
            notificar(TipoNotificacao.SUCESSO, 'Projeto salvo com sucesso', 'Tudo certo, camarada, o comunismo agradece.') //via mixins
            router.push('/projetos');
        }

        const salvar = () => {

            if (props.id) {
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                }).then(() => lidarComSucesso())

            } else {
                 store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => lidarComSucesso())
            }

        }

        return {
            // store,
            // notificar,
            nomeDoProjeto,
            salvar
        }
    },
});


</script>

