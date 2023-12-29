import React, { useEffect } from "react";
import { CiFileOn } from "react-icons/ci";
import { ElementType, FormElement, FormElementInstance } from "@/lib/types";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoMdClose } from "react-icons/io";
import { useBuilder } from "@/hooks/UseBuilder";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Switch } from "./ui/switch";
const type: ElementType = "Text";
export const TextFieldFormElement: FormElement = {
  type,
  component: () => {
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
  propertiesComponent: PropertiesComponent,
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

function PropertiesComponent({ element }: { element: FormElementInstance }) {
  const { setSelectedElement, updateElement } = useBuilder();
  type propertySchemaType = z.infer<typeof propertiesSchema>;
  const propertiesSchema = z.object({
    label: z.string().min(2).max(24),
    placeholder: z.string().min(3).max(50),
    required: z.boolean().default(element.extraAttributes?.required),
    helperText: z.string().optional(),
  });
  const form = useForm<propertySchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes?.label,
      placeholder: element.extraAttributes?.placeholder,
      helperText: element.extraAttributes?.helperText,
      required: element.extraAttributes?.required,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function saveChanges(values: propertySchemaType) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      },
    });
  }
  return (
    <Form {...form}>
      <form
        className="text-white w-full flex flex-col space-y-4 p-1 "
        onBlur={form.handleSubmit(saveChanges)}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex justify-between items-center">
          <p className="text-xs">Element Properties</p>{" "}
          <Button
            variant={"ghost"}
            onClick={() => {
              setSelectedElement(null);
            }}
          >
            <IoMdClose />
          </Button>
        </div>

        <FormField
          name="label"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                  onBlur={()=>form.handleSubmit(saveChanges)}
                />
              </FormControl>
              <FormDescription>Label of the Field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          name="placeholder"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                 
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                  {...field}
                  onBlur={()=>form.handleSubmit(saveChanges)}
                />
              </FormControl>
              <FormDescription>Placeholder text of the Field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          name="helperText"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                  onBlur={()=>form.handleSubmit(saveChanges)}
                />
              </FormControl>
              <FormDescription>
                Helper text to best describe what type of response is required
                for the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

<FormField
          name="required"
          control={form.control}
          render={({ field }) => (
            <FormItem className="">
             <div className="flex items-center gap-2 my-2">
             <FormLabel>Is required</FormLabel>
              <FormControl>
                <Switch defaultChecked={field.value} onCheckedChange={field.onChange}/>
              </FormControl>
             </div>
             
              <FormDescription>
               Determine if the field can be left empty or not.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <Button
          className="w-full h-8"
          onClick={() => {
            form.handleSubmit(saveChanges);
          }}
          variant={"outline"}
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
