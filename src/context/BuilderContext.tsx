import { FormElementInstance } from "@/lib/types"
import { ReactNode, createContext, useState } from "react"

type tabOptions="preview" | "builder" 
type formState = "Settings" | null
export type formAttributes={
    name:string|undefined
    isTwoStep:boolean,
    child:string|null
}
type builderContextType={
    elements:FormElementInstance[],
    addElement:(index:number,element:FormElementInstance)=>void,
    setElements:React.Dispatch<React.SetStateAction<FormElementInstance[]>>
    removeElement:(id:string)=>void,
    selectedElement:FormElementInstance|null,
    setSelectedElement:React.Dispatch<React.SetStateAction<FormElementInstance | null>>,
    updateElement:(id:string,element:FormElementInstance)=>void,
    currentTab:tabOptions,
    setCurrentTab:React.Dispatch<React.SetStateAction<tabOptions>>,
    formState:formState,
    setFormState:React.Dispatch<React.SetStateAction<formState>>,
    formAttributes:formAttributes,
    setFormAttributes:React.Dispatch<React.SetStateAction<formAttributes>>

}

export const BuilderContext=createContext<builderContextType|null>(null)

export default function BuilderProvider({children}:{children:ReactNode}){
    const [elements,setElements]=useState<FormElementInstance[]>([])
    const [selectedElement,setSelectedElement]=useState<FormElementInstance| null>(null)
    const [currentTab,setCurrentTab]=useState<tabOptions>('builder')
    const [formState,setFormState]=useState<formState>(null)
    const [formAttributes,setFormAttributes]=useState<formAttributes>({name:undefined,isTwoStep:false,child:null})

    const addElement=(index:number,element:FormElementInstance)=>{
        setElements(prev=>
            {
                const _elements =[...prev]
                _elements.splice(index,0,element)
                return _elements

            })
    }
    const removeElement=(id:string)=>{
        if (selectedElement?.id===id)setSelectedElement(null)
        const _newElements=elements.filter((element)=>element.id!=id)
        setElements(()=>_newElements)
    }
    const updateElement=(id:string,element:FormElementInstance)=>{
        const _elements=[...elements]
        const elIndex = _elements.findIndex(el=>el.id===id)
        _elements[elIndex]=element
        setElements(()=>_elements)
    }
    return <BuilderContext.Provider value={{elements,addElement,removeElement,selectedElement,setSelectedElement,updateElement,setElements,currentTab,setCurrentTab,formState,setFormState,formAttributes,setFormAttributes

    }}>
        {children }
    </BuilderContext.Provider>
}