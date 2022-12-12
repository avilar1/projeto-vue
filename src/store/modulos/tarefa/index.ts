import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { ALTERAR_TAREFA, OBTER_TAREFAS, CADASTRAR_TAREFA } from "@/store/tipo-acoes";
import { ALTERA_TAREFA, DEFINIR_TAREFAS, ADCIONA_TAREFA } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: []
    },
    mutations: {
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(taref => taref.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADCIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
    },
    actions: {
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        },
        [OBTER_TAREFAS]({ commit }, filtro: string) {
            //http.get('tarefas')
            
            let url = 'tarefas'

            if(filtro) {
                url += '?descricao=' + filtro
            }
            
            http.get(url)
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa)
                .then(resposta => commit(ADCIONA_TAREFA, resposta.data))

        }
    }
}