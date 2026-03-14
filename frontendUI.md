Here is a complete, professional **Product Requirements Document (PRD)** tailored exactly to the architecture and tech stack we have built so far.

You can save this as `prd.md` in the root of your project. If you are using AI coding assistants (like GitHub Copilot or Cursor), feeding them this file will give them perfect context on exactly how to build the rest of your app!

---

# 📝 Product Requirements Document (PRD)

**Project Name:** SkillUp (Web3 Freelance Marketplace)
**Platform:** Web Application (Next.js using .tsx)
**Network:** Base Sepolia (Testnet)

## 1. Executive Summary

SkillUp is a decentralized, trustless freelance marketplace (similar to Fiverr). It leverages Account Abstraction (Coinbase Smart Wallets) to provide a gasless, Web2-like onboarding experience. Payments are handled via USDC and held securely in an Onchain Escrow smart contract until the gig is completed.

## 2. Tech Stack

* **Frontend Framework:** Next.js (App Router), React, TypeScript (`.tsx`)
* **Styling:** Tailwind CSS v4
* **Web3 Integration:** `@coinbase/onchainkit`, `wagmi`, `viem`
* **Wallet Authentication:** Coinbase Smart Wallet (Passkey/Email support)
* **Database & Backend:** Supabase (PostgreSQL)
* **Smart Contracts:** Solidity (Deployed via Remix on Base Sepolia)

## 3. User Personas

1. **The Buyer:** Wants to hire a freelancer. Needs a seamless UI to browse gigs, connect a wallet without worrying about gas fees, and lock USDC into escrow.
2. **The Freelancer:** Wants to list their services and get paid securely. Needs a dashboard to view completed gigs and withdraw funds from the smart contract directly to their wallet.

## 4. Database Architecture (Supabase)

All off-chain metadata (Gig details, images, descriptions) is stored in Supabase to ensure fast page loads and searchability.

**Table:** `gigs`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, auto-generated |
| `created_at` | `TIMESTAMP` | Record creation time |
| `freelancer_address` | `TEXT` | The `0x` wallet address of the seller |
| `title` | `TEXT` | Title of the service (e.g., "Logo Design") |
| `description` | `TEXT` | Detailed explanation of the service |
| `price` | `NUMERIC` | Price in USDC (e.g., `1.00`) |
| `image_url` | `TEXT` | URL of the gig thumbnail |

## 5. Smart Contract Architecture

**Network:** Base Sepolia
**USDC Token Address:** `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
**Current Escrow Contract:** `0xDCc6d8920EB1248AF35d7b7C0858284Ee76C78c0` *(Note: Currently a single-use contract. Future iterations will use a Factory pattern).*

**Required ABIs:**

* `ERC20_ABI`: Needs the `approve(address spender, uint256 amount)` function.
* `ESCROW_ABI`: Needs `depositFunds()` and `releasePayment()` functions.

## 6. Core Features & UI Routes

### 6.1. Global Components

* **Navbar:** Contains the SkillUp Logo, a search bar, and the OnchainKit `<Wallet />` connect button.
* **Web3 Provider:** `app/rootProvider.tsx` wraps the app in OnchainKit and Wagmi providers configured for Base Sepolia.

### 6.2. Marketplace Homepage (`/`)

* **Objective:** Display a grid of available gigs fetched from Supabase.
* **Functionality:**
* Fetch all rows from the `gigs` table using the Supabase JS Client.
* Map through the data and render "Gig Cards" (Image, Title, Price, Freelancer shortened address).
* Clicking a card routes the user to the specific Gig Detail page.



### 6.3. Gig Detail & Checkout Page (`/gig/[id]`)

* **Objective:** Show the full details of a specific service and facilitate the Escrow payment.
* **Functionality:**
* Fetch specific gig data from Supabase based on the URL `id` parameter.
* Display the Gig Image, full description, and price.
* **Checkout Flow:**
* Require the user to connect their wallet if not already connected.
* Display the OnchainKit `<Transaction />` and `<TransactionButton />`.
* **Batched Call:** Button must bundle USDC `approve` and Escrow `depositFunds`.
* Show "Gas Sponsored by SkillUp" messaging.





### 6.4. Freelancer Dashboard (`/freelancer`)

* **Objective:** Allow freelancers to claim their earnings.
* **Functionality:**
* Verify connected wallet address.
* Display a list of active/completed escrow contracts linked to their address.
* Provide a "Release Payment" button executing the `releasePayment()` smart contract function.



## 7. Recommended Folder Structure

```text
skillup-app/
├── app/
│   ├── globals.css           # Tailwind v4 import
│   ├── layout.tsx            # Standard Next.js layout
│   ├── page.tsx              # Homepage (Marketplace Grid)
│   ├── rootProvider.tsx      # OnchainKit/Wagmi Context
│   ├── gig/
│   │   └── [id]/
│   │       └── page.tsx      # Dynamic Gig Checkout Page
│   └── freelancer/
│       └── page.tsx          # Earnings Dashboard
├── components/               # Reusable UI parts (Navbar, GigCard)
├── lib/
│   └── supabase.ts           # Supabase Client Initialization
├── public/                   # Static assets
├── .env.local                # API Keys and Contract Addresses
└── postcss.config.mjs        # Tailwind v4 routing

```

## 8. Development Phases & Next Steps

1. **Phase 1 (Current):** Refactor the existing `page.tsx` to fetch the dummy data from Supabase and display it in a CSS Grid (Marketplace view).
2. **Phase 2:** Move the existing Escrow transaction logic into a dynamic route (`app/gig/[id]/page.tsx`) so clicking a gig opens the checkout.
3. **Phase 3:** Update the smart contract to an "Escrow Factory" so multiple buyers can hire multiple freelancers simultaneously without sharing the same contract balance.