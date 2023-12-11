//Importando randomUUID
import { randomUUID } from "node:crypto"
export class DatabaseMemory{
    #raquetes = new Map()
//listando raquetes sem as chaves
list(search){
    return Array.from(this.#raquetes.entries()).map((raqueteArray) => {
        const id = raqueteArray[0]

        const data = raqueteArray[1]

        return{
            id,
            ...data,
        }
    })

//resultados da pesquisa
 .filter(raquete => {
       if (search){
       return raquete.tipo.includes(search)
     }
       return true
   })
 }

    create(raquete){
        //gerando id com randomUUID
        const raqueteId = randomUUID()
        this.#raquetes.set(raqueteId, raquete)
    }
    //atualizando raquete
    update(id, raquete){
        this.#raquetes.set(id, raquete)
    }
    //deletando raquete
    delete(id){
        this.#raquetes.delete(id)
    }
}