import { Badge } from "@/registry/new-york-v4/ui/badge"
import { ProDescriptions } from "@/registry/new-york-v4/pro/pro-descriptions/index"

export default function ProDescriptionsDocsDemo() {
  return (
    <div className="w-full max-w-2xl p-4">
      <ProDescriptions
        title="User profile"
        bordered
        columns={2}
        items={[
          { label: "Name", value: "Alice Wang" },
          { label: "Email", value: "alice@example.com" },
          { label: "Role", value: <Badge variant="outline">Admin</Badge> },
          { label: "Status", value: <Badge>Active</Badge> },
          { label: "Bio", value: "Frontend engineer focused on design systems.", span: 2 },
        ]}
      />
    </div>
  )
}
