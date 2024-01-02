import React from 'react'
import { Dialog, DialogClose, DialogContent } from './ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Button } from './ui/button'

import { Save } from 'lucide-react'
import { CiFileOn } from 'react-icons/ci'
import { useBuilder } from '@/hooks/UseBuilder'

type Props = {}

export const SaveButton = () => {
    const {elements,formAttributes}=useBuilder()
    const jsonElements= JSON.stringify(elements)
    //save form api call

  return (
    <Dialog>
        <DialogTrigger className=''>
           <Button className='h-8 dark:text-white flex items-center gap-1 justify-center' variant={'outline'}> Save <CiFileOn className='mt-[1px] text-[0.8rem] font-semibold'/></Button>
        </DialogTrigger>
        <DialogContent>
            <p className="text-xl font-thin">Are you sure you want to save this form?</p>
            <p className="text-xs text-neutral-400">Saving this will overwrite any existing versions of this form.</p>
            {formAttributes.name===null&& <p className='text-red-400 text-xs'>Form settings haven't been inputted.</p>}
            <div className="flex h-12 items-center gap-2">
                <DialogClose className='flex-1 hover:bg-slate-200 transition-all ring-2 ring-gray-300/40 hover:ring-0 rounded-lg disabled:bg-slate-700 disabled:hover:cursor-not-allowed' disabled={formAttributes.name===null}><Button className='w-full disabled:bg-slate-400 disabled:text-black disabled:hover:cursor-not-allowed' variant={'link'} disabled={formAttributes.name===null} onClick={()=>{console.log(jsonElements)}}>Yes</Button></DialogClose> <DialogClose className='flex-1'><Button className='w-full'  variant={'destructive'}>No</Button></DialogClose>
            </div>
        </DialogContent>
    </Dialog>
  )
}