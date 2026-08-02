# GridLock

GridLock is a grid-based puzzle game in which players manage board expansion and the deliberate removal of uniform rows or columns through constrained actions.

## Gameplay
- Actions: swap adjacent cells (cost 1); recolor a cell to a random palette color (cost 3).
- Each action increases a pressure meter; when the threshold is reached, the grid expands.
- Matches and uniform rows/columns reduce pressure and may remove rows or columns.

## Objective
- Win: clear the grid.
- Loss: the grid expands beyond the limits.

## Development
Prerequisite: Node.js

Install dependencies:
```bash
npm install
```

Run via 
```bash
npm run dev
```