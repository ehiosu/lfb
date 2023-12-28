import { FormElementInstance, FormElements } from "@/lib/types";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { CiTrash } from "react-icons/ci";
import { useBuilder } from "@/hooks/UseBuilder";
import { cn } from "@/lib/utils";

type Props = {};

export const DesignerElementsWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const FormComp = FormElements[element.type].formComponent;
  const {removeElement,setSelectedElement,selectedElement}=useBuilder()
  const top = useDroppable({
    id: `${element.id}-top`,
    data: {
      isDesignerBtnElement: true,
      type: element.type,
      isTop: true,
    },
  });
  const bottom = useDroppable({
    id: `${element.id}-bottom`,
    data: {
      isDesignerBtnElement: true,
      type: element.type,
      isTop: false,
    },
  });
  const draggable=useDraggable({
    id:`${element.id}-drag-handler`,
    data:{
      type:element.type,
      elementId:element.id,
      isDesignerElement:true,
      isDesignerBtnElement:false
    }
  })
  const [mouseOver, setMouseOver] = useState(false);

  const handleRemoveElement=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.stopPropagation()
    removeElement(element.id)
  }
  if(draggable.isDragging) return null
  return (
    <div
      className={cn("w-full   relative border-2 border-neutral-100/20 rounded-lg",selectedElement===element&&'border-[3] border-white')}
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      onMouseEnter={() => {
        setMouseOver(true);
      }}
      onMouseLeave={() => {
        setMouseOver(false);
      }}
      onClick={(e)=>{e.stopPropagation() 
        setSelectedElement(element)}}
     
    >
      {mouseOver && (
        <div className="absolute z-[20] w-full h-full">
        <div className="w-full h-full bg-cyan-950/30 backdrop-blur-sm absolute top-0 left-0   ">
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 animate-pules text-[1.1rem] font-semibold -translate-y-1/2 text-white">Click to edit properties or drag to move</p>
        </div>
        <div className="absolute right-0 rounded-r-lg top-0  h-full ">
          <Button className=" h-full w-12 grid place-items-center bg-white " variant={'outline'} onClick={(e)=>{handleRemoveElement(e)}}>
            <CiTrash className='text-xl font-semibold bg-none hover:text-red-600'/>
          </Button>
          </div>
          <div>
            </div></div>
      )}
      <div
        className={`absolute h-[30%] z-[4] rounded-t-md w-full top-0 bg-slate-200/50 backdrop-blur-md left-0  ${
          top.isOver ? "opacity-100" : "opacity-0"
        }`}
        ref={top.setNodeRef}
      ></div>
      <div className="w-full relative pointer-events-none bg-cyan-700/10 p-2 rounded-md ">
        <FormComp element={element} />
      </div>
      <div
        className={`absolute h-[30%] rounded-b-md w-full bottom-0 z-[4] bg-opacity-20 bg-slate-200/50 backdrop-blur-md left-0 ${
          bottom.isOver ? "opacity-100" : "opacity-0"
        }`}
        ref={bottom.setNodeRef}
      ></div>
    </div>
  );
};
