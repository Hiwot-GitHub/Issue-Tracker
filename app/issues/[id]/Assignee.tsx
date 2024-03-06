'use client'
import React from 'react'
import { Select } from '@radix-ui/themes'

const Assignee = () => {
  return (
    <Select.Root defaultValue="Hiwot">
        <Select.Trigger />
        <Select.Content>
            <Select.Group>
                <Select.Label>UI Devs</Select.Label>
                <Select.Item value='Mosh'>Mosh</Select.Item>
                <Select.Item value='Eric'>Eric</Select.Item>
                <Select.Item value='Hiwot'>Hiwot</Select.Item>
            </Select.Group>
        </Select.Content>

    </Select.Root>
  )
}

export default Assignee