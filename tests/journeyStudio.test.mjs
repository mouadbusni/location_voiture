import test from 'node:test';
import assert from 'node:assert/strict';
import { JOURNEYS, matchJourneyCars, indicativeTripTotal } from '../journeyStudio.ts';

const sampleFleet = [
  { id:'s', name:'Sport Coupe', seats:2, pricePerDay:4500, category:'Sport' },
  { id:'l', name:'Executive', seats:5, pricePerDay:3200, category:'Luxury' },
  { id:'u', name:'Family SUV', seats:7, pricePerDay:1800, category:'SUV' },
  { id:'g', name:'Grand SUV', seats:5, pricePerDay:6000, category:'SUV' }
];

test('three distinct journey concepts with pickup locations', () => {
  assert.equal(JOURNEYS.length, 3);
  assert.equal(new Set(JOURNEYS.map(j => j.id)).size, 3);
  assert.ok(JOURNEYS.every(j => j.pickupLocation && j.route.length >= 2 && j.days > 0));
});

test('Atlantic itinerary prioritises sport with two passengers and flexible budget', () => {
  const matches = matchJourneyCars(sampleFleet, { journeyId:'atlantic', passengers:2, maxDailyRate:null });
  assert.equal(matches[0].id, 's');
});

test('Atlas itinerary prioritises SUVs', () => {
  const matches = matchJourneyCars(sampleFleet, { journeyId:'atlas', passengers:4, maxDailyRate:null });
  assert.deepEqual(matches.slice(0, 2).map(c => c.id), ['u','g']);
});

test('passenger capacity is always respected', () => {
  const matches = matchJourneyCars(sampleFleet, { journeyId:'city', passengers:6, maxDailyRate:null });
  assert.deepEqual(matches.map(c => c.id), ['u']);
});

test('daily budget is a hard filter, not a misleading suggestion', () => {
  const matches = matchJourneyCars(sampleFleet, { journeyId:'atlantic', passengers:2, maxDailyRate:2000 });
  assert.deepEqual(matches.map(c => c.id), ['u']);
  assert.deepEqual(matchJourneyCars(sampleFleet, { journeyId:'city', passengers:8, maxDailyRate:1000 }), []);
});

test('invalid travellers and unknown journeys return no suggestions', () => {
  assert.deepEqual(matchJourneyCars(sampleFleet, { journeyId:'atlas', passengers:0, maxDailyRate:null }), []);
  assert.deepEqual(matchJourneyCars(sampleFleet, { journeyId:'unknown', passengers:2, maxDailyRate:null }), []);
});

test('indicative total is computed only for valid duration and rate', () => {
  assert.equal(indicativeTripTotal(3800, 4), 15200);
  assert.equal(indicativeTripTotal(2500, 0), 0);
  assert.equal(indicativeTripTotal(-1, 3), 0);
  assert.equal(indicativeTripTotal(1000, 2.5), 0);
});
