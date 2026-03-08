import { useMemo, useState } from "react"
import { FeatureList } from "./features/feature-requests/components/feature-list"
import { CreateFeatureDialog } from "./features/feature-requests/components/create-feature-dialog"
import { getUserIdentifier } from "./features/feature-requests/utils/user-identifier"
import { Input } from "./components/ui/input"

function App() {
  const userIdentifier = useMemo(() => getUserIdentifier(), [])
  const [search, setSearch] = useState("")

  return (
    <main className="min-h-screen bg-gray-50" dir="rtl">
      <div className="mx-auto max-w-4xl px-4 py-10">

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">בקשות פיצ׳רים</h1>

          <CreateFeatureDialog userIdentifier={userIdentifier} />
        </div>

        <div className="mb-6">
          <Input
            placeholder="חיפוש פיצ'ר..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <FeatureList
          userIdentifier={userIdentifier}
          search={search}
        />

      </div>
    </main>
  )
}

export default App