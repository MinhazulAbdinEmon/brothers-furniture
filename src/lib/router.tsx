// Tiny dependency-free client router (History API). Enough for a handful of
// static routes — no react-router needed. Production needs an SPA fallback so
// deep links work on refresh; see vercel.json.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react"

interface RouterValue {
  path: string
  navigate: (to: string) => void
}

const RouterContext = createContext<RouterValue>({
  path: "/",
  navigate: () => {},
})

function currentPath() {
  return window.location.pathname.replace(/\/+$/, "") || "/"
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    const onPop = () => setPath(currentPath())
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  const navigate = useCallback((to: string) => {
    if (to !== currentPath()) {
      window.history.pushState({}, "", to)
      setPath(to.replace(/\/+$/, "") || "/")
    }
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  return useContext(RouterContext)
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

/** Internal link — renders a real <a href> (accessible/SEO) but navigates
 *  client-side without a full reload. */
export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter()
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e)
        // Let modified clicks / new-tab behave natively.
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey
        )
          return
        e.preventDefault()
        navigate(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
