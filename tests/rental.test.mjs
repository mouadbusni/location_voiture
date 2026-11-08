import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRentalDays, emailAddressValid, buildBookingEmail } from '../rental.ts';

test('calculates valid calendar days', () => {
  assert.equal(calculateRentalDays('2026-11-10','2026-11-13'),3);
  assert.equal(calculateRentalDays('2028-02-28','2028-03-01'),2);
});
test('rejects invalid rental dates', () => {
  assert.equal(calculateRentalDays('2026-02-30','2026-03-05'),0);
  assert.equal(calculateRentalDays('2026-11-13','2026-11-10'),0);
  assert.equal(calculateRentalDays('2026-11-10','2026-11-10'),0);
});
test('validates email', () => {
  assert.equal(emailAddressValid('name@example.com'),true);
  assert.equal(emailAddressValid('invalid-email'),false);
});
test('email draft contains rental details', () => {
  const draft=buildBookingEmail('desk@example.com',{name:'Porsche 911 Carrera'},{
    pickupLocation:'Casablanca',returnLocation:'Rabat',startDate:'2026-11-10',endDate:'2026-11-13',
    extras:{driver:true,premiumInsurance:false,gps:false,babySeat:false}
  },{name:'Guest',phone:'+212600000000',email:'guest@example.com',notes:''},3,15000);
  assert.match(decodeURIComponent(draft),/Porsche 911 Carrera/);
  assert.match(decodeURIComponent(draft),/2026-11-13/);
});
