import { FormElementInstance } from "@/lib/types"
import { ReactNode, createContext, useState } from "react"

type builderContextType={
    elements:FormElementInstance[],
    addElement:(index:number,element:FormElementInstance)=>void,
    removeElement:(id:string)=>void,
    selectedElement:FormElementInstance|null,
    setSelectedElement:React.Dispatch<React.SetStateAction<FormElementInstance | null>>
}

export const BuilderContext=createContext<builderContextType|null>(null)

export default function BuilderProvider({children}:{children:ReactNode}){
    const [elements,setElements]=useState<FormElementInstance[]>([])
    const [selectedElement,setSelectedElement]=useState<FormElementInstance| null>(null)
    const addElement=(index:number,element:FormElementInstance)=>{
        setElements(prev=>
            {
                const _elements =[...prev]
                _elements.splice(index,0,element)
                return _elements

            })
    }
    const removeElement=(id:string)=>{
        const _newElements=elements.filter((element)=>element.id!=id)
        setElements(()=>_newElements)
    }
    return <BuilderContext.Provider value={{elements,addElement,removeElement,selectedElement,setSelectedElement

    }}>
        {children }
    </BuilderContext.Provider>
}