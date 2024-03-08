'use client';

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const Statuses: {label: string, value: Status}[] = [
    {label: "open", value:'OPEN' },
    {label: "closed", value:'CLOSED'},
    {label: "In progress", value:'IN_PROGRESSS'}
]

const IssueStatusFilter = () => {
  return (
    <Select.Root>
        <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                
                {Statuses.map(status => (
                    <Select.Item key={status.value} value={status.value }>{ status.label }</Select.Item>
                ))}
                
            </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter