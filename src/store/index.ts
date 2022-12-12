//import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from 'vue';
import { ADCIONA_PROJETO, ADCIONA_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_PROJETO, ALTERAR_TAREFA, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipo-acoes";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefa, tarefa } from "./modulos/tarefa";

export interface Estado {
    //projetos: IProjeto[],
    notificacoes: INotificacao[],
    tarefas: ITarefa[],
    projeto: EstadoProjeto
    tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<Estado>> = Symbol()


export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes: [],
        projeto: {
            projetos: []
        },
        tarefa: {
            tarefas: []
        }

        //projetos: [
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

        //],
        //notificacoes: [

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

        //]
    },
    mutations: {
       //antes as mutations de tarefa e projeto ficavam aqui. Agora estão em seus respectivos arquivos.
        
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000);
        },
        
    },
    actions: {
        
    },
    modules: {
       projeto,
       tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}