import React from 'react'
import { Sample1 } from '../components/sample/Sample1'
import { Sample2 } from '../components/sample/Sample2'
import { Divider } from '@mui/material'

export const SamplePage = () => {
  return (
  <>
     <Sample1 />
     <Divider sx={{ my: 2 }} /> 
     <Sample2 />
  </>
  )
}
