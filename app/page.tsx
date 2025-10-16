"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { submitEmail } from "@/lib/email"
import "./reactive-background.css"
import "./paw-trail.css"
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
  Users as UsersRound,
  Star,
  Palette,
  UserPen,
  Command,
  SquareTerminal,
  Egg
} from "lucide-react"

// Reactive Background Component
const ReactiveBackground = () => {
  const [catElements, setCatElements] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    speed: number
    emoji: string
  }>>([])

  useEffect(() => {
    // Initialize floating cat elements
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      size: Math.random() * 30 + 40,
      speed: Math.random() * 0.5 + 0.2,
      emoji: ['🐱', '🙀', '😻', '😼', '😺', '😽', '😿', '🐈', '🐈‍⬛', '❤️'][Math.floor(Math.random() * 10)]
    })) 
    setCatElements(elements)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const animateElements = () => {
      setCatElements(prev => prev.map(element => {
        let newX = element.x
        let newY = element.y
        
        // Simple floating animation only
        const floatX = Math.sin(Date.now() * 0.0003 + element.id) * element.speed * 0.3
        const floatY = Math.cos(Date.now() * 0.0003 + element.id) * element.speed * 0.3
        
        newX += floatX
        newY += floatY
        
        // Keep elements within bounds with some padding
        newX = Math.max(50, Math.min(window.innerWidth - 50, newX))
        newY = Math.max(50, Math.min(window.innerHeight - 50, newY))
        
        return { ...element, x: newX, y: newY }
      }))
    }

    // Use requestAnimationFrame for smooth animation
    let animationId: number
    const animate = () => {
      animateElements()
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)
    
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Static gradient background */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      
      {/* Floating cat elements */}
      {catElements.map((element) => (
        <div
          key={element.id}
          className="absolute select-none cat-element"
          ref={(el) => {
            if (el) {
              el.style.setProperty('--cat-x', `${element.x}px`)
              el.style.setProperty('--cat-y', `${element.y}px`)
              el.style.setProperty('--cat-size', `${element.size}px`)
              el.style.setProperty('--cat-opacity', '0.4')
              el.style.setProperty('--cat-rotation', `${Math.sin(Date.now() * 0.002 + element.id) * 15}deg`)
            }
          }}
        >
          {element.emoji}
        </div>
      ))}
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5 bg-grid-pattern" />
    </div>
  )
}

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [currentGeekFeature, setCurrentGeekFeature] = useState(0)
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

  const features = [
    { icon: Shield, title: "Privacy First", desc: "End-to-end encrypted chats, nicknames until you're ready" },
    { icon: Heart, title: "Interest Matching", desc: "Connect by fandoms, languages, and passions" },
    { icon: Code, title: "Geek Features", desc: "Markdown, code snippets, and linux commands" },
    { icon: Trophy, title: "Achievements", desc: "Badges, easter eggs, and gamification" },
    { icon: Users, title: "Multiple Modes", desc: "Dating, buddies and groups" },
    { icon: MapPin, title: "IRL Events", desc: "Discover nearby geek meetups and conventions" },
  ]

  const geekFeatures = [
    {
      title: "Code in Your Conversations",
      description: "Share code snippets with syntax highlighting, use markdown for formatting, and share your GitHub repos or latest projects.",
      items: [
        { icon: Code, text: "Syntax highlighting" },
        // { icon: Terminal, text: "Linux commands integration" },
        { icon: Coffee, text: "Markdown support for rich formatting" }
      ],
      codeExample: {
        title: "match.ts",
        content: [
          { type: "comment", text: "// I met my match on cat2gether!" },
          { type: "code", text: "```javascript" },
          { type: "function", text: "const love = () => {" },
          { type: "code", text: " return \"Found through cat2gether! 💜\"" },
          { type: "function", text: "}" },
          { type: "code", text: "```" }
        ]
      }
    },
    {
      title: "Encryption & Security",
      description: "Your chats are safe, private, and only visible to you and your match. Not even our servers can read them.",
      items: [
        { icon: Lock, text: "End-to-end encryption" },
        { icon: Shield, text: "Zero-knowledge privacy" },
        { icon: UsersRound, text: "Anonymous matching" }
      ],
      codeExample: {
        title: "encryption.ts",
        content: [
          { type: "comment", text: "// Messages are encrypted by default" },
          { type: "code", text: "```bash" },
          { type: "function", text: "gpg --encrypt --recipient 'match.pub'" },
          { type: "code", text: "Message: 'Hi, wanna grab coffee? ☕'" },
          { type: "code", text: "```" }
        ]
      }
    },
    {
      title: "cat2gether Customization",
      description: "Build your own custom themes, cat2packs and customize your profile however you want.",
      items: [
        { icon: Palette, text: "Very customizable theme builder" },
        { icon: Cat, text: "Custom cat ASCII and stickers" },
        { icon: UserPen, text: "Ultimate profile customization" }
      ],
      codeExample: {
        title: "customization.ts",
        content: [
          { type: "comment", text: "// My current customization" },
          { type: "code", text: "```bash" },
          { type: "function", text: "cat2 --pack"},
          { type: "code", text: "Your current catpack is default" },
          { type: "function", text: "cat2 --pack set sleepy" },
          { type: "code", text: "Your catpack has been set to sleepy" },
          { type: "code", text: "```" }
        ]
      }
    },
    {
      title: "CLI mode & Commands",
      description: "Use cat2gether entirely from the command line with TUI and commands you're used to. Perfect for terminal lovers.",
      items: [
        { icon: Command, text: "Custom and default linux commands" },
        { icon: Cat, text: "cat2 command for controlling all of the custom features." },
        { icon: SquareTerminal, text: "Fully open-source CLI tool" }
      ],
      codeExample: {
        title: "commands.go",
        content: [
          { type: "comment", text: "// Full control with simple CLI tool" },
          { type: "code", text: "```bash" },
          { type: "function", text: "cat2 --status set online" },
          { type: "code", text: "Your status has been set to online" },
          { type: "function", text: "ls -a" },
          { type: "code", text: "List of all of your friends:" },
          { type: "code", text: "* pink-catprincess25 == Online" },
          { type: "code", text: "* blue-catking75 == Offline" },
          { type: "code", text: "* green-catqueen12 == Offline" },
          { type: "code", text: "```" }
        ]
      }
    },
    {
      title: "Achievements & Badges",
      description: "Earn badges, achievements, and unlock easter eggs as you use cat2gether.",
      items: [
        { icon: Star, text: "Earn badges for your activity" },
        { icon: Trophy, text: "Collect achievements for your progress" },
        { icon: Egg, text: "Unlock easter eggs hidden on cat2gether" }
      ],
      codeExample: {
        title: "creative.ts",
        content: [
          { type: "comment", text: "// Achievements & Badges unlocking" },
          { type: "code", text: "```bash" },
          { type: "function", text: "cat2 --achievements list" },
          { type: "code", text: "Your unlocked achievements:" },
          { type: "code", text: "1. First Message - Sent your first message" },
          { type: "code", text: "2. Social Butterfly - Added 10 friends" },
          { type: "function", text: "cat2 --badges list" },
          { type: "code", text: "Your unlocked badges:" },
          { type: "code", text: "1. Early Bird - Logged in before 8 AM" },
          { type: "code", text: "2. Night Owl - Logged in after 10 PM" },
          { type: "code", text: "```" },
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
    
    const result = await submitEmail(email, 'main');
    
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
      className="min-h-screen bg-background text-foreground relative"
      onClick={handlePageClick}
    >
      <ReactiveBackground />
      
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
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center relative">
          <div className="flex items-center gap-2">
            <Cat className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-mono">cat2gether</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Best dating app for
            <span className="text-primary block terminal-cursor font-mono">Geeks & Nerds</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Connect through interests, not appearances. Privacy-first matching with
            <span className="text-accent font-mono"> encrypted chats</span>,
            <span className="text-primary font-mono"> nerdy functions </span>and
            <span className="text-accent font-mono"> cats!</span>
          </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <div className="h-1 w-[420px]"></div>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center mb-12">
            <p className="text-muted-foreground">Get notified when we launch</p>
            <div className="flex gap-2 w-full sm:w-auto">
              <Input
              placeholder="youremail@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-mono min-w-[250px]"
              disabled={isSubmitting}
              onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
              />
              <Button 
                id="cta-button" 
                className="font-mono" 
                onClick={handleEmailSubmit}
                disabled={isSubmitting || !email.trim()}
              >
                {isSubmitting ? 'Submitting...' : 'Get Notified'}
              </Button>
            </div>
            {submitMessage && (
              <p className={`text-sm font-mono ${submitSuccess ? 'text-green-400' : 'text-red-400'}`}>
                {submitMessage}
              </p>
            )}
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <div className="h-50 w-[420px]"></div>
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Built Different</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We understand that geeks and nerds need more than swipe-right culture. Here's what makes cat2gether special.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
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

      {/* Privacy Section */}
      <section className="bg-card/50 backdrop-blur-sm py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2 mb-8">
              <Lock className="h-4 w-4 text-primary" />
              <span className="text-sm font-mono">Privacy by Design</span>
            </div>

            <h2 className="text-3xl font-bold mb-6">Your Identity, Your Choice</h2>
            <p className="text-muted-foreground mb-12 text-lg">
              No photos, no real names until you both agree. Connect through shared interests, coding languages,
              fandoms, and personality - not appearance.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Cat className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2 font-mono">Identity Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Unique generated nicknames and avatars keep you anonymous until you're ready
                </p>
              </div>

              <div className="text-center">
                <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold mb-2 font-mono">E2E Encryption</h3>
                <p className="text-sm text-muted-foreground">All chats are end-to-end encrypted for maximum privacy</p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2 font-mono">Interest Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Match by programming languages, fandoms, and shared passions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Geek Features */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Features That Get You</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Feature selection cards */}
            <div className="space-y-4">
              {geekFeatures.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGeekFeature(index)}
                  className={`group w-full text-left p-5 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer bg-black ${
                    index === currentGeekFeature
                      ? 'border-primary shadow-md ring-1 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300 ${
                      index === currentGeekFeature 
                        ? 'bg-primary text-primary-foreground shadow-lg' 
                        : 'bg-muted group-hover:bg-primary/20 group-hover:scale-110'
                    }`}>
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-mono text-base font-semibold mb-2 transition-colors ${
                        index === currentGeekFeature ? 'text-primary' : 'text-foreground group-hover:text-primary'
                      }`}>
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors">
                        {feature.description.slice(0, 90)}...
                      </p>
                    </div>
                    <div className={`flex-shrink-0 ml-2 transition-all duration-300 ${
                      index === currentGeekFeature ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                    }`}>
                      <span className="text-lg">→</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right side - Feature details */}
            <div className="space-y-8 lg:sticky lg:top-8">
              <div className="transition-all duration-500 bg-black rounded-xl p-6 border border-border">
                <h3 className="text-2xl font-bold mb-4 font-mono text-primary">
                  {geekFeatures[currentGeekFeature].title}
                </h3>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {geekFeatures[currentGeekFeature].description}
                </p>
                <div className="space-y-4">
                  {geekFeatures[currentGeekFeature].items.map((item, index) => {
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
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Cat className="h-6 w-6 text-primary" />
              <span className="font-bold font-mono">cat2gether</span>
              <Badge variant="outline" className="ml-2 font-mono text-xs">
                Beta
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="font-mono">Built with 💜 for geeks</span>
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
            <p>© 2025 cat2gether. Privacy-first dating for the geek community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
