import {  Video } from "./types"
export function useFiltersPL(){
    const filterForPL =(arrayList :Video[], nameList:string) =>{
        console.log('en el hook de filtros')
        console.log(arrayList)
        console.log(nameList)

        const filteredConten : Video[] = arrayList.filter(item => item.topyc == nameList)
        // const filteredList = {name: nameList, content: [filteredConten]}
        // console.log(filteredList)
        return filteredConten
    }

    return { filterForPL}
}