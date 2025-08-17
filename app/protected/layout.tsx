import { DeployButton } from "@/components/deploy-button"
import { EnvVarWarning } from "@/components/env-var-warning"
import { AuthButton } from "@/components/auth-button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { hasEnvVars } from "@/lib/utils"
import Link from "next/link"
import SideNav from "@/components/ui/sidenav"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-60">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>

      </div>
    </main>
  )
}
