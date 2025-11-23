import CreateSessionForm from '@/components/create-session-form'

export default function NewSessionPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Record New Session</h1>
      <CreateSessionForm />
    </div>
  )
}

