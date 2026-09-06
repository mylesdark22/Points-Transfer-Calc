# Points Transfer Calculator

A lightweight, client-side calculator that figures out how many credit card points you need to transfer—accounting for transfer bonuses and whole-thousand transfer limits—to reach a partner points goal for a flight, hotel, or other redemption.

All calculations run locally in your browser. Nothing is stored or sent to a server.

## Why use this?

Credit card issuers often run transfer bonuses to airline and hotel partners (for example, a 30% bonus when transferring to Delta). That bonus changes the math, and many programs only allow transfers in **1,000-point increments**.

This app answers one question: **"How many source points do I actually need to transfer?"**

### Example

You need **105,000 Delta SkyMiles** for a flight. American Express is offering a **30% transfer bonus** to Delta.

| Transfer amount | Partner points received |
|---|---|
| 80,000 Amex points | 104,000 SkyMiles — not enough |
| **81,000 Amex points** | **105,300 SkyMiles** — sufficient |

**Result:** Transfer **81,000** Amex points. You'll receive 105,300 SkyMiles (300 surplus).

## How to use

1. **Enter partner points needed** — the target balance required for your booking (e.g. `105,000`).
2. **Choose a bonus input mode:**
   - **Percentage** — enter the bonus as a percent (e.g. `30` for a 30% bonus).
   - **Conversion ratio** — enter the transfer rate shown by your issuer (e.g. `1,000` source points = `1,300` partner points).
3. **Read the result** — the app updates instantly and shows:
   - Source points you need to transfer (rounded up to the nearest 1,000)
   - Partner points you'll actually receive
   - Any surplus above your target

No submit button required. Change any input and the result recalculates immediately.

## How it works

```
rawSource       = targetPoints / multiplier
sourceNeeded    = ceil(rawSource / 1000) * 1000
pointsReceived  = sourceNeeded * multiplier
surplus         = pointsReceived - targetPoints
```

The **multiplier** is derived from your bonus input:

| Input mode | Example | Multiplier |
|---|---|---|
| Percentage | 30% bonus | 1.30 |
| Conversion ratio | 1,000 → 1,300 | 1.30 |

The whole-thousand rounding ensures the result reflects real-world transfer minimums—you can't transfer 807 points to hit an exact target.

## Running locally

No build step or dependencies required.

**Option 1 — open directly**

Open `index.html` in your browser.

**Option 2 — local server (recommended for ES modules)**

```bash
python -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

## Deployment

This project is a static site and works with GitHub Pages:

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Set source to the `master` branch, root directory.
4. Save. The site will be available at `https://<username>.github.io/Points-Transfer-Calc/`.

## Project structure

```
├── index.html          # App markup
├── css/
│   └── styles.css      # Layout and glassmorphism UI
├── js/
│   ├── calculator.js   # Transfer math (pure functions)
│   └── app.js          # UI wiring and live recalculation
└── README.md
```

## Privacy

- No analytics, tracking, or external dependencies
- No network requests — all logic runs in the browser
- Input values are never stored or transmitted

## License

This project is open source. Use and modify freely.
