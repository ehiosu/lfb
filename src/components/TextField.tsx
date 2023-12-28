import React from "react";
import { CiFileOn } from "react-icons/ci";
import { ElementType, FormElement, FormElementInstance } from "@/lib/types";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { IoMdClose } from "react-icons/io";
import { useBuilder } from "@/hooks/UseBuilder";
type Props = {};
const type: ElementType = "Text";
export const TextFieldFormElement: FormElement = {
  type,
  component: (props: Props) => {
    return <div>TextField</div>;
  },
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      helperText: "A field that require's a Text Input",
      placeholder: "Value Here",
      required: true,
    },
  }),
  formComponent: FormCompoent,
  designerElement: {
    icon: <CiFileOn className="text-xl" />,
    label: "Text Field",
  },
  propertiesComponent: ({ element }) => {
    const {setSelectedElement}=useBuilder()
    return (
      <div className="text-white w-full flex flex-col space-y-2 p-1">
        <div className="flex justify-between items-center">
          <p className="text-xs">Element Properties</p> <Button variant={'ghost'} onClick={()=>{setSelectedElement(null)}}></Button>
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <Label>Label</Label>
          <Input placeholder="Field Label" onChange={(e) => {}}></Input>
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <Label>Placeholder</Label>
          <Input placeholder="Field Placeholder" onChange={(e) => {}}></Input>
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <Label>Helper Text</Label>
          <Input placeholder="Field Helper Text" onChange={(e) => {}}></Input>
        </div>
        <Button className="w-full h-8" variant={"outline"}>
          Save
        </Button>
      </div>
    );
  },
};

function FormCompoent({ element }: { element: FormElementInstance }) {
  return (
    <div className="w-full space-y-2 my-2">
      <Label>
        {element.extraAttributes?.label}
        {element.extraAttributes?.required && " * "}
      </Label>
      <Input
        placeholder={element.extraAttributes?.placeholder || "Text Field"}
      />
      {element.extraAttributes?.helperText && (
        <p className="text-[0.6275rem] pl-3 ">
          {element.extraAttributes.helperText}
        </p>
      )}
    </div>
  );
}
