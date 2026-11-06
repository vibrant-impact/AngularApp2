# AngularApp2: Certification Roadmap & Milestones Tracker

A structured, reactive Angular task management dashboard designed to track professional certification pathways (e.g., Oracle Java SE 21, AWS Developer Associate, AWS Machine Learning Engineer, Apple Swift) alongside high-value free badges and actionable preparation milestones.

Developed by **Vibrant Impact** as part of the advanced Angular development coursework.

---

## 📋 Features & Rubric Highlights

### 1. In-Memory State & RxJS Observables (`TaskService`)
* **BehaviorSubject State Management:** Manages an immutable array of certifications and milestone sub-tasks without requiring an external backend.
* **Derived Streams:** Uses RxJS operators (`map`, `combineLatest`) to expose derived streams such as `activeCertification$`, `certifications$`, and real-time total pending exam budget calculations (`pendingBudgetTotal$`).
* **Clean Subscriptions:** Employs the Angular `async` pipe in templates to handle subscriptions and prevent memory leaks.

### 2. Custom Pipes
* **`FormatStudyDurationPipe` (`formatStudyDuration`):** Transforms raw minutes into clean, human-readable representations (e.g., `3600` minutes $\rightarrow$ `60h 00m`). Supports optional flags for quick-win labeling.
* **`DaysRemainingPipe` (`daysRemaining`):** Calculates calendar-day differences between the current date and milestone target dates, dynamically outputting relative countdown labels (e.g., `"3 days remaining"`, `"Due today"`, `"2 days overdue"`).
* **`CopyrightPipe` (`copyright`):** Dynamically outputs a formatted legal copyright statement including the current calendar year and the brand owner name (**Vibrant Impact**).

### 3. Custom Directive (`TaskPriorityHighlightDirective`)
* **Selector:** `[appTaskPriorityHighlight]`
* **Dynamic Styling via `Renderer2`:** Modifies task appearance based on priority (`critical`, `high`, `medium`, `low`) with left accent border indicators.
* **State Behavior:** Applies visual strikethrough, dimming, and background shading when a milestone/certification is completed, while applying subtle glowing highlights to free badges and quick-win tasks.

### 4. Dependency Injection & Standalone Architecture
* Built using modern Angular standalone components, standalone pipes, and standalone directives.
* Uses Angular's `inject()` functional dependency injection pattern.

---

## 🏗 Project Architecture & Structure

```
src/
├── app/
│   ├── directives/
│   │   └── taskPriorityHighlight.directive.ts  # Priority borders & completion styles
│   ├── models/
│   │   └── certificationTask.model.ts          # Certification & milestone interfaces
│   ├── pipes/
│   │   ├── copyright.pipe.ts                   # Brand copyright with dynamic year
│   │   ├── daysRemaining.pipe.ts               # Due date relative countdown
│   │   └── formatStudyDuration.pipe.ts         # Minute-to-hour/minute duration formatter
│   ├── services/
│   │   └── task.service.ts                     # In-memory array & RxJS BehaviorSubject state
│   ├── app.component.css                       # Forest & sage theme styling
│   ├── app.component.html                      # Two-tier parent-child dashboard template
│   ├── app.component.ts                        # Main standalone root component
│   ├── app.config.ts                           # Application routing & providers
│   └── app.routes.ts                           # Base routes
├── styles.css                                  # Global baseline CSS
└── main.ts                                     # Angular application bootstrap
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.x or v20.x+
* **Angular CLI**: v18+ / v19+ (`npm install -g @angular/cli`)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd AngularApp2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **View in browser:**
   Navigate to `http://localhost:4200/`.

---

## 🛠 Usage Guide

1. **Select a Track:** Click on any certification pill at the top (e.g., *Oracle Java SE 21 Developer*) to view its detailed hero banner and attached preparation steps.
2. **Add Milestones:** Enter a preparation task title, study notes, and target completion date. The milestone will appear with a live countdown badge.
3. **Adjust Dates Inline:** Modify the milestone target date directly on the card to watch the `DaysRemainingPipe` update the countdown in real time.
4. **Mark Complete / Delete:** Toggle completion status to see the custom directive apply strikethrough and subdued tones, or delete completed objectives.
5. **Register New Certifications:** Add new target credentials in the registration panel. Free badges automatically zero out the cost, while paid vouchers update the top pending exam budget calculation.

---

## 📄 License & Attribution

© 2026 Vibrant Impact. All Rights Reserved.  
Created for advanced Angular development coursework.