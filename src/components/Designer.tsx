import React from 'react'
import {DragEndEvent, useDndMonitor, useDroppable} from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import { useBuilder } from '@/hooks/UseBuilder'
import { ElementType, FormElements } from '@/lib/types'
import { idGenerator } from '@/lib/idGenerator'
import { DesignerElementsWrapper } from './DesignerElementsWrapper'
type Props = {}

const Designer = (props: Props) => {
    const {addElement,elements}=useBuilder()
    const droppable=useDroppable({
        id:"Designer Dropzone",
        data:{
            isDesignerDropArea:true
        }
    })
    useDndMonitor({
        onDragEnd:(event:DragEndEvent)=> {
           const{active,over}=event
           if(!active || !over) return
           const isDesignerBtnElement=active?.data?.current?.isDesignerBtnElement
           const isDesignerElement=active?.data?.current?.isDesignerElement

           const type = active?.data?.current?.type
          if(isDesignerBtnElement){
            const _element=FormElements[type as ElementType].construct(
                idGenerator()
                )
           console.log('New element',_element)
           addElement(0,_element)
            }

        },
    })
  return (
    <div className='w-full h-full flex scroll-smooth'>
        <div ref={droppable.setNodeRef} className={cn('p-6 w-full max-w-[800px] lg:w-[90%] flex flex-col m-auto rounded-xl  flex-1 overflow-y-auto bg-slate-950 border-2 border-slate-800 text-white lg:h-[95%]  gap-2',droppable.isOver&&'ring-2 ring-purple-400')}>
        {
            !droppable.isOver ?elements.length==0&&    <p className="flex-grow text-2xl font-semibold text-neutral-200 flex items-center justify-center">Form Designer</p>:<></>
        }
         {
            droppable.isOver &&elements.length===0 && <div className="w-full h-24 min-h-24 bg-neutral-100/30 "></div>
        }
        {
            elements.length>0?elements.map((element)=>{
                return <DesignerElementsWrapper key={element.id} element={element}/>
            }):<></>
        }
       
       
        </div>
    </div>
  )
}

export default Designer