import { FormElements,ElementType } from '@/lib/types'
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, {  useState } from 'react'
import { SidebarDragOverlay } from './DesignerSidebar'
import { useBuilder } from '@/hooks/UseBuilder'

type Props = {}

const DragOverlayWrapper = (props: Props) => {
    const [draggedNode,setDraggedNode]=useState<Active|null>(null)
    const {elements}=useBuilder()
     useDndMonitor({
        onDragStart:(event)=> {
            setDraggedNode(event.active)
        },
        onDragCancel:(event)=> {
            setDraggedNode(null)
        },
        onDragEnd:(event)=> {
            setDraggedNode(null)
        },
     })
     const isSidebarButton=draggedNode?.data.current?.isDesignerBtnElement
     const isDesignerElement=draggedNode?.data.current?.isDesignerElement

     let node=<div className='text-white'>No Drag Overlay</div>
     if(isSidebarButton){
        const type=draggedNode?.data.current?.type as ElementType
        node=<SidebarDragOverlay element={FormElements[type]}/>
     }
     if(isDesignerElement){
        const elementId=draggedNode?.data?.current?.elementId
        const element=elements.find((el)=>el.id==elementId)
        if(!element){
            node = <div>Element not found</div>
        }
        else{
            const BuilderElement=FormElements[element.type].formComponent
            node = <div className='bg-cyan-950 py-3 border-2 border-neutral-200 rounded-lg px-3 text-white pointer-events-none'><BuilderElement element={element}/></div>
        }

     }
  return (
   <DragOverlay>{node}</DragOverlay>
  )
}

export default DragOverlayWrapper