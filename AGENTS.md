# Agent Instructions

## Change Approval

- Before changing project files, describe the planned changes and the files they will affect, then wait for the user's explicit approval.
- Do not infer desired behavior or structure from prior context alone. If a requirement is ambiguous, ask a question before making changes.
- Make only the approved changes. If additional changes become necessary, obtain separate approval first.

## Data and UI Text

- Do not hardcode data in components or business logic, including numeric values, dates, text values, or UI content.
- Get movie, genre, rating, and other domain data from the project's data source, such as the TMDB API, or from approved configuration.
- Keep UI text (button labels, headings, hints, error messages, and other visible strings) separate from components in text or localization files.
- Define configuration values and shared constants in separate constants files. Do not duplicate them in components or business logic.
- Do not replace missing data with fabricated examples or default values without approval. Show a defined UI state for missing or invalid data.

## Separation of Responsibilities

- Keep business logic separate from UI components.
- Keep UI components separate from constants, text, interfaces, and types.
- Store interface and type declarations in their appropriate separate files; do not define them inside components.
- Place new files consistently with the existing project structure, keeping distinct responsibilities in separate files.
- Do not create inline functions or ternary expressions directly in the `return` statements of hooks and components. In composite hooks and components, create named data groups and return a prepared variable or its alias instead of a large flat object.
