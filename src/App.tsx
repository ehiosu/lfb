import React from 'react'
import { FormBuilder } from './components/FormBuilder'
import { useBuilder } from './hooks/UseBuilder'
import { Button } from './components/ui/button'
import { cn } from './lib/utils'
import { CiPen, CiSettings } from 'react-icons/ci'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from './components/ui/dialog'
import { Separator } from './components/ui/separator'
import { FormElements } from './lib/types'
import { SaveButton } from './components/SaveButton'

type Props = {}

export const App = (props: Props) => {
  document.title='LLuvia form Builder'
  const {currentTab,setCurrentTab,elements,setFormState}=useBuilder()
  return (
   <main className='w-full flex gap-2 bg-slate-600/80 bg-[url(/graph-paper.svg)]  p-2 flex-col h-screen'>
    <div className="w-full  bg-[#0c0c0c] p-2 rounded-md flex flex-col">
      <div className="flex justify-between items-center">
        <p className='text-[1.6rem] text-white font-bold'>Form Builder</p>
       <div className="flex items-center gap-2">
        <Button variant={'outline'} className={cn('dark:text-white text-xs h-8',currentTab=="builder"&&'dark:bg-slate-600',' flex items-center justify-center gap-2')} onClick={()=>{setCurrentTab('builder')}}>Edit Form <CiPen className='text-white text-[0.9rem] mt-[1px]'/></Button>
        <PreviewForm/>
        <SaveButton/>
        <Button className='flex items-center justify-center gap-1 dark:text-white' variant={'outline'} onClick={()=>{setFormState('Settings')}}>Settings <CiSettings className='mt-[1px] text-[0.8rem]'/></Button>
       <span className='w-6  aspect-square rounded-full inline bg-white '></span>
       </div>
      </div>
    </div>
    {
      currentTab==='builder'&&<FormBuilder/>
    }

   </main>
  )
}


const PreviewForm=()=>{
  const {elements,currentTab}=useBuilder()
  return(
    <Dialog>
          <DialogTrigger>
          <Button variant={'outline'} className={cn('dark:text-white text-xs h-8',currentTab=="preview"&&'dark:bg-slate-600')} >Preview</Button>
          </DialogTrigger>
          <DialogContent className='w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow gap-0 p-0 bg-[#0c0c0c]  text-white'>
            <DialogHeader className='dark:text-white text-[1.5rem]  font-semibold px-4'>Form Preview</DialogHeader>
            <DialogClose className='dark:text-white px-4'/>
            <Separator className='mt-2 bg-neutral-50/40'/>
            <p className=' px-4 text-xs text-neutral-100/80 my-2'>Here's a preview of the form you're creating!</p>
            <div className="flex-1 bg-slate-600 bg-[url(/graph-paper.svg)] p-2">
              <div className="max-w-[620px] flex flex-col gap-3 flex-grow bg-[#0c0c0c] m-auto h-full  w-full rounded-xl overflow-y-auto p-2">
                {elements.length>0 &&
                  elements.map((element)=>{
                    const PreviewComp = FormElements[element.type].previewCompoennt
                    return <PreviewComp key={element.id} element={element}/>
                  })
                }
                {
                  elements.length==0 && <p className="m-auto text-[2rem] text-white font-semibold">No Form Elements</p>
                }
              </div>
            </div>
          </DialogContent>
        </Dialog>
  )
}
