import React from 'react'
import ReactDOM from 'react-dom/client'
import {App as CreateForm} from './components/CreateForm'
import {FormBuilder} from '@/components/FormBuilder'
import './index.css'
import BuilderContext from '@/context/BuilderContext'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <BuilderContext>
   <FormBuilder/>
   </BuilderContext>
  </React.StrictMode>,
)
