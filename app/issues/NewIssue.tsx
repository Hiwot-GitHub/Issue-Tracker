import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const NewIssue = () => {
  return (
    <div className='mb-5'><Button><Link href='/issues/new'>new issue</Link></Button></div>
  )
}

export default NewIssue;