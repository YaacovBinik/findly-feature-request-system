import { useMemo, useState } from "react"
import { Input } from "./components/ui/input"
import { CreateFeatureDialog } from "./features/feature-requests/components/create-feature-dialog"
import { FeatureList } from "./features/feature-requests/components/feature-list"
import { FeatureStats } from "./features/feature-requests/components/feature-stats"
import { useFeatures } from "./features/feature-requests/hooks/use-features"
import { getUserIdentifier } from "./features/feature-requests/utils/user-identifier"

function App() {
  const userIdentifier = useMemo(() => getUserIdentifier(), [])
  const [search, setSearch] = useState("")

  const { data, isLoading, isError } = useFeatures(userIdentifier)

  const features = data ?? []

  const filteredFeatures = features.filter((feature) => {
    const searchValue = search.toLowerCase()

    return (
      feature.title.toLowerCase().includes(searchValue) ||
      feature.description.toLowerCase().includes(searchValue)
    )
  })

  return (
    <main className="min-h-screen bg-gray-50" dir="rtl">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">בקשות פיצ׳רים</h1>
          <CreateFeatureDialog userIdentifier={userIdentifier} />
        </div>

        <FeatureStats
          features={features}
          userIdentifier={userIdentifier}
        />

        <div className="mb-6">
          <Input
            placeholder="חיפוש פיצ'ר..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <FeatureList
          userIdentifier={userIdentifier}
          features={filteredFeatures}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </main>
  )
}

export default App