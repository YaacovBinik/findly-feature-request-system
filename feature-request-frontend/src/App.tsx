import { useMemo } from "react"
import { FeatureList } from "./features/feature-requests/components/feature-list"
import { CreateFeatureDialog } from "./features/feature-requests/components/create-feature-dialog"
import { getUserIdentifier } from "./features/feature-requests/utils/user-identifier"

function App() {
  const userIdentifier = useMemo(() => getUserIdentifier(), [])

  return (
    <main className="min-h-screen bg-gray-50" dir="rtl">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">בקשות פיצ׳רים</h1>
          <CreateFeatureDialog userIdentifier={userIdentifier} />
        </div>

        <FeatureList userIdentifier={userIdentifier} />
      </div>
    </main>
  )
}

export default App