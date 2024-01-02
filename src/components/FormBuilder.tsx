import React from 'react'
import Designer from './Designer'
import DesignerSidebar from './DesignerSidebar'
import {DndContext, MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core'
import DragOverlayWrapper from './DragOverlayWrapper'
import { useBuilder } from '@/hooks/UseBuilder'
type Props = {}

export const FormBuilder:React.FC = () => {
  const {selectedElement,setSelectedElement}=useBuilder()
  const mouseSensor=useSensor(MouseSensor,{
    activationConstraint:{
      distance:10,
    }
  })
  const touchSensor=useSensor(TouchSensor,{
    activationConstraint:{
      delay:300,
      tolerance:5
    }
  })
  const sensors=useSensors(mouseSensor,touchSensor)
  return (
    <DndContext sensors={sensors}>
    <section className='flex flex-1 h-full w-full gap-2'>
        <div className="flex-1 " onClick={()=>{
          if(selectedElement) setSelectedElement(null)
        }}>
            <Designer/>
            <DragOverlayWrapper/>
        </div>
        <div className='h-full max-w-[240px] lg:w-[20%] ml-auto bg-[#0c0c0c] '>
            <DesignerSidebar/>
        </div>
    </section>
    </DndContext>
  )
}