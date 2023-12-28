import { zodResolver } from "@hookform/resolvers/zod";
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from './ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Toaster } from './ui/toaster';
import { toast } from './ui/use-toast';
export interface IAppProps {
}
const formSchema=z.object({
    name:z.string().min(4),
    description:z.string().optional()
})

type formSchema=z.infer<typeof formSchema>
export const App:React.FC =(props: IAppProps)=> {
    const _form =useForm<formSchema>({
        resolver:zodResolver(formSchema)
    })
    
    const onSubmit=(values:formSchema)=>{
        try{
            const validator = formSchema.safeParse(values)
            if(!validator.success){
                toast({
                    title:"Error",
                    description:'Invalid Data Submitted',
                    variant:"destructive"
                })
                return
            }
            toast({
                title:"Success",
                description:"Form Created Successfully",
                variant:"default",
                className:"border-4  border-green-300"

            })
        }
        catch(err){
            console.log(err)
            toast({
                title:"Error",
                description:'Error Submitting Form',
                variant:"destructive"
            })
        }
    }
  return (
   <section>
    <Toaster/>
    <Dialog>
    <DialogTrigger className='font-semibold hover:cursor-pointer bg-[#0c0c0c] text-white rounded-xl  py-2 px-4 hover:bg-[#0c0c0c]/90 transition-colors h-36 flex flex-col items-center justify-center gap-2'>
        <p>Create New Form</p>
    </DialogTrigger>
    <DialogContent>
      <Form  {..._form}>
      <form action="" onSubmit={_form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
        control={_form.control}
        name='name'
        render={({field})=>(
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input {...field} placeholder='Ado Bundles of joy 2023' className='placeholder:text-[0.75rem]'/>
                </FormControl>
                <FormDescription>
                    Name used to identify the form being created
                </FormDescription>
            </FormItem>
        )}
        >
        </FormField>
        <FormField
        control={_form.control}
        name="description"
        render={({field})=>(
            <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Textarea rows={4} {...field} placeholder='Bundels of Joy event held in Addo on the 22nd of December 2023' className='placeholder:text-[0.75rem]'/>
                </FormControl>
                <FormDescription>
                    Description for the form being created.
                </FormDescription>
            </FormItem>
        )}
        >
        </FormField>
    </form>
      </Form>
      <DialogFooter>
        <Button  className='w-[80%] mx-auto' disabled={_form.formState.isSubmitting} onClick={_form.handleSubmit(onSubmit)}>{!_form.formState.isSubmitting ? <span>Save</span>:<div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>}</Button>
    </DialogFooter>
    </DialogContent>
 
    </Dialog>
   </section>
  );
}
