"use client"

import HeroSection from "@/components/hero-section"
import ServiceCards from "@/components/service-cards"
import PricingTable from "@/components/pricing-table"
import ContactForm from "@/components/contact-form"
import UserSearch from "@/components/user-search"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { TabsDemo } from "@/components/tabs-demo"
import { useState, useEffect } from "react"
import { AuroraBackground } from "@/components/ui/aurora-background"


export default function Card() {
  const [year, setYear] = useState(2024)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])


  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto py-4 px-4 flex justify-between items-center">
            <div className="flex items-center gap-1">
              <a href="#">
                <span className="font-bold text-xl">House Of Marktech</span>
              </a>
            </div>
            <TabsDemo />
            <ThemeToggle />
          </div>
        </header>

        <main>
          <AuroraBackground>
            <HeroSection />
          </AuroraBackground>

          <section id="services" className="py-20 bg-muted/50">
            <ServiceCards />
          </section>

          <section id="pricing" className="py-20">
            <PricingTable />
          </section>

          <section id="users" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Our Users</h2>
              <UserSearch />
            </div>
          </section>

          <section id="contact" className="py-20">
            <ContactForm />
          </section>
        </main>

        <footer className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">House Of Marktech</h3>
                <p className="text-muted-foreground">Building the future, one pixel at a time.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-muted-foreground hover:text-primary">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="text-muted-foreground hover:text-primary">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-muted-foreground hover:text-primary">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
              <p>&copy; {year} House Of Marktech. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

