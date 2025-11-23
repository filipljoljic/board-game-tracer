"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Game = { id: string; name: string }
type Group = { id: string; name: string }
type User = { id: string; name: string }
type Template = { id: string; name: string; fields: string }

type PlayerScore = {
  userId: string
  rawScore: number
  placement: number
  pointsAwarded: number
  scoreDetails: Record<string, number>
}

export default function CreateSessionForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  
  // Data
  const [games, setGames] = useState<Game[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [groupMembers, setGroupMembers] = useState<User[]>([])
  
  // Selection
  const [selectedGroupId, setSelectedGroupId] = useState<string>('')
  const [selectedGameId, setSelectedGameId] = useState<string>('')
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('none')
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([])
  
  // Scoring
  const [playerScores, setPlayerScores] = useState<Record<string, PlayerScore>>({})
  
  // Fetch initial data
  useEffect(() => {
    fetch('/api/groups').then(res => res.json()).then(setGroups)
    fetch('/api/games').then(res => res.json()).then(setGames)
  }, [])

  // Fetch members when group changes
  useEffect(() => {
    if (selectedGroupId) {
      fetch(`/api/groups/${selectedGroupId}/members`).then(res => res.json()).then(setGroupMembers)
    }
  }, [selectedGroupId])

  // Fetch templates when game changes
  useEffect(() => {
    if (selectedGameId) {
      fetch(`/api/games/${selectedGameId}/templates`).then(res => res.json()).then(data => {
        setTemplates(data)
        if (data.length > 0) setSelectedTemplateId(data[0].id)
        else setSelectedTemplateId('none')
      })
    }
  }, [selectedGameId])

  const handleStartScoring = () => {
    // Initialize scores
    const initialScores: Record<string, PlayerScore> = {}
    selectedPlayerIds.forEach(id => {
      initialScores[id] = {
        userId: id,
        rawScore: 0,
        placement: 0,
        pointsAwarded: 0,
        scoreDetails: {}
      }
    })
    setPlayerScores(initialScores)
    setStep(2)
  }

  const calculateScores = () => {
    const players = selectedPlayerIds.map(id => ({ ...playerScores[id] }))
    
    // Sort by raw score descending
    players.sort((a, b) => b.rawScore - a.rawScore)
    
    // Assign placement and points
    const count = players.length
    players.forEach((p, index) => {
      p.placement = index + 1
      p.pointsAwarded = count - index // 5, 4, 3, 2, 1 pattern
    })
    
    // Update state
    const newScores = { ...playerScores }
    players.forEach(p => {
      newScores[p.userId] = p
    })
    setPlayerScores(newScores)
    setStep(3)
  }

  const handleSave = async () => {
    const payload = {
      groupId: selectedGroupId,
      gameId: selectedGameId,
      templateId: selectedTemplateId === 'none' ? null : selectedTemplateId,
      playedAt: new Date().toISOString(),
      players: Object.values(playerScores)
    }

    const res = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (res.ok) {
      router.push(`/groups/${selectedGroupId}`) // Redirect to leaderboard
    } else {
      alert('Failed to save session')
    }
  }

  const getTemplateFields = () => {
    if (selectedTemplateId === 'none') return []
    const temp = templates.find(t => t.id === selectedTemplateId)
    if (!temp) return []
    try {
      return JSON.parse(temp.fields) as { key: string; label: string; type: string }[]
    } catch {
      return []
    }
  }

  const updateScoreDetail = (userId: string, key: string, value: number) => {
    setPlayerScores(prev => {
      const userScore = { ...prev[userId] }
      userScore.scoreDetails = { ...userScore.scoreDetails, [key]: value }
      
      // Recalculate raw score if using template
      const fields = getTemplateFields()
      let total = 0
      fields.forEach(f => {
        total += (userScore.scoreDetails[f.key] || 0)
      })
      userScore.rawScore = total
      
      return { ...prev, [userId]: userScore }
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      {step === 1 && (
        <Card>
          <CardHeader><CardTitle>Session Setup</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Group</Label>
              <Select onValueChange={setSelectedGroupId} value={selectedGroupId}>
                <SelectTrigger><SelectValue placeholder="Select group" /></SelectTrigger>
                <SelectContent>
                  {groups.map(g => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Game</Label>
              <Select onValueChange={setSelectedGameId} value={selectedGameId}>
                <SelectTrigger><SelectValue placeholder="Select game" /></SelectTrigger>
                <SelectContent>
                  {games.map(g => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {templates.length > 0 && (
              <div>
                <Label>Template</Label>
                <Select onValueChange={setSelectedTemplateId} value={selectedTemplateId}>
                  <SelectTrigger><SelectValue placeholder="Select template" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Raw Score)</SelectItem>
                    {templates.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedGroupId && (
              <div>
                <Label>Players</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {groupMembers.map(user => (
                    <div key={user.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={user.id} 
                        checked={selectedPlayerIds.includes(user.id)}
                        onCheckedChange={(checked) => {
                          if (checked) setSelectedPlayerIds([...selectedPlayerIds, user.id])
                          else setSelectedPlayerIds(selectedPlayerIds.filter(id => id !== user.id))
                        }}
                      />
                      <label htmlFor={user.id}>{user.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              disabled={!selectedGroupId || !selectedGameId || selectedPlayerIds.length === 0}
              onClick={handleStartScoring}
            >
              Next: Enter Scores
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader><CardTitle>Enter Scores</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {selectedPlayerIds.map(userId => {
              const user = groupMembers.find(u => u.id === userId)
              const fields = getTemplateFields()
              
              return (
                <div key={userId} className="border p-4 rounded">
                  <h3 className="font-bold mb-2">{user?.name}</h3>
                  {fields.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {fields.map(f => (
                        <div key={f.key}>
                          <Label>{f.label}</Label>
                          <Input 
                            type="number" 
                            onChange={(e) => updateScoreDetail(userId, f.key, Number(e.target.value))}
                          />
                        </div>
                      ))}
                      <div className="col-span-2 mt-2 font-bold">
                        Total: {playerScores[userId]?.rawScore || 0}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Label>Raw Score</Label>
                      <Input 
                        type="number"
                        value={playerScores[userId]?.rawScore || ''}
                        onChange={(e) => setPlayerScores(prev => ({
                          ...prev,
                          [userId]: { ...prev[userId], rawScore: Number(e.target.value) }
                        }))}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={calculateScores}>Next: Review & Save</Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader><CardTitle>Review Results</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead>Raw Score</TableHead>
                  <TableHead>Placement</TableHead>
                  <TableHead>League Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.values(playerScores)
                  .sort((a, b) => a.placement - b.placement)
                  .map(score => {
                    const user = groupMembers.find(u => u.id === score.userId)
                    return (
                      <TableRow key={score.userId}>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{score.rawScore}</TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            className="w-16" 
                            value={score.placement}
                            onChange={(e) => setPlayerScores(prev => ({
                              ...prev,
                              [score.userId]: { ...prev[score.userId], placement: Number(e.target.value) }
                            }))}
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            className="w-16" 
                            value={score.pointsAwarded}
                            onChange={(e) => setPlayerScores(prev => ({
                              ...prev,
                              [score.userId]: { ...prev[score.userId], pointsAwarded: Number(e.target.value) }
                            }))}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={handleSave}>Save Session</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

