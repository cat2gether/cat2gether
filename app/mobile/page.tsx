"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { submitEmail } from "@/lib/email"
import "../paw-trail.css"
import {
  Heart,
  Shield,
  Code,
  Users,
  MapPin,
  Trophy,
  MessageSquare,
  Github,
  Terminal,
  Cat,
  Lock,
  Sparkles,
  Coffee,
  TabletSmartphone,
  Smartphone,
  Download,
  ArrowLeft,
  Bell,
  Share2
} from "lucide-react"

export default function MobilePage() {
  const DESCRIPTION_PREVIEW_LENGTH = 90;
  const [email, setEmail] = useState("")
  const [currentMobileFeature, setCurrentMobileFeature] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [pawPrints, setPawPrints] = useState<Array<{
    id: number
    x: number
    y: number
    timestamp: number
    pawImage: string
    rotation: number
  }>>([])
  const [lastClickPos, setLastClickPos] = useState<{ x: number; y: number } | null>(null)

  const mobileFeatures = [
    { icon: Smartphone, title: "Native Mobile App", desc: "Optimized iOS & Android experience" },
    { icon: Bell, title: "Push Notifications", desc: "Get notified when your matches are online" },
    { icon: Shield, title: "Secure Messaging", desc: "End-to-end encrypted mobile chats" },
    { icon: Heart, title: "Swipe to Match", desc: "Intuitive mobile matching interface" },
    { icon: Code, title: "Mobile Code Sharing", desc: "Share code snippets on the go" },
    { icon: MapPin, title: "Location-Based", desc: "Find nearby geek events and meetups" },
  ]

  const mobileGeekFeatures = [
    {
      title: "Code on Mobile",
      description: "Share and view code snippets with syntax highlighting, perfectly formatted for mobile screens.",
      items: [
        { icon: Code, text: "Mobile-optimized syntax highlighting" },
        { icon: Terminal, text: "Touch-friendly command interface" },
        { icon: Share2, text: "Quick code sharing between devices" }
      ],
      mockup: {
        title: "Mobile Code Viewer",
        content: [
          { type: "comment", text: "// Mobile code sharing" },
          { type: "code", text: "const findLove = () => {" },
          { type: "code", text: "  return match.filter(" },
          { type: "code", text: "    geek => geek.interests" },
          { type: "code", text: "      .includes('coding')" },
          { type: "code", text: "  )[0]" },
          { type: "code", text: "}" }
        ]
      }
    },
    {
      title: "Mobile Privacy",
      description: "All the privacy features you love, optimized for mobile with biometric authentication.",
      items: [
        { icon: Lock, text: "Biometric app lock" },
        { icon: Shield, text: "Secure mobile encryption" },
        { icon: Bell, text: "Private push notifications" }
      ],
      mockup: {
        title: "Security Settings",
        content: [
          { type: "comment", text: "// Mobile security features" },
          { type: "code", text: "✓ Face ID enabled" },
          { type: "code", text: "✓ End-to-end encryption" },
          { type: "code", text: "✓ Anonymous mode: ON" },
          { type: "code", text: "✓ Private notifications" },
          { type: "code", text: "✓ Auto-lock: 5 minutes" }
        ]
      }
    },
    {
      title: "Mobile Matching",
      description: "Swipe through potential matches based on interests, not photos. Mobile-first UX design.",
      items: [
        { icon: Heart, text: "Interest-based swiping" },
        { icon: Sparkles, text: "Anonymous profile cards" },
        { icon: Users, text: "Quick compatibility scoring" }
      ],
      mockup: {
        title: "Match Interface",
        content: [
          { type: "comment", text: "// Current match preview" },
          { type: "code", text: "🐱 blue-catcoder42" },
          { type: "code", text: "Interests: React, Coffee, Cats" },
          { type: "code", text: "Languages: JavaScript, Python" },
          { type: "code", text: "Compatibility: 94%" },
          { type: "code", text: "👈 Swipe to connect" }
        ]
      }
    }
  ]

  // Handle clicks to create paw prints
  const handlePageClick = (e: React.MouseEvent) => {
    const pawImages = [1, 2, 3, 4] // Available paw print images
    const randomPaw = pawImages[Math.floor(Math.random() * pawImages.length)]
    
    // Calculate rotation based on cursor movement direction
    let rotation = 0
    if (lastClickPos) {
      const deltaX = e.pageX - lastClickPos.x
      const deltaY = e.pageY - lastClickPos.y
      // Convert movement vector to rotation angle in degrees
      rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
    }
    
    const newPaw = {
      id: Date.now() + Math.random(),
      x: e.pageX, // Use pageX/pageY for scroll-relative positioning
      y: e.pageY,
      timestamp: Date.now(),
      pawImage: `/paw_print/paw_print_${randomPaw}.png`,
      rotation: rotation
    }
    setPawPrints(prev => [...prev, newPaw])
    setLastClickPos({ x: e.pageX, y: e.pageY })
  }

  // Clean up old paw prints (15 seconds total)
  useEffect(() => {
    const cleanup = setInterval(() => {
      setPawPrints(prev => prev.filter(paw => Date.now() - paw.timestamp < 15000))
    }, 50) // Check every 50ms for smooth fade animation
    return () => clearInterval(cleanup)
  }, [])

  // No auto-rotation - user controls navigation

  const handleEmailSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitMessage("");
    
    const result = await submitEmail(email, 'mobile');
    
    setSubmitSuccess(result.success);
    setSubmitMessage(result.message);
    
    if (result.success) {
      setEmail(""); // Clear email on success
    }
    
    setIsSubmitting(false);
    
    // Clear message after 5 seconds
    setTimeout(() => {
      setSubmitMessage("");
      setSubmitSuccess(false);
    }, 5000);
  };

  return (
    <div 
      className="min-h-screen bg-background text-foreground"
      onClick={handlePageClick}
    >
      {/* Paw Print Trail */}
      {pawPrints.map((paw) => {
        const age = Date.now() - paw.timestamp
        // Stay full opacity for 13 seconds, then fast fade-out in last 2 seconds
        const opacity = age < 13000 ? 1 : Math.max(0, 1 - (age - 13000) / 2000)
        const scale = 1 // Keep constant scale, no growing animation
        
        return (
          <div
            key={paw.id}
            className="paw-print"
            ref={(el) => {
              if (el) {
                el.style.setProperty('--paw-x', `${paw.x - 24}px`) // Adjusted for image center
                el.style.setProperty('--paw-y', `${paw.y - 24}px`) // Adjusted for image center
                el.style.setProperty('--paw-opacity', opacity.toString())
                el.style.setProperty('--paw-transform', `scale(${scale}) rotate(${paw.rotation}deg)`)
              }
            }}
          >
            <img 
              src={paw.pawImage} 
              alt="Paw print" 
              draggable={false}
            />
          </div>
        )
      })}

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-mono text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Smartphone className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-mono">cat2gether</span>
            <Badge variant="outline" className="ml-2 font-mono text-xs">Mobile</Badge>
          </div>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Mobile App Icon Mockup */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-3xl shadow-2xl flex items-center justify-center">
                <Cat className="h-16 w-16 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full border-4 border-background flex items-center justify-center">
                <Smartphone className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            cat2gether
            <span className="text-primary block terminal-cursor font-mono">Mobile App</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            The complete geek dating experience in your pocket. 
            <span className="text-accent font-mono"> Native iOS & Android</span> apps with
            <span className="text-primary font-mono"> all the features</span> you love, 
            optimized for mobile.
          </p>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3 mb-8">
            <TabletSmartphone className="h-5 w-5 text-accent" />
            <span className="font-mono font-semibold text-accent">Coming to App Stores Soon</span>
          </div>

          <div className="flex flex-col gap-4 justify-center items-center mb-8">
            <p className="text-muted-foreground">Get notified when the mobile app launches</p>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Input
                placeholder="youremail@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-mono min-w-[250px]"
                disabled={isSubmitting}
                onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
              />
              <Button 
                className="font-mono" 
                onClick={handleEmailSubmit}
                disabled={isSubmitting || !email.trim()}
              >
                <Bell className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Notify Me'}
              </Button>
            </div>
            {submitMessage && (
              <p className={`text-sm font-mono ${submitSuccess ? 'text-green-400' : 'text-red-400'}`}>
                {submitMessage}
              </p>
            )}
          </div>

          {/* Store Badges Preview */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 opacity-60">
            <div className="bg-card border border-border rounded-lg px-6 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-foreground rounded-md flex items-center justify-center">
                <span className="text-background font-bold text-sm">📱</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Download on the</p>
                <p className="font-semibold font-mono">App Store</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg px-6 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">▶</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Get it on</p>
                <p className="font-semibold font-mono">Google Play</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Mobile-First Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All the features you expect from cat2gether, optimized for your smartphone with intuitive mobile UX.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {mobileFeatures.map((feature, index) => {
            const Icon = feature.icon

            return (
              <Card
                key={index}
                className="transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-primary hover:scale-105 cursor-pointer group"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="font-mono">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.desc}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Mobile Geek Features */}
      <section className="bg-card/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Mobile Features That Get You</h2>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left side - Feature selection cards */}
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono mb-6 flex items-center gap-2">
                  <span>Tap to explore mobile features ({mobileGeekFeatures.length})</span>
                  <span className="animate-pulse">📱</span>
                </div>
                {mobileGeekFeatures.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMobileFeature(index)}
                    className={`group w-full text-left p-5 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer ${
                      index === currentMobileFeature
                        ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20'
                        : 'border-border hover:border-primary/50 hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300 ${
                        index === currentMobileFeature 
                          ? 'bg-primary text-primary-foreground shadow-lg' 
                          : 'bg-muted group-hover:bg-primary/20 group-hover:scale-110'
                      }`}>
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-mono text-base font-semibold mb-2 transition-colors ${
                          index === currentMobileFeature ? 'text-primary' : 'text-foreground group-hover:text-primary'
                        }`}>
                          {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors">
                          {feature.description.slice(0, DESCRIPTION_PREVIEW_LENGTH)}...
                        </p>
                      </div>
                      <div className={`flex-shrink-0 ml-2 transition-all duration-300 ${
                        index === currentMobileFeature ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                      }`}>
                        <span className="text-lg">→</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right side - Feature details */}
              <div className="space-y-8 lg:sticky lg:top-8">
                <div className="transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-4 font-mono text-primary">
                    {mobileGeekFeatures[currentMobileFeature].title}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {mobileGeekFeatures[currentMobileFeature].description}
                  </p>
                  <div className="space-y-4">
                    {mobileGeekFeatures[currentMobileFeature].items.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <div key={index} className="flex items-center gap-3 py-2">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-mono text-sm">{item.text}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Privacy Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2 mb-8">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono">Mobile Security</span>
          </div>

          <h2 className="text-3xl font-bold mb-6">Privacy in Your Pocket</h2>
          <p className="text-muted-foreground mb-12 text-lg">
            The same privacy-first approach you love, now with mobile-specific security features like biometric locks and secure notifications.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2 font-mono">Biometric Lock</h3>
              <p className="text-sm text-muted-foreground">
                Face ID, Touch ID, or PIN protection for your conversations
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-bold mb-2 font-mono">Private Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Discreet notifications that don't reveal conversation content
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2 font-mono">Offline Mode</h3>
              <p className="text-sm text-muted-foreground">
                Read messages and browse profiles even without internet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 border-y border-border py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Mobile Dating?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the waitlist to be first in line when our mobile apps launch on iOS and Android.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Input
              placeholder="Enter your email for early access"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-mono max-w-sm"
              disabled={isSubmitting}
              onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
            />
            <Button 
              size="lg" 
              className="font-mono" 
              onClick={handleEmailSubmit}
              disabled={isSubmitting || !email.trim()}
            >
              <Download className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Join Mobile Waitlist'}
            </Button>
          </div>
          
          {submitMessage && (
            <p className={`text-sm font-mono mb-4 ${submitSuccess ? 'text-green-400' : 'text-red-400'}`}>
              {submitMessage}
            </p>
          )}
          
          <p className="text-xs text-muted-foreground font-mono">
            We'll notify you the moment our mobile app is available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Smartphone className="h-6 w-6 text-primary" />
              <span className="font-bold font-mono">cat2gether mobile</span>
              <Badge variant="outline" className="ml-2 font-mono text-xs">
                Coming Soon
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/" className="font-mono hover:text-foreground transition-colors">
                ← Back to Main Site
              </Link>
              <div className="flex items-center gap-2">
                {/* <Button variant="ghost" size="sm" className="font-mono px-2">
                  Discord
                </Button>
                <Button variant="ghost" size="sm" className="font-mono px-2">
                  Reddit
                </Button> */}
                <Link href="https://github.com/cat2gether" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm" className="font-mono px-2">
                  <Github className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground font-mono">
            <p>© 2025 cat2gether. Privacy-first mobile dating for geeks.</p>
            <p className="mt-2">Native iOS & Android apps coming soon</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
