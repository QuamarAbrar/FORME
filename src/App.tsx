import { FormEvent, useEffect, useState } from "react"

const A = "/assets"

const icons = {
  arrowDark: `${A}/0559d.svg`,
  arrowLight: `${A}/e28f1.svg`,
  arrowUp: `${A}/5e48b.svg`,
  arrowUpLarge: `${A}/5621b.svg`,
  arrowSubmit: `${A}/1ec55.svg`,
  heart: `${A}/e7781.svg`,
  search: `${A}/5c116.svg`,
  user: `${A}/bbfb2.svg`,
}

const categories = [
  ["Keyboards", "272f2.png"],
  ["Mice", "686b3.png"],
  ["Headsets", "097a9.png"],
  ["Controllers", "17bd9.png"],
  ["Desk objects", "317b8.png"],
]

const essentials = [
  {
    name: "F75 Mechanical Keyboard",
    price: "$189",
    detail: "Compact form. Uncompromised feel.",
    image: "fe651.png",
    badge: "BESTSELLER",
    swatches: ["e2331.svg", "a9449.svg", "8291f.svg"],
  },
  {
    name: "M1 Wireless Mouse",
    price: "$89",
    detail: "54 grams. Perfectly balanced.",
    image: "b083d.png",
    swatches: ["e2331.svg", "a9449.svg"],
  },
  {
    name: "H1 Studio Headset",
    price: "$229",
    detail: "Every detail. Every dimension.",
    image: "2073b.png",
    swatches: ["e2331.svg", "a9449.svg"],
  },
  {
    name: "C1 Wireless Controller",
    price: "$129",
    detail: "Instinct, in the palm of your hand.",
    image: "104a0.png",
    badge: "NEW ARRIVAL",
    swatches: ["e2331.svg", "8291f.svg"],
  },
]

const deskObjects = [
  {
    name: "D1 Desk Mat",
    price: "$49",
    detail: "A softer foundation. Merino wool felt.",
    image: "c2796.png",
    swatches: ["6c630.svg", "435b0.svg"],
  },
  {
    name: "S1 Headphone Stand",
    price: "$69",
    detail: "A place for everything. Solid aluminum.",
    image: "76524.png",
    swatches: ["fe317.svg", "07872.svg"],
  },
  {
    name: "R1 Wrist Rest",
    price: "$39",
    detail: "Comfort, without compromise. Walnut.",
    image: "0df8e.png",
    swatches: ["d5dae.svg", "e2331.svg"],
  },
]

function useReveals() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

interface IconProps {
  src: string
  alt?: string
}

function Icon({ src, alt = "" }: IconProps) {
  return <img className="icon" src={src} alt={alt} />
}

function TextLink({ children }: { children: React.ReactNode }) {
  return (
    <a className="text-link" href="#shop">
      <span>{children}</span>
      <Icon src={icons.arrowDark} />
    </a>
  )
}

function ProductCard({
  item,
  index,
}: {
  item: typeof essentials[number] | typeof deskObjects[number]
  index: number
}) {
  const [liked, setLiked] = useState(false)
  return (
    <article
      className="product-card"
      data-reveal
      style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}
    >
      <div className="product-visual image-reveal">
        <img src={`${A}/${item.image}`} alt={item.name} />
        {"badge" in item && item.badge && (
          <span className="badge">{item.badge}</span>
        )}
        <button
          className={`heart ${liked ? "liked" : ""}`}
          aria-label={`${liked ? "Remove" : "Add"} ${item.name} ${
            liked ? "from" : "to"
          } favorites`}
          onClick={() => setLiked(!liked)}
        >
          <Icon src={icons.heart} />
        </button>
      </div>
      <div className="product-details">
        <div className="product-name">
          <h3>{item.name}</h3>
          <span>{item.price}</span>
        </div>
        <p>{item.detail}</p>
        <div className="swatches">
          {item.swatches.map((swatch) => (
            <Icon key={swatch} src={`${A}/${swatch}`} />
          ))}
          <span>{item.swatches.length} finishes</span>
        </div>
      </div>
    </article>
  )
}

function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string
  title: string
  action: string
}) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <TextLink>{action}</TextLink>
    </div>
  )
}

