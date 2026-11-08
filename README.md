# Sahara Velocity

Luxury vehicle showcase and rental enquiry website for Morocco, built with React 19, TypeScript, Vite, Tailwind CSS and Framer Motion. The original single-page architecture and charcoal/gold visual identity are preserved.

## Run
1. Install Node.js 22.12+ and run `npm install`.
2. Copy `.env.example` to `.env.local` and set a real `VITE_BOOKING_EMAIL`.
3. Run `npm run dev`.
4. Verify with `npm test` and `npm run build`.

## Enquiries
This is an enquiry website, not a real-time booking engine. Booking and contact forms prepare email drafts in the visitor's mail app. Visitors must send the drafts themselves. Without a configured business email the forms show a transparent error rather than falsely claiming submission. No payment, availability check, reservation confirmation, backend or database is included.

## Before accepting customers
Verify the vehicle inventory, photography, specifications, offered prices, extras, deposit, mileage and insurance conditions. Add verified business contact details, legal terms and privacy information. Test email handoff on real customer devices.

## Architecture
`App.tsx` contains the existing page sections and booking modal; `constants.tsx` contains sample fleet data; `types.ts` defines data models; `rental.ts` handles validation and enquiry drafts; `styles.css` contains compiled Tailwind styling.
