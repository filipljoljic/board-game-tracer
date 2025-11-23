"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Trash2, Plus, Save } from 'lucide-react'

type TemplateField = {
  key: string
  label: string
  type: string // 'number' | 'boolean'
}

type TemplateFormProps = {
  gameId: string
  initialData?: {
    id: string
    name: string
    fields: string
  }
}

export default function TemplateEditor({ gameId, initialData }: TemplateFormProps) {
  const router = useRouter()
  const [name, setName] = useState(initialData?.name || '')
  const [fields, setFields] = useState<TemplateField[]>(() => {
    if (initialData?.fields) {
      try {
        return JSON.parse(initialData.fields)
      } catch {
        return []
      }
    }
    return []
  })
  const [loading, setLoading] = useState(false)

  const addField = () => {
    setFields([...fields, { key: '', label: '', type: 'number' }])
  }

  const removeField = (index: number) => {
    const newFields = [...fields]
    newFields.splice(index, 1)
    setFields(newFields)
  }

  const updateField = (index: number, updates: Partial<TemplateField>) => {
    const newFields = [...fields]
    newFields[index] = { ...newFields[index], ...updates }
    
    // Auto-generate key from label if key is empty or matches old label slug
    if (updates.label) {
      const newKey = updates.label.toLowerCase().replace(/[^a-z0-9]/g, '')
      // Only update key if it was previously empty or auto-generated
      // Ideally we keep keys stable, but for new fields it's fine.
      if (!newFields[index].key || newFields[index].key === '') {
         newFields[index].key = newKey
      }
    }
    
    setFields(newFields)
  }

  const handleSave = async () => {
    if (!name) return alert('Please enter a template name')
    
    // Validate fields
    const invalidFields = fields.some(f => !f.label || !f.key)
    if (invalidFields) {
        // Try to auto-fill missing keys one last time
        const fixedFields = fields.map(f => ({
            ...f,
            key: f.key || f.label.toLowerCase().replace(/[^a-z0-9]/g, '')
        }))
        if (fixedFields.some(f => !f.key || !f.label)) {
             return alert('All fields must have a label')
        }
        setFields(fixedFields) // State update is async, so proceed with fixedFields
    }

    setLoading(true)
    const payload = {
      gameId,
      name,
      fields: fields // API handles stringifying if needed, but let's send array, our API code expects object
    }

    const url = initialData 
      ? `/api/templates/${initialData.id}`
      : `/api/templates`
    
    const method = initialData ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        router.push(`/games/${gameId}`)
        router.refresh()
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to save')
      }
    } catch (e) {
      console.error(e)
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{initialData ? 'Edit Template' : 'Create New Template'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="name">Template Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g., Base Game, Expansion + Promos"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Scoring Fields</h3>
              <Button variant="outline" size="sm" onClick={addField}>
                <Plus className="w-4 h-4 mr-2" /> Add Field
              </Button>
            </div>

            {fields.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-4 border border-dashed rounded">
                No fields added. Click "Add Field" to start.
              </p>
            )}

            {fields.map((field, index) => (
              <div key={index} className="flex items-end gap-3 border p-3 rounded bg-slate-50 dark:bg-slate-900">
                <div className="flex-1">
                  <Label className="text-xs">Label</Label>
                  <Input 
                    value={field.label} 
                    onChange={(e) => updateField(index, { label: e.target.value })}
                    placeholder="e.g. Military Coins"
                  />
                </div>
                <div className="w-32">
                   <Label className="text-xs">Key (System)</Label>
                   <Input 
                     value={field.key} 
                     onChange={(e) => updateField(index, { key: e.target.value })}
                     placeholder="auto"
                     className="font-mono text-xs"
                   />
                </div>
                <div className="w-32">
                  <Label className="text-xs">Type</Label>
                  <Select 
                    value={field.type} 
                    onValueChange={(val) => updateField(index, { type: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="boolean">Yes/No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeField(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Template'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

