import { marketingConfig } from "@/config/marketing"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

export default async function InstallPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
        </div>
      </header>
      <section className="container flex flex-col gap-6 py-8 md:max-w-[64rem] md:py-4 lg:py-10">
        <div className="mx-auto flex w-3/4 flex-col gap-4 md:max-w-[58rem]">
          <h1 className="font-heading inline-block text-2xl lg:text-2xl">
            Success! dossi has been installed 🦾!
          </h1>
          <p className="text-lg">Follow these steps to get started. </p>
          <hr className="my-4"></hr>
        </div>

        <div className="mx-auto flex w-3/4 flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-xl">Sign in to dossi</h2>
          <ol className="list-decimal list-inside">
            <li>
              Click the puzzle icon in the top right corner of your browser.
            </li>
            <li>Click the pin icon next to the Dossi extension.</li>
            <li>Click the Dossi icon to open the extension.</li>
            <li>Sign in with your GitHub account.</li>
          </ol>
        </div>
        <div className="mx-auto flex w-3/4 flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-xl">Add a note or label</h2>
          <ol className="list-decimal list-inside">
            <li>Navigate to a GitHub repo, issue, PR, or discussion page</li>
            <li>
              Click the dossi button on the page to open the extension panel.
            </li>
            <li>Add a note or label to the page.</li>
            <li>Click the save button to save your note.</li>
            <li>
              The note will be available on the page whenever you visit it.
            </li>
          </ol>

          <iframe
            style={{
              top: 0,
              left: 0,
              width: 560,
              height: 315,
            }}
            src={`https://www.youtube.com/embed/wgGGjAqa3L8`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
