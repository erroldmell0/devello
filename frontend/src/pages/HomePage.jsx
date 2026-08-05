import { SignInButton} from '@clerk/react'
import { Link } from 'react-router'
import {ArrowRightIcon, Bug, ZapIcon, CheckIcon, VideoIcon, Code2Icon,UsersIcon} from "lucide-react"
import ThemeSwitcher, { useTheme, getHeroForTheme } from "../components/ThemeSwitcher"

const HomePage = () => {
  const theme = useTheme();

  // Hero artwork follows the active theme's colour family.
  const heroSrc = getHeroForTheme(theme);

  return (
    <>
      <div className="bg-base-200">
        {/*Navbar*/}
        <nav className='bg-base-100 border-b-2 border-primary sticky top-0 z-50'>
          <div className='max-w-7xl mx-auto p-4 flex items-center justify-between'>

              {/* Logo */}
              <Link to={"/"} className='flex items-center gap-3'>
                <div className='size-10 bg-primary border-2 border-primary flex items-center justify-center shrink-0 brut-press'>
                  <Bug className='size-6 text-primary-content'/>
                </div>
                <div className='flex flex-col'>
                  <span className='font-mono font-bold text-xl text-primary tracking-tight uppercase'>Devello</span>
                  <span className='brut-meta text-[0.6rem] text-base-content/50 -mt-0.5'>Coding Together</span>
                </div>
              </Link>

              {/* Theme picker + Auth Button */}
              <div className='flex items-center gap-3'>
                <ThemeSwitcher />
                <SignInButton mode="modal">
                    <button className='group px-6 py-3 bg-primary border-2 border-primary text-primary-content font-mono font-bold text-sm uppercase tracking-widest brut-press flex items-center gap-2'>
                    <span>Get Started</span>
                    <ArrowRightIcon className='size-4 group-hover:translate-x-0.5 transition-transform'/>
                  </button>
                </SignInButton>
              </div>
          </div>
        </nav>

        {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <div className="brut-tag text-primary">
              <ZapIcon className="size-4" />
              Real-time Collaboration
            </div>

            <h1 className="text-5xl lg:text-7xl font-mono font-bold leading-none tracking-tighter uppercase">
              <span className="bg-primary text-primary-content px-2 inline-block">
                Code Together,
              </span>
              <br />
              <span className="text-base-content">Learn Together</span>
            </h1>

            <p className="text-lg text-base-content/70 leading-relaxed max-w-xl border-l-4 border-primary pl-4">
              The ultimate platform for collaborative coding interviews and pair programming.
              Connect face-to-face, code in real-time, and ace your technical interviews.
            </p>

            {/* FEATURE PILLS */}
            <div className="flex flex-wrap gap-3">
              <div className="brut-tag text-success">
                <CheckIcon className="size-4" />
                Live Video Chat
              </div>
              <div className="brut-tag text-success">
                <CheckIcon className="size-4" />
                Code Editor
              </div>
              <div className="brut-tag text-success">
                <CheckIcon className="size-4" />
                Multi-Language
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-5">
              <SignInButton mode="modal">
                <button className="px-7 py-4 bg-primary border-2 border-primary text-primary-content font-mono font-bold uppercase tracking-widest brut-press flex items-center gap-2">
                  Start Coding Now
                  <ArrowRightIcon className="size-5" />
                </button>
              </SignInButton>

              <button className="px-7 py-4 bg-base-100 border-2 border-primary text-primary font-mono font-bold uppercase tracking-widest brut-press flex items-center gap-2">
                <VideoIcon className="size-5" />
                Watch Demo
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 border-2 border-primary bg-base-100">
              <div className="p-4 border-r-2 border-primary">
                <div className="font-mono text-2xl font-bold text-primary">Counting</div>
                <div className="brut-meta text-base-content/50 mt-1">Active Users</div>
              </div>
              <div className="p-4 border-r-2 border-primary">
                <div className="font-mono text-2xl font-bold text-secondary">Counting</div>
                <div className="brut-meta text-base-content/50 mt-1">Sessions</div>
              </div>
              <div className="p-4">
                <div className="font-mono text-2xl font-bold text-accent">99.9%</div>
                <div className="brut-meta text-base-content/50 mt-1">Uptime</div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="brut-brackets">
            <img
              src={heroSrc}
              alt="CodeCollab Platform"
              className="w-full h-auto border-2 border-primary brut-lg"
            />
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-mono font-bold mb-4 uppercase tracking-tighter">
            Everything You Need to <span className="bg-primary text-primary-content px-2">Succeed</span>
          </h2>
          <p className="text-base text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless and productive
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-base-100 brut brut-lift">
            <div className="p-6 flex flex-col items-center text-center gap-3">
              <div className="size-16 border-2 border-primary brut-hatch flex items-center justify-center mb-2">
                <VideoIcon className="size-8 text-primary" />
              </div>
              <h3 className="font-mono font-bold text-lg uppercase brut-prompt">HD Video Call</h3>
              <p className="text-base-content/70 text-sm">
                Crystal clear video and audio for seamless communication during interviews
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-base-100 brut brut-lift">
            <div className="p-6 flex flex-col items-center text-center gap-3">
              <div className="size-16 border-2 border-primary brut-hatch flex items-center justify-center mb-2">
                <Code2Icon className="size-8 text-primary" />
              </div>
              <h3 className="font-mono font-bold text-lg uppercase brut-prompt">Live Code Editor</h3>
              <p className="text-base-content/70 text-sm">
                Collaborate in real-time with syntax highlighting and multiple language support
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-base-100 brut brut-lift">
            <div className="p-6 flex flex-col items-center text-center gap-3">
              <div className="size-16 border-2 border-primary brut-hatch flex items-center justify-center mb-2">
                <UsersIcon className="size-8 text-primary" />
              </div>
              <h3 className="font-mono font-bold text-lg uppercase brut-prompt">Easy Collaboration</h3>
              <p className="text-base-content/70 text-sm">
                Share your screen, discuss solutions, and learn from each other in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default HomePage
