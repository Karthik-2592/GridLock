## Game Overview

## A **grid‑based puzzle survival game** where the player balances expansion pressure against deliberate shrinkage. The tension comes from managing cost, matches, and randomness to reduce the grid to a single cell before hitting the dead‑zone.

## Core Mechanics

### 1. Grid Initialization

- Start size: **4×4**.
- Each cell assigned a random color from a palette.
- Difficulty sets:
  - **Cost threshold** (before expansion).
  - **Dead‑zone boundaries** (`maxRows`, `maxCols`).

#### Description

- Grid cells are color coded
- Smooth rounded border cells
- Separation between each cell

### 2. Player Actions

- **Swap (deterministic)**
  - Adjacent cells only.
  - Cost = 1.
- **Recolor (random)**
  - Any cell → random color.
  - Cost = 2 or 3 (difficulty‑scaled).
  - High‑risk, high‑reward move.

#### Description

- A cell can be swapped with any of its adjacent nearby cell.
- A cell can be recolored (to a random color)

#### Behaviour

- Clicking on a cell selects the cell to swap, clicking on another cell nearby confirms the swap.
- Double clicking on the cell changes it color(randomly).
- Clicking on the selected cell (not double clicking) deselects the cell for swap

---

### 3. Cost System

- Every action increases cost.
- Matches reduce cost (negative bonus).
- Threshold exceeded → grid expands.

#### Description

- A indicator to the left of the grid that shows a progress bar to the next expansion
- Progress reduced per match depends on the size of the grid (larger grid require larger matches to reduce progress)

#### Behaviour

- Each turn increases the progress to next expansion
- Matches reduce the progress (depending on the how large the match is)

### 4. Expansion

- Expansion rule:
  ```
  rows += 1
  cols += 1
  ```
- Dead‑zone check (OR condition):
  ```
  if (rows >= maxRows || cols >= maxCols) → LOSS
  ```

#### Behaviour

- Expansion will always occur at the right and bottom side
- The Grid cells shift accordinly so that it stays center in screen

---

### 5. Match Detection

- Only **longest contiguous vectors** resolve.
  - Example: `RRRR` → 4‑match, not two 3‑matches.
- Match bonus scales with length (e.g., −1 for 3, −2 for 4).
- Matches delay expansion but don’t shrink grid.

#### Description:

- A golden highlight (Translucent) over the possible matching that can be done
- The highlight expands across the cells that fall under matching
- A small circle appear at the corner of highlight to indicate that matching can be done

#### Behaviour:

- The highlight always covers the maximum matching possible (largest row/column)
- Any previous row/column match is overwritten by a larger row/column match.
- On hovering, the Circle expands, and clicking on the circle confirms the match.

---

### 6. Uniform Row/Column

- If an entire row or column is uniform, and user confirms a match, then delete that row/column
- Grid shrinks (`rows--` or `cols--`).

---

### 7. Win/Loss Conditions

- **Win**: Grid shrinks to 1×1.
- **Loss**: Grid expands beyond dead‑zone (rows ≥ maxRows OR cols ≥ maxCols).

---

## Gameplay Flow

```
while (gameActive) {
    playerAction()          // swap or recolor
    checkUniformRowsCols()  // shrink if possible
    detectLongestMatches()  // apply only longest vector
    applyMatchBonus()       // reduce cost
    updateCost()            // add action cost
    if (cost >= threshold) expandGrid()
    if (rows >= maxRows || cols >= maxCols) loseGame()
    if (rows === 1 && cols === 1) winGame()
}
```

---

## Strategic Layers

- **Tactical Survival**: Use swaps and matches to delay expansion.
- **Risk Management**: Recolor is powerful but random and costly.
- **Strategic Victory**: Engineer uniform rows/columns to shrink grid.
- **Constant Pressure**: Expansion looms; every move is a trade‑off.

---

## Player Experience

