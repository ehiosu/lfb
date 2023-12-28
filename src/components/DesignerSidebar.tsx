import { FormElement, FormElementInstance, FormElements } from "@/lib/types";
import React from "react";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { useBuilder } from "@/hooks/UseBuilder";

type Props = {};

export const DesignerSidebar = (props: Props) => {
  const {selectedElement}=useBuilder()
  return (
    <aside className="w-full h-full grid grid-cols-2 p-2 gap-2">
    {selectedElement===null? <>
     <SidebarButton element={FormElements.Text} />
      <SidebarButton element={FormElements.H1} />
     </>:<PropertyPanel element={selectedElement}/>
     
     
     }
    </aside>
  );
};

const SidebarButton = ({ element }: { element: FormElement }) => {
  const draggable = useDraggable({
    id: `designer-btn-${element.type}`,
    data: {
      type: element.type,
      isDesignerBtnElement: true,
    },
  });
  const { icon: Icon, label } = element.designerElement;
  return (
    <Button
      variant={"outline"}
      className={cn("rounded-md flex flex-col dark:text-white gap-2 h-32 cursor-grab col-span-1",draggable.isDragging&&'ring-2 ring-purple-300')}
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      {Icon}
      <p>{label}</p>
    </Button>
  );
};

export const SidebarDragOverlay = ({ element }: { element: FormElement }) => {

  const { icon: Icon, label } = element.designerElement;
  return (
    <Button
      variant={"outline"}
      className={"rounded-md flex flex-col gap-2 h-32 aspect-square cursor-grab col-span-1"}
  
    >
      {Icon}
      <p>{label}</p>
    </Button>
  );
};

const PropertyPanel=({element}:{element:FormElementInstance})=>{
  const PropertyElement=FormElements[element.type].propertiesComponent
return(
<div className="w-full h-full col-span-2">
<PropertyElement element={element}/>
</div>

)
}
export default DesignerSidebar;
