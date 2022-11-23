import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from 'vue';
import { ADCIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()


export const store = createStore<Estado>({
    state: {
        projetos: [
            // {
            //     id: new Date().toISOString(),
            //     nome: "TypeScript"
            // },
            // {
            //     id: new Date().toISOString(),
            //     nome: "Vue"
            // },
            // {
            //     id: new Date().toISOString(),
            //     nome: "Vuex"
            // },

        ],
        notificacoes: [

            //    {
            //     id: 1,
            //     texto: "Notificacao de sucesso",
            //     titulo: "Sucesso",
            //     tipo: TipoNotificacao.SUCESSO
            // },{
            //     id: 2,
            //     texto: "Notificacao de Atencao",
            //     titulo: "Atencao",
            //     tipo: TipoNotificacao.ATENCAO
            // },{
            //     id: 3,
            //     texto: "Notificacao de falha",
            //     titulo: "falha",
            //     tipo: TipoNotificacao.FALHA
            // },

        ]
    },
    mutations: {
        [ADCIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto

            state.projetos.push(projeto)

        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id !== id)
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(not => not.id != novaNotificacao.id)
            }, 3000);
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}