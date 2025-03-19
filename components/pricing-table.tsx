import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PricingTable() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for small businesses and startups",
      features: ["Up to 5 users", "10GB storage", "Basic support", "Basic analytics"],
      recommended: false,
    },
    {
      name: "Professional",
      price: "$79",
      description: "Ideal for growing businesses and teams",
      features: ["Up to 20 users", "50GB storage", "Priority support", "Advanced analytics", "Custom integrations"],
      recommended: true,
    },
    {
      name: "Enterprise",
      price: "$199",
      description: "For large organizations with complex needs",
      features: [
        "Unlimited users",
        "500GB storage",
        "24/7 dedicated support",
        "Enterprise analytics",
        "Custom integrations",
        "Dedicated account manager",
      ],
      recommended: false,
    },
  ]

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-4">Pricing Plans</h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Choose the perfect plan for your business needs. All plans include our core features.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card key={index} className={`border-border ${plan.recommended ? "ring-2 ring-primary relative" : ""}`}>
            {plan.recommended && <Badge className="absolute -top-2 right-4">Recommended</Badge>}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground"> / month</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.recommended ? "default" : "outline"}>
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

