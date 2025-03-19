import { Code, BarChart3, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServiceCards() {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with the latest technologies.",
      icon: <Code className="h-12 w-12 text-primary" />,
    },
    {
      title: "Data Analytics",
      description: "Turn your data into actionable insights with our analytics solutions.",
      icon: <BarChart3 className="h-12 w-12 text-primary" />,
    },
    {
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps for iOS and Android.",
      icon: <Smartphone className="h-12 w-12 text-primary" />,
    },
  ]

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="border-border hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="mb-4">{service.icon}</div>
              <CardTitle className="text-xl">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{service.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

