# GridLock

GridLock is a strategic **grid-based puzzle survival game** where players must balance expansion pressure against deliberate shrinkage. The tension comes from managing costs, forming matches, and strategically utilizing randomness to clear the grid before it hits the "Dead-Zone."

## 🎮 Core Mechanics

### 1. Player Actions
- **Swap (deterministic)**: Swap any two adjacent cells. (Cost: 1)
- **Recolor (random)**: Change a cell to a random color from the palette. (Cost: 3)
- **Selection**: 
  - Single-click to select a cell for swapping.
  - Click a nearby cell to confirm the swap.
  - Double-click a cell to recolor it.

### 2. Pressure & Expansion
Every action increases the **Pressure Meter**. When the meter reaches its threshold, the grid expands (rows += 1, cols += 1).
- **Match Bonus**: Longest contiguous matches resolve to reduce pressure, delaying expansion.
- **Visual Cues**: A golden highlight indicates potential matches, while a unique indicator marks uniform rows or columns ready for deletion.

### 3. Grid Shrinkage
- If an entire row or column becomes uniform and is confirmed as a match, that row or column is deleted.
- Continuous shrinking is the path to victory.

## 🏆 Win/Loss Conditions
- **Win**: Clear the grid entirely (all rows deleted).
- **Loss**: The grid expands beyond the **Dead-Zone** boundaries (rows ≥ maxRows or cols ≥ maxCols).

## ⚙️ Difficulty Levels
| Difficulty | Start Size | Dead-Zone | Max Pressure |
| :--- | :--- | :--- | :--- |
| **Easy** | 4x4 | 10x10 | 15 |
| **Medium** | 5x5 | 9x9 | 12 |
| **Hard** | 6x6 | 8x8 | 10 |

## 🛠️ Development

### Setup
Ensure you have [Node.js](https://nodejs.org/) installed.

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run locally**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## ✨ Features & Aesthetics
- **Responsive Design**: The game board realigns dynamically based on window orientation (Vertical/Horizontal).
- **Dynamic Animations**: Smooth transitions for swaps, matching, and grid expansions.
- **Premium UI**: Dark-mode aesthetic with vibrant color-coded cells and interactive highlights.
