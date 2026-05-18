# 🌿 Tapovana Live Plot Availability

A premium, responsive web application for real-time farmland plot availability — built with Next.js, React, and Tailwind CSS, powered by Google Sheets as a live backend database.

![Tapovana Screenshot](https://via.placeholder.com/1200x600/193319/f5f0e8?text=Tapovana+Live+Plot+Availability)

---

## ✨ Features

- **Live Google Sheets backend** — data syncs every 60 seconds automatically
- **No database required** — Google Sheet IS the database
- **Premium UI** — earthy green Malnad-inspired aesthetic with Cormorant Garamond + DM Sans
- **Real-time statistics** — Total, Available, Booked, Reserved counts
- **Smart filtering** — Filter by status + full-text search
- **WhatsApp enquiry** — One-tap enquiry with pre-filled message
- **Fully responsive** — Desktop table view + mobile card view
- **Deploy-ready** — Optimized for Vercel with one click

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (Pages Router) |
| UI | React 18 |
| Styling | Tailwind CSS 3 |
| Data | Google Sheets (CSV/gviz) |
| Fonts | Cormorant Garamond + DM Sans (Google Fonts) |
| Deploy | Vercel |

---

## 📋 Google Sheets Setup

### Step 1: Prepare Your Sheet

Your Google Sheet should have columns like these (exact names from your sheet are preserved):

| Plot No | Plot Name | Area (Sq.Ft) | Area (Acres) | Price/Sq.Ft | Total Price | Status |
|---------|-----------|--------------|--------------|-------------|-------------|--------|
| P-001   | Vrindavan | 2400         | 0.055        | ₹850        | ₹20,40,000  | Available |
| P-002   | Nandavan  | 3200         | 0.073        | ₹850        | ₹27,20,000  | Booked |

> **Note:** The app reads ALL columns from your sheet automatically.
> Only `Status` needs to contain one of: `Available`, `Booked`, or `Reserved`.

### Step 2: Share the Sheet

1. Open your Google Sheet
2. Click **Share** (top right)
3. Change access to **"Anyone with the link"** → **Viewer**
4. Click **Done**

### Step 3: Get the CSV URL

**Option A — gviz endpoint (recommended, auto-updates):**

```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:csv&sheet=Sheet1
```

Replace:
- `YOUR_SHEET_ID` with your sheet's ID (found in the URL between `/d/` and `/edit`)
- `Sheet1` with your tab name if different

**Option B — Publish to web (alternative):**

1. File → **Share** → **Publish to web**
2. Select **"Entire Document"** → **"Comma-separated values (.csv)"**
3. Click **Publish** and copy the URL

### Step 4: Configure the App

Edit `lib/fetchSheets.js`:

```js
const SHEET_ID = "YOUR_SHEET_ID_HERE";
const SHEET_NAME = "Sheet1"; // Your tab name
```

Or set an environment variable (see below).

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Clone / extract the project
cd tapovana-plot-availability

# Install dependencies
npm install

# Copy env example
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Environment Variables

Create `.env.local`:

```env
# Optional: Override the Google Sheets CSV URL
NEXT_PUBLIC_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/YOUR_ID/gviz/tq?tqx=out:csv&sheet=Sheet1

# Optional: WhatsApp number for enquiries (international format, no + or spaces)
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

---

## 📦 Deployment to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual steps

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/tapovana
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click **"Add New Project"**
   - Import your GitHub repo
   - Framework: **Next.js** (auto-detected)

3. **Set Environment Variables** (in Vercel dashboard):
   - `NEXT_PUBLIC_SHEET_CSV_URL` → your Google Sheets CSV URL
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` → your WhatsApp number (optional)

4. **Deploy** — Vercel builds and deploys automatically

5. **Domain** — Add a custom domain in Vercel settings if needed

---

## 📁 Project Structure

```
tapovana-plot-availability/
├── components/
│   ├── Header.jsx          # Hero header with live badge
│   ├── StatsCards.jsx      # Dynamic stat summary cards
│   ├── FilterBar.jsx       # Status filters + search
│   ├── PlotTable.jsx       # Desktop table view
│   ├── PlotCards.jsx       # Mobile card view
│   ├── StatusBadge.jsx     # Available / Booked / Reserved badge
│   ├── LoadingState.jsx    # Skeleton loader
│   ├── ErrorState.jsx      # Error display
│   └── Footer.jsx          # Footer with sync info
├── lib/
│   ├── fetchSheets.js      # Google Sheets CSV fetch + parse utilities
│   └── useSheetData.js     # React hook for live data + auto-refresh
├── pages/
│   ├── _app.js             # Next.js app wrapper
│   ├── _document.js        # Custom HTML head (fonts, meta)
│   └── index.js            # Main page
├── styles/
│   └── globals.css         # Tailwind base + custom components
├── .env.example            # Environment variable template
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── README.md
```

---

## 🎨 Status Column Values

The app recognizes these status values (case-insensitive):

| Sheet Value | Displays As | Badge Color |
|-------------|-------------|-------------|
| `Available` | Available | 🟢 Green |
| `Booked` / `Sold` / `Not Available` | Booked | 🔴 Red |
| `Reserved` / `Hold` / `On Hold` | Reserved | 🟡 Yellow |
| *(empty or anything else)* | Available | 🟢 Green |

---

## 📱 WhatsApp Enquiry

When a user clicks **"Enquire"**, it opens WhatsApp with:

```
Hi, I'm interested in Plot [Plot Name] - Plot No [Plot No]. Please share more details.
```

To set your WhatsApp number, add to `.env.local`:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

Or edit `lib/fetchSheets.js` → `buildWhatsAppUrl()`.

---

## 🛠️ Customization

### Change auto-refresh interval
In `lib/useSheetData.js`:
```js
const REFRESH_INTERVAL_MS = 60 * 1000; // Change to 30 * 1000 for 30 seconds
```

### Change color theme
In `tailwind.config.js` → `theme.extend.colors.forest` and `earth`.

### Add more stat cards
In `components/StatsCards.jsx` → `CARDS` array.

---

## 🐛 Troubleshooting

**"Could not load plot data"**
- Ensure the Google Sheet is shared as "Anyone with the link"
- Check that the Sheet ID in `lib/fetchSheets.js` is correct
- Verify the sheet tab name matches `SHEET_NAME`

**Data not updating**
- The app auto-refreshes every 60 seconds
- Click the "Refresh" button in the header for immediate update
- Check browser console for CORS or network errors

**WhatsApp button not working**
- Ensure columns named "Plot Name" and "Plot No" exist in your sheet
- Check `buildWhatsAppUrl()` in `lib/fetchSheets.js` for column name mappings

---

## 📄 License

MIT — Free to use and modify for your project.

---

*Built with 🌿 for Tapovana, Malnad Karnataka*
