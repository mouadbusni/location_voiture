import type { Car, BookingDetails } from './types';

export type GuestDetails = { name: string; phone: string; email: string; notes: string };

export function calculateRentalDays(start: string, end: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end)) return 0;
  const first=Date.parse(`${start}T00:00:00Z`), last=Date.parse(`${end}T00:00:00Z`);
  if(!Number.isFinite(first)||!Number.isFinite(last))return 0;
  if(new Date(first).toISOString().slice(0,10)!==start||new Date(last).toISOString().slice(0,10)!==end)return 0;
  const days=Math.round((last-first)/86400000);
  return days>0&&days<=365?days:0;
}
export function emailAddressValid(email:string):boolean{
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
export function buildBookingEmail(to:string,car:Car|undefined,booking:BookingDetails,guest:GuestDetails,days:number,estimate:number|null):string{
  const subject=encodeURIComponent(`Rental enquiry${car?` — ${car.name}`:''}`);
  const extras=Object.entries(booking.extras).filter(([,enabled])=>enabled).map(([name])=>name).join(', ')||'None';
  const body=encodeURIComponent([
    'Hello, I would like to request a rental quotation.','',
    `Vehicle: ${car?.name??'Please advise'}`,
    `Pickup location: ${booking.pickupLocation}`,
    `Return location: ${booking.returnLocation}`,
    `Pickup date: ${booking.startDate}`,`Return date: ${booking.endDate}`,
    `Duration: ${days} days`,`Extras: ${extras}`,
    `Estimated total: ${estimate===null?'On request':`${estimate.toLocaleString('en-US')} MAD (subject to confirmation)`}`,
    '',`Name: ${guest.name}`,`Phone: ${guest.phone}`,`Email: ${guest.email}`,
    `Notes: ${guest.notes||'None'}`,'','Please confirm availability, rental terms and the final price.'
  ].join('\n'));
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
