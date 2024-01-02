import { HeadingField } from "@/components/HeadingField"
import { TextFieldFormElement } from "@/components/TextField"

export type ElementType = "Text" | "H1"

export type FormElement={
    type:ElementType,
    construct:(id:string)=>FormElementInstance,
    previewCompoennt:React.FC<{
        element:FormElementInstance
    }>,
    designerElement:{
        icon:React.ReactElement,
        label:string
    },
    formComponent:React.FC<{
        element:FormElementInstance
    }>,
    propertiesComponent:React.FC<{element:FormElementInstance}>,
}

type formElementsType={
    [key in ElementType]:FormElement
}
export type FormElementInstance={
    id:string,
    type:ElementType,
    extraAttributes?:Record<string,any>
}
export const FormElements:formElementsType={
    "Text":TextFieldFormElement,
    "H1":HeadingField
}