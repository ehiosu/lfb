import React from 'react'
import ReactDOM from 'react-dom/client'
import {App as CreateForm} from './components/CreateForm'
import {FormBuilder} from '@/components/FormBuilder'
import './index.css'
import BuilderContext from '@/context/BuilderContext'
import { App } from './App'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <BuilderContext>
    <App/>
   </BuilderContext>
  </React.StrictMode>,
)
