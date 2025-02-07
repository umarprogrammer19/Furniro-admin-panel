import { Github, Loader2, type LightbulbIcon as LucideProps, Moon, SunMedium, Twitter, User } from "lucide-react"

export const Icons = {
    sun: SunMedium,
    moon: Moon,
    twitter: Twitter,
    user: User,
    github: Github,
    spinner: Loader2,
    logo: (props: typeof LucideProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
    ),
}

