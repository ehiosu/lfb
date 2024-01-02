import { FormElement, FormElementInstance, FormElements } from "@/lib/types";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { useBuilder } from "@/hooks/UseBuilder";
import { z } from "zod";
import {  ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import {AiOutlineClose} from 'react-icons/ai'
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput } from "./ui/command";

type Props = {};


export const DesignerSidebar = (props: Props) => {
  const { selectedElement, formState, } = useBuilder();

  return (
    <aside className="w-full h-full grid grid-cols-2 p-2 gap-2 ">
      {formState !== null ? (
        <FormSettings />
      ) : selectedElement === null ? (
        <>
          <SidebarButton element={FormElements.Text} />
          <SidebarButton element={FormElements.H1} />
        </>
      ) : (
        <PropertyPanel element={selectedElement} />
      )}
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
      className={cn(
        "rounded-md flex flex-col dark:text-white gap-2 h-32 cursor-grab col-span-1",
        draggable.isDragging && "ring-2 ring-purple-300"
      )}
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
      className={
        "rounded-md flex flex-col gap-2 h-32 aspect-square cursor-grab col-span-1"
      }
    >
      {Icon}
      <p>{label}</p>
    </Button>
  );
};

const PropertyPanel = ({ element }: { element: FormElementInstance }) => {
  const PropertyElement = FormElements[element.type].propertiesComponent;
  return (
    <div className="w-full h-full col-span-2">
      <PropertyElement element={element} />
    </div>
  );
};
export default DesignerSidebar;

const FormSettings = () => {
  type formSchemaType = z.infer<typeof formSchema>;
  const {setFormAttributes,setFormState,formAttributes}=useBuilder()
  const formSchema = z.object({
    name: z.string().min(5).max(50),
    isTwoPart: z.boolean().default(false),
  });
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name:formAttributes.name,
      isTwoPart:formAttributes.isTwoStep
    }
  });
  const [child,setChild]=useState("")
  const [showSearch,setShowSearch]=useState(formAttributes.isTwoStep)
  const submit=(values:formSchemaType)=>{
    setFormAttributes({name:values.name,isTwoStep:values.isTwoPart,child})
    setFormState(null)
  }
  const toggleOnChange=(e:boolean,field:ControllerRenderProps<{
    name: string;
    isTwoPart: boolean;
}, "isTwoPart">)=>{
  field.onChange(e)
  setShowSearch(e)
  }
  return (
    <div className="h-full w-full col-span-2 flex flex-col">
      <AiOutlineClose className='ml-auto dark:text-white' onClick={()=>{setFormState(null)}}/>
      <Form {...form}>
        <form>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white">Form name</FormLabel>
                <FormControl>
                  <Input placeholder="Bundles of joy 2023..." {...field} className="dark:text-white" />
                </FormControl>{" "}
                <FormMessage/>
              </FormItem>
            )}

          ></FormField>
          <FormField name="isTwoPart" control={form.control} render={({field})=>(
            <FormItem className="my-2 flex flex-col mt-3 gap-2">
              <FormLabel className="dark:text-white">Is Multipart Form</FormLabel>
              <FormControl>
                <Switch defaultChecked={formAttributes.isTwoStep} onCheckedChange={(e)=>{toggleOnChange(e,field)}}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}>
          </FormField>
        </form>
      </Form>
      {
        showSearch&& <SearchBox child={child} setChild={setChild}/>
      }

      <Button className="w-full dark:text-white" variant={'outline'} onClick={
        form.handleSubmit(submit)}>Save</Button>
    </div>
  );
};


const SearchBox=({child,setChild}:{child:string,setChild:React.Dispatch<React.SetStateAction<string>>})=>{
  const [open,setOpen]=useState(false)
  return(
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={'outline'} role="combobox" aria-expanded={open} className="dark:text-white">{child|| "Search for Forms"}</Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[240xp] lg:w-48 bg-slate-950">
        <Command className="bg-transparent text-xs dark:text-white text-white outline-none w-full p-0">
          <CommandInput className="bg-transparent text-xs dark:text-white" onValueChange={(value)=>{
            console.log(value)}
            //implement searching logic
            }></CommandInput>
          <CommandEmpty>Form not found</CommandEmpty>
          <CommandGroup>

          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}