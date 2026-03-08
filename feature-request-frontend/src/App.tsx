import { useMemo, useState } from "react";
import { Bell, Search } from "lucide-react";

import { Input } from "./components/ui/input";
import { CreateFeatureDialog } from "./features/feature-requests/components/create-feature/create-feature-dialog";
import { FeatureList } from "./features/feature-requests/components/feature-list/feature-list";
import { FeatureStats } from "./features/feature-requests/components/feature-stats/feature-stats";
import { useFeatures } from "./features/feature-requests/hooks/use-features";
import { getUserIdentifier } from "./features/feature-requests/utils/user-identifier";

function App() {
  const userIdentifier = useMemo(() => getUserIdentifier(), []);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useFeatures(userIdentifier);
  const features = data ?? [];

  const filteredFeatures = features.filter((feature) => {
    const value = search.toLowerCase();

    return (
      feature.title.toLowerCase().includes(value) ||
      feature.description.toLowerCase().includes(value)
    );
  });

  return (
    <main className="min-h-screen bg-[#f8f8fb]" dir="rtl">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500 text-white font-bold">
              פ
            </div>
            <div className="text-sm font-semibold text-slate-900">
              Feature Requests
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <Bell className="h-4 w-4" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700 text-xs font-bold">
              ז
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="space-y-1 text-right">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              בקשות פיצ׳רים
            </h1>
            <p className="text-sm text-slate-500">
              נהל והצבע על בקשות לפיצ׳רים חדשים
            </p>
          </div>

          <CreateFeatureDialog userIdentifier={userIdentifier} />
        </div>

        <FeatureStats features={features} />

        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            className="h-11 rounded-xl border-slate-200 bg-white pr-10 text-right shadow-sm"
            placeholder="חיפוש בקשות..."
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
  );
}

export default App;
