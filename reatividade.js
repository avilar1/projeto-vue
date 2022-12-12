const projeto = {
    id: 1,
    descricao: 'Projeto 1 Alura Tracker',
}

const proxy = new Proxy(projeto, {
    get(objsOriginal, chave) {
        console.log(`Solicitaram a chave ${chave} do projeto`)
        return objsOriginal[chave]
    },
    set(objsOriginal, chave, valor) {
        console.log(`Alteraram a chave ${chave} do projeto para o valor ${valor}`)
        objsOriginal[chave] = valor
    }
})

proxy.descricao = 'Vasco da Gama'

console.log(proxy.descricao)