- **Early Game**: Small grid, easy matches, low pressure.
- **Mid Game**: Expansion grows grid diagonally, harder to manage.
- **Late Game**: Shrinking rows/columns becomes critical.
- **Endgame**: Win by compressing grid to 1×1, or lose by hitting dead‑zone.

---

Changes:

- Ensure sufficient padding in all elements
- When the grid size is 2x() or ()x2, row or column check across 2 cell pairs should be considered.
- Matching a vector (row or column) should replace all the cells (part of the vector) by a new cell (random color)
- Matched cells should shrink in size and expand back with a different color
- The circle should have a geometric shape indicating a tick
- Selected cell should have a highlight to indicate that it is selected
- When a illegal move is made (for swapping), a small shake animation should occur for the selected two cells (with a red-highlight)
- Illegal moves should then remove the selection made so far.
- Scale the current UI and grid size (not the grid dimensions, but each cell size)
- Recolor costs 3 instead of 2.
- An entire row / column filling should have a unique indicator (instead of the current golden-highlight)

---

## In types.ts Currently only recolor Cost is configurable. Add another entry to GameState which inclues moveCost:number. This should determine the cost increase for swap operation done in useGameState.ts.

Space out the UI components in GameBoard.tsx
and scale each of them respectively. Ensure that the detectMatches() in useGameState.ts
handles the case where one of the dimensions is 2 or less.

## Also win condition is that all rows be deleted and not to reduce to 1x1 grid.

Before gameover screen, complete the final swap animation and pressure meter build up.

Also debug the swap cells operation for swapping between rows. (Current implementation affects entire rows when swapping, instead of 2 cells).

## Finally, check whether 2 cell pairing is done when one of the grid dimensions is 2 (currently not present).

Minor changes:

- When grid size transitions from 2x() or ()x2 to a larger size, remove the 2 pair checking. (Current implemenation highlights the previous 2 pair check after size increase, but not any new 2 pairs)
- Reduce the animation time to 50ms
- Sharper borders to each cell (
- Win/loss screen to appear in 0.6s (current delay is 1.5a)

Minor Changes:

- Expansion should occurs after the pressure bar fills ups, (Current logic expands concurrently, which is not ideal)
- Cell size is constant when screen size is large, and is dynamic when window size is small
- Stronger highlight on selected cell (wider, white border is preferred)

Minor Changes:

- When window width is less than window height, realign the gameBoard to be vertically aligned instead of horizontal
  - Infocards arranged horizontally above the grid
  - Grid between Pressure bar and Inforcards
  - Pressure bar is horizontal below the grid
- When window width is higher than window height, realign the gameBoard to be horizontally aligned instead of vertical
  - Infocards arranged vertically right of the grid
  - Grid between Pressure bar and Inforcards
  - Pressure bar is vertical left of the grid

Changes:

- Remove the isExpanding:bool logic that delays expansion animation and all its associated components completely.
- Add Difficulty to the game

Easy:
Beginning: 4x4 Grid
Dead-Zone: 10x10 Grid
MaxPressure: 15

Medium:
Beginning: 5x5 Grid
Dead-Zone: 9x9 Grid
MaxPressure: 12

Beginning: 6x6 Grid
Dead-Zone: 8x8 Grid
MaxPressure: 10

- Include a animated how to play section in the bottom of starting page:
  1.  Swap and Recolor operations
  2.  Pressue meter and Grid expansion
  3.  Matching mechanics: Pressure reduction and grid reduction
  4.  DeadZone - loss condition
  5.  Grid clearing - loss condition.
  - Carousal of cards that can be navigated.
- Visible dead-zones
  - low opacity red border indicating the dead-zone visually.

Reconfigure the handleClick() eventListener to include the following changes:

1. Delay between clicking and highlight should be 50ms
2. Double click should be checked independently (currently double click is handled by the same function which handles single click)

The idea is to reduce the delay for highlight animation (by reducing the timeout to 50ms) but this means that double click should be registered within that 50ms window, which is not possible. Separate these (with possible individual event handlers) for recolor operation.