export default function App() {
  useReveals()
  const [menuOpen, setMenuOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <main>
      <header>
        <div className="announcement">
          COMPLIMENTARY SHIPPING ON ORDERS $100+ <span>·</span> MADE FOR THE
          LONG GAME
        </div>
        <nav className="nav" aria-label="Main navigation">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
          >
            MENU
          </button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#shop">Shop all</a>
            <a href="#shop">Keyboards</a>
            <a href="#shop">Mice</a>
            <a href="#shop">Audio</a>
          </div>
          <a className="logo" href="#" aria-label="Forme home">
            FORME
          </a>
          <div className="nav-utility">
            <a href="#journal">The Journal</a>
            <button aria-label="Search">
              <Icon src={icons.search} />
            </button>
            <button aria-label="Account">
              <Icon src={icons.user} />
            </button>
            <button>Bag (0)</button>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker">
              COLLECTION 01 / THE ART OF PLAY
            </p>
            <h1>
              <span>Less noise.</span>
              <span>More play.</span>
            </h1>
            <p className="body-copy">
              Considered tools for extraordinary play. Precision in every
              detail. Nothing in excess.
            </p>
            <a className="primary-button" href="#shop">
              DISCOVER THE COLLECTION <Icon src={icons.arrowLight} />
            </a>
          </div>
          <div className="hero-products" aria-label="F75 keyboard and M1 mouse">
            <div className="hero-keyboard">
              <img
                src={`${A}/fe651.png`}
                alt="F75 mechanical keyboard in graphite"
              />
            </div>
            <div className="hero-mouse">
              <img src={`${A}/b083d.png`} alt="M1 wireless mouse in graphite" />
            </div>
          </div>
        </div>
        <div className="hero-meta">
          <div className="pagination">
            <span>01</span>
            <i />
            <i />
            <span>03</span>
          </div>
          <span>F75 KEYBOARD / GRAPHITE</span>
        </div>
      </section>

      <div className="brand-promise" data-reveal>
        Designed to perform. Made to belong.
      </div>

      <section className="category-section" id="shop">
        <p className="eyebrow" data-reveal>
          FIND YOUR FORM
        </p>
        <div className="category-grid">
          {categories.map(([name, image], index) => (
            <a
              className="category"
              href="#essentials"
              key={name}
              data-reveal
              style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
            >
              <div className="category-image image-reveal">
                <img src={`${A}/${image}`} alt={name} />
              </div>
              <span>
                {name}
                <Icon src={icons.arrowUp} />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="product-section" id="essentials">
        <SectionHeading
          eyebrow="THE ESSENTIAL COLLECTION"
          title="Exceptional by design."
          action="SHOP BESTSELLERS"
        />
        <div className="product-grid four">
          {essentials.map((item, index) => (
            <ProductCard item={item} index={index} key={item.name} />
          ))}
        </div>
      </section>

      <section className="craft-section">
        <div className="craft-image image-reveal">
          <img
            src={`${A}/51527.png`}
            alt="Close detail of the F75 mechanical keyboard"
          />
        </div>
        <div className="craft-copy" data-reveal>
          <p className="eyebrow">IN FOCUS / F75</p>
          <h2>
            A feeling,
            <br />
            not just a function.
          </h2>
          <p className="body-copy">
            The satisfying weight of aluminum. The quiet confidence of every
            keystroke. Meet the F75: a mechanical keyboard made for the moments
            that matter.
          </p>
          <div className="specs">
            <div>
              <strong>75%</strong>
              <span>Compact layout</span>
            </div>
            <div>
              <strong>
                <small>1</small> ms
              </strong>
              <span>Wireless response</span>
            </div>
            <div>
              <strong>PBT</strong>
              <span>Double-shot keys</span>
            </div>
          </div>
          <TextLink>MEET THE F75 — $189</TextLink>
        </div>
      </section>

      <section className="limited-wrap">
        <div className="limited">
          <div className="limited-copy" data-reveal>
            <p className="eyebrow">A NEW EXPRESSION / LIMITED EDITION</p>
            <h2>
              A little bold.
              <br />
              Entirely you.
            </h2>
            <p>
              Introducing Oxblood. Our signature silhouettes, in a deeper shade
              of play.
            </p>
            <TextLink>EXPLORE OXBLOOD</TextLink>
          </div>
          <div className="limited-image image-reveal">
            <img
              src={`${A}/d3398.png`}
              alt="Oxblood keyboard and controller collection"
            />
          </div>
        </div>
      </section>

      <section className="setup-section">
        <div className="setup-copy" data-reveal>
          <p className="eyebrow">SPACES FOR PLAY / NO. 01</p>
          <h2>
            Your space.
            <br />
            Your state of mind.
          </h2>
          <p className="body-copy">
            A clear desk. A quieter mind. Build a setup that brings work and
            play into balance, with objects that feel as good as they look.
          </p>
          <TextLink>SHOP THE SETUP</TextLink>
          <p className="setup-list">
            F75 Keyboard · M1 Mouse · D1 Desk Mat
            <br />
            The everyday trio, from $49
          </p>
        </div>
        <figure data-reveal>
          <div className="setup-image image-reveal">
            <img
              src={`${A}/3cccc.png`}
              alt="Considered gaming setup in a bright Copenhagen interior"
            />
          </div>
          <figcaption>
            <span>THE EVERYDAY SETUP</span>
            <span>Copenhagen, Denmark</span>
          </figcaption>
        </figure>
      </section>

      <section className="desk-section">
        <SectionHeading
          eyebrow="THE FINISHING TOUCHES"
          title="Good company for your desk."
          action="SHOP DESK OBJECTS"
        />
        <div className="product-grid three">
          {deskObjects.map((item, index) => (
            <ProductCard item={item} index={index} key={item.name} />
          ))}
        </div>
      </section>

      <section className="journal" id="journal">
        <SectionHeading
          eyebrow="THE JOURNAL"
          title="Beyond the game."
          action="ALL STORIES"
        />
        <div className="journal-grid">
          <article data-reveal>
            <div className="journal-image image-reveal">
              <img
                src={`${A}/5c9da.png`}
                alt="Hands using a compact keyboard at a desk"
              />
            </div>
            <p className="eyebrow muted">DESIGN NOTES / 5 MIN READ</p>
            <a href="#">
              <h3>The beauty of taking things away.</h3>
              <Icon src={icons.arrowUpLarge} />
            </a>
          </article>
          <article
            data-reveal
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            <div className="journal-image image-reveal">
              <img
                src={`${A}/f8327.png`}
                alt="Mechanical keyboard switches in multiple colors"
              />
            </div>
            <p className="eyebrow muted">A GUIDE TO PLAY / 4 MIN READ</p>
            <a href="#">
              <h3>Find your perfect switch.</h3>
              <Icon src={icons.arrowUpLarge} />
            </a>
          </article>
        </div>
      </section>

      <section className="benefits" aria-label="The Forme promise">
        {[
          ["b916f.svg", "Complimentary delivery", "On all orders over $100"],
          ["8b975.svg", "Time to make it yours", "30-day, easy returns"],
          ["c6a33.svg", "Built for the long game", "2-year product warranty"],
          ["3108f.svg", "People, not bots", "Thoughtful, personal support"],
        ].map(([icon, title, detail], index) => (
          <div
            data-reveal
            key={title}
            style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
          >
            <Icon src={`${A}/${icon}`} />
            <strong>{title}</strong>
            <span>{detail}</span>
          </div>
        ))}
      </section>

      <section className="newsletter">
        <div data-reveal>
          <p className="eyebrow">LET’S STAY IN GOOD COMPANY</p>
          <h2>A considered inbox.</h2>
          <p>
            New objects, design stories, and early access. Only when it matters.
          </p>
        </div>
        <form onSubmit={subscribe} data-reveal>
          <label>
            <span className="sr-only">Your email address</span>
            <input
              type="email"
              required
              placeholder={
                subscribed
                  ? "Thank you. You're on the list."
                  : "Your email address"
              }
            />
            <button type="submit" aria-label="Subscribe">
              <Icon src={icons.arrowSubmit} />
            </button>
          </label>
          <p>
            By subscribing, you agree to our Privacy Policy. Unsubscribe
            anytime.
          </p>
        </form>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-logo" href="#">
              FORME
            </a>
            <p>Play, considered.</p>
            <a href="mailto:hello@forme.tools">hello@forme.tools</a>
          </div>
          {[
            [
              "EXPLORE",
              "Keyboards",
              "Mice",
              "Headsets",
              "Controllers",
              "Desk objects",
            ],
            [
              "WE’RE HERE",
              "Contact us",
              "Shipping & returns",
              "Warranty",
              "FAQs",
              "Product support",
            ],
            [
              "FORME",
              "Our philosophy",
              "The Journal",
              "Materials & care",
              "Instagram",
              "Pinterest",
            ],
          ].map(([heading, ...links]) => (
            <div className="footer-links" key={heading}>
              <strong>{heading}</strong>
              {links.map((link) => (
                <a href="#" key={link}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-legal">
          <span>© 2026 FORME. All rights reserved.</span>
          <div>
            <a href="#">Privacy policy</a>
            <a href="#">Terms of service</a>
            <a href="#">Accessibility</a>
          </div>
          <button>UNITED STATES / USD $ ↓</button>
        </div>
      </footer>
    </main>
  )
}
