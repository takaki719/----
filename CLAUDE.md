# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Japanese slot game project (スロットゲーム) in early development stages. The project name "飲み飲み" (nomi-nomi) relates to drinking, which is integrated into the game mechanics.

## Current State

The project currently contains only a requirements definition document (`docs/definition.md`) that specifies:
- A reel-based slot game with multiple game modes
- Main focus on "継続モード" (Continue Mode)
- 3 reels, up to 3 spins per round (9 total stops)
- Special drinking animation feature (🍺) when certain combinations appear
- Continuation mechanics based on blackout symbols (🖤) and percentage-based chance

## Development Commands

Since no actual code exists yet, there are no build/test/lint commands defined. When implementing:
- Consider using React with TypeScript as suggested in the requirements
- Set up appropriate build tooling (e.g., Vite, Create React App)
- Add package.json with standard scripts (dev, build, test, lint)

## Architecture Notes

Based on the requirements document, the planned architecture includes:
- Home screen for mode/rate selection
- Game screen with slot mechanics
- Drinking animation modal/popup
- Result screen showing continuation count
- State management for game variables (remainingStops, blackoutOccurred, continueCount, etc.)

## Key Game Symbols

```typescript
const symbols = ["🍒", "🍋", "🍇", "💎", "🖤"];
```

## Important Game Logic

- Each round consists of 9 stops (3 reels × 3 spins)
- Continuation is guaranteed if 🖤 appears
- Without 🖤, continuation depends on selected rate (70%, 80%, 90%, 100%)
- Matching non-🖤 symbols trigger 50% chance for drinking animation
- Drinking animation acts as continuation guarantee