import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Icons } from "@/components/icons"

const features = [
  {
    title: "Browser Extension",
    description: "Integrate seamlessly with your web browser for easy access.",
    free: (
      <div className="inline-flex items-center inline justify-center bg-gray-200 px-2 py-1 rounded-full text-gray-800 font-medium">
        <Icons.check className="mr-2 h-4 w-4" />
        <span>Included</span>
      </div>
    ),
    pro: (
      <div className="inline-flex items-center inline justify-center bg-gray-200 px-2 py-1 rounded-full text-gray-800 font-medium">
        <Icons.check className="mr-2 h-4 w-4" />
        <span>Included</span>
      </div>
    ),
  },
  {
    title: "Web Dashboard",
    description: "Manage your notes, labels, and pins in a centralized space.",
    free: (
      <div className="inline-flex items-center inline justify-center bg-gray-200 px-2 py-1 rounded-full text-gray-800 font-medium">
        <Icons.check className="mr-2 h-4 w-4" />
        <span>Included</span>
      </div>
    ),
    pro: (
      <div className="inline-flex items-center inline justify-center bg-gray-200 px-2 py-1 rounded-full text-gray-800 font-medium">
        <Icons.check className="mr-2 h-4 w-4" />
        <span>Included</span>
      </div>
    ),
  },
  {
    title: "Downloadable Notes",
    description: "Download your notes in CSV or JSON format.",
    free: (
      <div className="inline-flex items-center inline justify-center bg-gray-200 px-2 py-1 rounded-full text-gray-800 font-medium">
        <Icons.check className="mr-2 h-4 w-4" />
        <span>Included</span>
      </div>
    ),
    pro: (
      <div className="inline-flex items-center inline justify-center bg-gray-200 px-2 py-1 rounded-full text-gray-800 font-medium">
        <Icons.check className="mr-2 h-4 w-4" />
        <span>Included</span>
      </div>
    ),
  },
  {
    title: "Bring your own OpenAI API key",
    description:
      "Use your own OpenAI API key and custom prompts for AI-powered features.",
    free: (
      <div className="inline-flex items-center inline justify-center bg-gray-200 px-2 py-1 rounded-full text-gray-800 font-medium">
        <Icons.check className="mr-2 h-4 w-4" />
        <span>Included</span>
      </div>
    ),
    pro: (
      <div className="inline-flex items-center inline justify-center bg-gray-200 px-2 py-1 rounded-full text-gray-800 font-medium">
        <Icons.check className="mr-2 h-4 w-4" />
        <span>Included</span>
      </div>
    ),
  },
  {
    title: "Notes",
    description: "Create and keep track of your thoughts, ideas, and tasks.",
    free: "25",
    pro: (
      <div className="flex items-center justify-center">
        <span className="bg-green-200 px-2 py-1 rounded-full text-green-800 font-medium">
          Unlimited
        </span>
      </div>
    ),
  },
  {
    title: "Labels",
    description: "Organize your notes effectively with custom labels.",
    free: "3",
    pro: (
      <div className="flex items-center justify-center">
        <span className="bg-green-200 px-2 py-1 rounded-full text-green-800 font-medium">
          Unlimited
        </span>
      </div>
    ),
  },
  {
    title: "Pins",
    description: "Highlight and access your important notes quickly with pins.",
    free: "10",
    pro: (
      <div className="flex items-center justify-center">
        <span className="bg-green-200 px-2 py-1 rounded-full text-green-800 font-medium">
          Unlimited
        </span>
      </div>
    ),
  },
]

export function PricingTable() {
  return (
    <>
      <h2 className="text-4xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-4xl lg:text-4xl">
        Features
      </h2>
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
          No credit card required for Free plan.
        </p>
      </div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[75px]">Feature</TableHead>
            <TableHead className="w-[200px]">Description</TableHead>
            <TableHead className="w-[75px] text-center">Free</TableHead>
            <TableHead className="w-[75px] text-center">Pro</TableHead>
            {/* <TableHead className="w-[75px]">Enterprise</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{feature.title}</TableCell>
              <TableCell>{feature.description}</TableCell>
              <TableCell className="items-center text-center">
                {feature.free}
              </TableCell>
              <TableCell className="justify-center text-center">
                {feature.pro}
              </TableCell>
              {/* <TableCell className="text-right">{feature.ent}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
