import { useBuilder } from "@/hooks/UseBuilder";
import { ElementType, FormElement, FormElementInstance } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LuHeading1 } from "react-icons/lu";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { IoMdClose } from "react-icons/io";
import { Input } from "./ui/input";
const type: ElementType = "H1";
export const HeadingField: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      text: "Heading 1",
    },
  }),
  component: () => {
    return <div>Component</div>;
  },
  designerElement: {
    icon: <LuHeading1 className="text-xl" />,
    label: "Heading",
  },
  formComponent: FormCompoent,
  propertiesComponent:PropertiesComponent
};

function FormCompoent({ element }: { element: FormElementInstance }) {
  return (
    <div className="w-full text-[1.4rem] min-h-20 flex items-center">
      <p >{element.extraAttributes?.text}</p>
    </div>
  );
}



function PropertiesComponent({ element }: { element: FormElementInstance }) {
  const { setSelectedElement, updateElement } = useBuilder();
  type propertySchemaType = z.infer<typeof propertiesSchema>;
  const propertiesSchema = z.object({
    text: z.string().min(3).max(72),
  });
  const form = useForm<propertySchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      text: element.extraAttributes?.text,
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
          name="text"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                  onBlur={() => form.handleSubmit(saveChanges)}
                />
              </FormControl>
              <FormDescription>Heading Content</FormDescription>
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
