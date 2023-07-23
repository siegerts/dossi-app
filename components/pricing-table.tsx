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
      <div className="flex items-center justify-center">
        <Icons.check className="mr-2 h-4 w-4" /> <span>Included</span>
      </div>
    ),
    pro: (
      <div className="flex items-center justify-center">
        <Icons.check className="mr-2 h-4 w-4" /> <span>Included</span>
      </div>
    ),
  },
  {
    title: "Web Dashboard",
    description: "Manage your notes, labels, and pins in a centralized space.",
    free: (
      <div className="flex items-center justify-center">
        <Icons.check className="mr-2 h-4 w-4" /> <span>Included</span>
      </div>
    ),
    pro: (
      <div className="flex items-center justify-center">
        <Icons.check className="mr-2 h-4 w-4" /> <span>Included</span>
      </div>
    ),
  },
  {
    title: "Downloadable Notes",
    description: "",
    free: (
      <div className="flex items-center justify-center">
        <Icons.check className="mr-2 h-4 w-4" /> <span>Included</span>
      </div>
    ),
    pro: (
      <div className="flex items-center justify-center">
        <Icons.check className="mr-2 h-4 w-4" /> <span>Included</span>
      </div>
    ),
  },
  {
    title: "Notes",
    description: "Create and keep track of your thoughts, ideas, and tasks.",
    free: "25",
    pro: "Unlimited",
  },
  {
    title: "Labels",
    description: "Organize your notes effectively with custom labels.",
    free: "3",
    pro: "Unlimited",
  },
  {
    title: "Pins",
    description: "Highlight and access your important notes quickly with pins.",
    free: "10",
    pro: "Unlimited",
  },
]

export function PricingTable() {
  return (
    <>
      <h2 className="text-4xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-4xl lg:text-4xl">
        Features
      </h2>
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
