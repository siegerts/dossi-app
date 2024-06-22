import { marketingConfig } from "@/config/marketing"
import { MainNav } from "@/components/main-nav"

export default async function UninstallPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
        </div>
      </header>
      <div>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdf2_9R4QRi-GyumnD3XYgyQ1g_a7d8Ij2Fezb29rIFCoAWnA/viewform?embedded=true"
          width="640"
          height="589">
          Loading…
        </iframe>
      </div>
    </div>
  )
}
