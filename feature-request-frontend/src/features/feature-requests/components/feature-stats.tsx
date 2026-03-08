import { Card, CardContent } from "../../../components/ui/card"
import { CheckCircle2, CircleDashed, Users } from "lucide-react"
import type { Feature } from "../types/feature.types"

type FeatureStatsProps = {
  features: Feature[]
  userIdentifier: string
}

export function FeatureStats({
  features,
  userIdentifier,
}: FeatureStatsProps) {
  const totalFeatures = features.length

  const myFeatures = features.filter((feature) => feature.isOwner).length

  const votedFeatures = features.filter((feature) => feature.likedByUser).length

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardContent className="p-5">
          <div className="mb-3 flex items-center justify-between text-slate-500">
            <Users className="h-4 w-4 text-violet-500" />
            <span className="text-sm">בקשות שהצבעתי</span>
          </div>
          <div className="text-4xl font-bold text-slate-900">{votedFeatures}</div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardContent className="p-5">
          <div className="mb-3 flex items-center justify-between text-slate-500">
            <CircleDashed className="h-4 w-4 text-violet-500" />
            <span className="text-sm">בקשות שלי</span>
          </div>
          <div className="text-4xl font-bold text-slate-900">{myFeatures}</div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-violet-400 shadow-sm">
        <CardContent className="p-5">
          <div className="mb-3 flex items-center justify-between text-slate-500">
            <CheckCircle2 className="h-4 w-4 text-violet-500" />
            <span className="text-sm">סה״כ בקשות</span>
          </div>
          <div className="text-4xl font-bold text-slate-900">{totalFeatures}</div>
          <div className="mt-3 text-sm font-medium text-emerald-600">
            מערכת פעילה
          </div>
        </CardContent>
      </Card>
    </div>
  )
}