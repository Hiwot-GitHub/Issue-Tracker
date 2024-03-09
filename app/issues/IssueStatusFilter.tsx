'use client';

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import React from 'react'

const Statuses: {label: string, value: Status}[] = [
  
    {label: "open", value:'OPEN' },
    {label: "closed", value:'CLOSED'},
    {label: "In progress", value:'IN_PROGRESSS'}
]

const IssueStatusFilter = () => {
    const router = useRouter();
  return (
    <Select.Root defaultValue="" onValueChange={(status) => {
        const query =  status !== 'all'? `?status=${status}` : '';
        router.push('/issues' + query);

    }}>
        <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
            <Select.Item value='all' >All</Select.Item> 
                {Statuses.map(status => (
                    <Select.Item key={status.value} value={status.value}>{ status.label }</Select.Item>
                ))}
                
            </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter