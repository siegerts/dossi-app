import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const features = [
  {
    title: "Notes",
    description: "notes",
    free: "20/month",
    pro: "500/month",
    ent: "contact",
  },
  {
    title: "Pins",
    description: "pins",
    free: "10",
    pro: "1000",
    ent: "contact",
  },
  {
    title: "INV001",
    description: "Paid",
    free: "$250.00",
    pro: "Credit Card",
    ent: "contact",
  },
  {
    title: "INV001",
    description: "Paid",
    free: "$250.00",
    pro: "Credit Card",
    ent: "contact",
  },
  {
    title: "Priority Support",
    description: "",
    free: "-",
    pro: "-",
    ent: "contact",
  },
]

export function PricingTable() {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[75px]"></TableHead>
          <TableHead className="w-[75px]"></TableHead>
          <TableHead className="w-[75px]">Free</TableHead>
          <TableHead className="w-[75px]">Pro</TableHead>
          <TableHead className="w-[75px]">Enterprise</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {features.map((feature, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{feature.title}</TableCell>
            <TableCell>{feature.description}</TableCell>
            <TableCell>{feature.free}</TableCell>
            <TableCell>{feature.pro}</TableCell>
            <TableCell className="text-right">{feature.ent}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
