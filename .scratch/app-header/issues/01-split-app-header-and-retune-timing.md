# Split AppHeader and retune its timing

Status: needs-triage

## Problem

`src/common/components/layout/app-header.tsx` (about 200 lines) holds the
scroll state, the mobile drawer's open and render state, route-change closing,
and the header styling in one component. It is hard to follow and to change
safely.

Its timing values were chosen ad hoc: the scroll handler's debounce, the 50ms
delay before the drawer unmounts, and the drawer's transition. Nobody has
checked that they feel right together.

## Done when

- Scroll tracking and drawer state live in their own hooks or components, and
  `AppHeader` composes them.
- Debounce, unmount delay, and transition durations are named constants that
  agree with each other, and the drawer animates fully before it unmounts.
- Behavior is unchanged: the header still changes style on scroll and the
  drawer still closes on route change.
