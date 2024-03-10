'use client';

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const Statuses: {label: string, value: Status}[] = [
  
    {label: "open", value:'OPEN' },
    {label: "closed", value:'CLOSED'},
    {label: "In progress", value:'IN_PROGRESSS'}
]

const IssueStatusFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
  return (
    <Select.Root defaultValue={searchParams.get('status') || ""} onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status)
          params.append('status', status);
        if (searchParams.get('orderBy'))
          params.append('orderBy', searchParams.get('orderBy')!);
        const query = params.toString()? `?${params.toString()}` : '';
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