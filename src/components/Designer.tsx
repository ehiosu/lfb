import React from 'react'
import {DragEndEvent, useDndMonitor, useDroppable} from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import { useBuilder } from '@/hooks/UseBuilder'
import { ElementType, FormElementInstance, FormElements } from '@/lib/types'
import { idGenerator } from '@/lib/idGenerator'
import { DesignerElementsWrapper } from './DesignerElementsWrapper'
type Props = {}

const Designer = (props: Props) => {
    const {addElement,elements,setElements}=useBuilder()
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
           const isDroppingOverDesignerDropArea=over?.data?.current?.isDesignerDropArea
          if(isDesignerBtnElement){
            if(isDroppingOverDesignerDropArea){
                const _element=FormElements[type as ElementType].construct(
                    idGenerator()
                    )
               console.log('New element',_element)
               addElement(elements.length,_element)
            }
            else{
                const id =over.id.toString().split('-')[0]
                const isTop=over.id.toString().split('-')[1]=='top'
                const index:number = elements.findIndex((el)=>el.id===id) +(isTop?0:1)
                const _element=FormElements[type as ElementType].construct(
                    idGenerator()
                    )
                addElement(index,_element) 
            }
            }
            else if(isDesignerElement){
                if(!isDroppingOverDesignerDropArea){
                    console.log(active)
                    console.log('dropping over object')
                    const id =active.id.toString().split('-')[0]
                    const isTop=over.id.toString().split('-')[1]=='top'
                    const _element=elements.find((el)=>el.id===id)
                    let _newElements=elements.filter((el)=>el.id!=id)
                    let index:number = _newElements.findIndex((el)=>el.id===over.id.toString().split('-')[0]) 
                    index = index + (isTop?0:1)
                    _newElements.splice(index,0,_element as FormElementInstance)
                    setElements(_newElements)
                }
            }

        },
    })
  return (
    <div className='w-full h-full flex scroll-smooth'>
        <div ref={droppable.setNodeRef} className={cn('p-6 w-full max-w-[800px] lg:w-[90%] flex flex-col m-auto rounded-xl gap-2  flex-1 overflow-y-auto bg-slate-950 border-2 border-slate-800 text-white lg:h-[95%]  ',droppable.isOver&&'ring-2 ring-purple-400')}>
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