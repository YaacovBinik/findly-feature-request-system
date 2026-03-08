import { FeatureList } from "./features/feature-requests/components/feature-list"

function App() {
  return (
    <main className="min-h-screen bg-gray-50" dir="rtl">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold">בקשות פיצ׳רים</h1>

        <FeatureList userIdentifier="browser123" />
      </div>
    </main>
  )
}

export default App