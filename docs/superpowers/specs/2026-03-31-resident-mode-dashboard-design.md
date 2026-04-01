# Resident Mode Dashboard - Design Specification

**Date**: 2026-03-31  
**Status**: Approved  
**Author**: Haven Space Team

---

## Overview

Transform the boarder dashboard from "Discovery/Application" phase to "Tenancy Management" phase for users who have already secured housing. This "Resident Mode" focuses on managing an active lease rather than tracking multiple applications.

---

## Design Changes

### 1. Header Transformation

**Current**:

- Greeting: "Good afternoon, Juan! 👋"
- Subtitle: "Find your perfect boarding house without the hassle."
- Actions: Map View button + My Applications button

**New**:

- Greeting: "Welcome home to Sunrise Dormitory, Room 402"
- Subtitle: "Manage your lease, utilities, and maintenance requests"
- Actions: Remove Map View button, keep context-relevant actions only

### 2. Stats Row (4 Cards)

Replace 5 stats with 4 resident-focused cards:

| Card | Label          | Value            | Sub-text                                | Action                |
| ---- | -------------- | ---------------- | --------------------------------------- | --------------------- |
| 1    | Utility Credit | ₱142.50          | Approx. 3 days remaining based on usage | Top Up (small button) |
| 2    | Maintenance    | No Active Issues | Last check: Jan 20, 2025                | —                     |
| 3    | Lease Period   | Month 4 / 12     | Next Renewal: Sept 2025                 | —                     |
| 4    | Next Payment   | 12 Days Left     | ₱5,500 due on Feb 1                     | —                     |

**Remove**: Applications Status card entirely

### 3. Main Content Area (Left Column)

**Replace** "Application Tracker" with two new sections:

#### A. Room Announcements

- Feed of building-specific notices
- Example items:
  - "Water maintenance scheduled for Wednesday, 9 AM - 12 PM"
  - "New WiFi password updated - check notice board"
  - "Monthly fire drill - Friday 3 PM"

#### B. Quick Actions

Four large, prominent buttons:

1. **Report Maintenance** - Icon: wrench/tools
2. **Guest Pass Request** - Icon: user-plus
3. **View Contract** - Icon: document
4. **Contact Landlord** - Icon: chat/mail

### 4. Payment Center (Right Column)

**Simplify** from multi-property to single residence focus:

**Current**: Shows 3+ properties with traffic-light status
**New**: Single property focus with history

Structure:

- **Current Month**: Paid/Unpaid status, amount, due date, Pay button
- **Previous Months**: Vertical list of past payments (history)
- Remove traffic-light indicators (simplified for single residence)

### 5. Sidebar Navigation

**Changes to Boarder Navigation**:

**Main Section**:

- Dashboard (unchanged)
- **My Lease** (renamed from "Applications")
  - Contains: Digital contract, move-in inspection reports
- Find a Room → **MOVED to Support section**
- Messages (unchanged)
- Payments (unchanged)

**Support Section**:

- Maintenance (unchanged)
- Notices (unchanged)
- **Find a Room** (moved from Main)
- **Room History** (NEW)
  - Log of past utility top-ups
  - Maintenance visit history

---

## Files to Modify

### HTML

- `client/views/boarder/index.html` - Main dashboard structure
- `client/components/sidebar.html` - Navigation template (updated via sidebar.js)

### CSS

- `client/css/views/boarder/boarder.css` - Dashboard styles
- `client/css/views/boarder/boarder-applications.css` - New resident-specific styles

### JavaScript

- `client/js/main.js` - Dashboard initialization
- `client/js/components/sidebar.js` - Navigation configuration (rename Applications → My Lease)
- `client/js/views/boarder/dashboard.js` - Dashboard data logic (if exists)

### New Files

- `client/css/views/boarder/resident-mode.css` - Optional: dedicated resident styles
- `client/js/views/boarder/resident-mode.js` - Optional: dedicated resident logic

---

## Implementation Notes

### Hardcoded Data (Phase 1)

All resident data will be hardcoded for the mockup:

- Property: Sunrise Dormitory, Room 402
- Utility Credit: ₱142.50
- Lease: Month 4 / 12
- Next Payment: ₱5,500 due Feb 1 (12 days left)
- Maintenance: No Active Issues

### TODO Comments

Add `// TODO: Integrate with backend API` comments at all data-fetching points for future backend integration.

### Backward Compatibility

This is a complete replacement of the application-tracking dashboard. No need to maintain dual modes in Phase 1.

---

## Success Criteria

1. ✅ Header displays "Welcome home to [Property Name], [Room]"
2. ✅ Stats row shows 4 resident-focused cards (Utility, Maintenance, Lease, Payment)
3. ✅ Application Tracker replaced with Room Announcements + Quick Actions
4. ✅ Payment Center focuses on single residence
5. ✅ Sidebar navigation updated (Applications → My Lease, Find a Room → Support)
6. ✅ All hardcoded data points match specification
7. ✅ TODO comments added for backend integration points
8. ✅ Responsive design maintained (mobile, tablet, desktop)
9. ✅ Sidebar collapse/expand functionality preserved
10. ✅ No console errors, clean build

---

## Testing Checklist

- [ ] Dashboard loads without errors
- [ ] All 4 stat cards display correct hardcoded values
- [ ] Quick Actions buttons are clickable (links TBD)
- [ ] Room Announcements section displays sample notices
- [ ] Payment Center shows current + previous month
- [ ] Sidebar navigation reflects updated structure
- [ ] "My Lease" link points to applications page (for now)
- [ ] Mobile responsiveness (768px breakpoint)
- [ ] Sidebar collapse works correctly
- [ ] No horizontal overflow at any breakpoint

---

## Future Enhancements (Out of Scope for Phase 1)

- Backend API integration for real-time data
- Dual-mode detection (application vs. resident mode based on user state)
- Utility usage graphs and trends
- Digital contract signing workflow
- Guest pass approval tracking
- Maintenance request status tracking
- Payment history export/download
