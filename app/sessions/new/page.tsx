import CreateSessionForm from '@/components/create-session-form'

export default function NewSessionPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Record New Session</h1>
      <CreateSessionForm />
    </div>
  )
}

