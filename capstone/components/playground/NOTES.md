# Accessibility Comparison: Custom vs. Shadcn/ui (Radix)

After implementing the Modal Dialog, Tabs, and Disclosure components from scratch and comparing them with the generated source from shadcn/ui (which uses Radix UI under the hood), I noticed several concrete gaps in my manual implementation regarding accessibility and edge-case handling.

## Gap 1: Robust Focus Management (Focus Trapping)
**My Version:** I used a `useEffect` hook to trap focus by listening to the `Tab` key and manually cycling through query-selected focusable elements. While this works for basic scenarios, it is brittle.
**Shadcn/Radix:** It uses a dedicated `<FocusScope>` primitive. This handles complex edge cases like managing focus when browser extensions inject DOM elements, and it automatically applies `aria-hidden="true"` to all sibling elements outside the dialog so screen readers don't "leak" out of the modal.

## Gap 2: Body Scroll Locking & iOS Safari Bug
**My Version:** I simply toggled `document.body.style.overflow = "hidden"` when the modal opened to prevent background scrolling.
**Shadcn/Radix:** It uses a `<RemoveScroll>` primitive. My basic approach fails on iOS Safari where background scrolling can still occur through touch dragging. Shadcn handles touch action manipulation, prevents layout shift (scroll bar jumping) by adding proper padding to the body, and cleans up reliably across all devices.

## Gap 3: Roving TabIndex in Tabs
**My Version:** I implemented basic `ArrowLeft` and `ArrowRight` navigation using local state to track the active index and calling `.focus()` to move between tab buttons.
**Shadcn/Radix:** It uses the "Roving TabIndex" pattern explicitly. It manages `tabIndex={-1}` for inactive tabs and `tabIndex={0}` for the active one robustly. It also handles `Home` and `End` keys out of the box to jump to the first/last tabs, and properly manages the `aria-orientation` attributes which are easily missed in scratch builds.

**Conclusion:**
Building these by hand highlighted how difficult true W3C ARIA compliance is. Using headless primitives like Radix (via shadcn) ensures robust, edge-case-tested accessibility without reinventing the wheel.