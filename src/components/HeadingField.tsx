import { ElementType, FormElement, FormElementInstance } from "@/lib/types";
import { LuHeading1 } from "react-icons/lu";
const type:ElementType='H1'
export const HeadingField:FormElement={
    type,
    construct:(id:string)=>({
        id,
        type,
        extraAttributes:{
         label:"Heading 1",
         helperText:"Giant Heading",
         placeholder:"Text Here",
         required:false
        }
         }),
    component:()=>{
        return <div>
            Component
        </div>
    },
    designerElement:{
        icon:<LuHeading1 className='text-xl'/>,
        label:"Heading"
    },
    formComponent:FormCompoent
    }

    function FormCompoent({element}:{element:FormElementInstance}){
        return(
          <div className="w-full text-[1.4rem] my-2">
            
            <p contentEditable={true}>{element.extraAttributes?.label}</p>
          </div>
        )
        }