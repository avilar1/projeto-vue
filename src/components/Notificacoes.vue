<template>
    <div class="notificacoes">
        <article class="message" 
        :class="contexto[notificacao.tipo]"
        v-for="notificacao in notificacoes" :key="notificacao.id">
            <div class="message-header">
                {{ notificacao.titulo }}
            </div>
            <div class="message-body">
                {{ notificacao.texto }}
            </div>
        </article>
        <!-- <article class="message is-warning">
            <div class="message-header">
                Atençãoooo!!!
            </div>
            <div class="message-body">
                Texto de notificacao
            </div>
        </article>
        <article class="message is-danger">
            <div class="message-header">
                Atençãoooo!!!
            </div>
            <div class="message-body">
                Texto de notificacao
            </div>
        </article> -->
    </div>


</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { computed } from '@vue/reactivity';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
    name: "Notificacoes",

    data() {
        return {
            contexto: {
                [TipoNotificacao.SUCESSO]: "is-success",
                [TipoNotificacao.ATENCAO]: "is-warning",
                [TipoNotificacao.FALHA]: "is-danger",
            }
        }
    },

    setup() {
        const store = useStore()
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    }

});
</script>

<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 1000;
}
</style>