import { BuilderContext } from '@/context/BuilderContext'
import React, { useContext } from 'react'

type Props = {}

export const useBuilder = () => {
    const context =useContext(BuilderContext)
    if(!context){
        throw new Error("Use builder not being used within builder context")
    }
    return context
}

