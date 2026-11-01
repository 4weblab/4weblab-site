import assert from 'node:assert/strict';
import test from 'node:test';
import { BLACK_FRIDAY, blackFridayState, euro, promoPrice } from '../src/config/black-friday.ts';

test('solo Professionisti e Aziende partecipano alla promozione', () => {
  assert.deepEqual(Object.keys(BLACK_FRIDAY.plans).sort(), ['aziende', 'professionisti']);
  assert.equal(promoPrice('professionisti'), 742.5);
  assert.equal(promoPrice('aziende'), 1417.5);
  assert.equal(euro(promoPrice('professionisti')), '742,50');
  assert.equal(euro(promoPrice('aziende')), '1.417,50');
});

test('prima del 2 novembre il prezzo viene presentato come futuro', () => {
  assert.deepEqual(blackFridayState(new Date('2026-11-01T23:59:59+01:00')), { visible: true, upcoming: true });
  assert.deepEqual(blackFridayState(new Date(BLACK_FRIDAY.startsAt)), { visible: true, upcoming: false });
});

test('scadenza inclusiva, nel fuso di Roma', () => {
  assert.equal(blackFridayState(new Date(BLACK_FRIDAY.endsAt)).visible, true);
  assert.deepEqual(blackFridayState(new Date('2026-11-28T00:00:00+01:00')), { visible: false, upcoming: false });
  assert.equal(blackFridayState(new Date('2026-11-27T23:00:00Z')).visible, false);
});

test('l’interruttore disattiva la promozione anche prima della scadenza', () => {
  assert.deepEqual(blackFridayState(new Date('2026-11-15T12:00:00+01:00'), false), { visible: false, upcoming: false });
  assert.deepEqual(blackFridayState(new Date('2026-11-01T12:00:00+01:00'), false), { visible: false, upcoming: false });
});
