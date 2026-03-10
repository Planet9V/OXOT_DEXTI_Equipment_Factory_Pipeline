1. **Understand the Goal**: The objective is to add two new agent personas, `theSurveyor` and `theEngineer`, to the `DexpiAgent` class in `src/lib/agents/agent.ts`. This aligns with the `docs/JULES_PROMPTS.md` documentation which describes these personas and their roles.
2. **Review Existing Personas**: Check `src/lib/agents/agent.ts` to see how personas are defined in the `PERSONAS` object.
3. **Add `theSurveyor` and `theEngineer` Personas**:
   - Update `PERSONAS` in `src/lib/agents/agent.ts` with the prompts from `docs/JULES_PROMPTS.md`.
4. **Implement New Methods in `DexpiAgent`**:
   - Add a method `generateEquipmentRegistry` to `DexpiAgent` that uses `theSurveyor`. This method should take a sector name and return the parsed JSON registry. (The prompt expects placeholders like `[SECTOR NAME]`).
   - Add a method `generateReferenceCards` to `DexpiAgent` that uses `theEngineer`. This method should take a list of equipment types and return the parsed JSON array of equipment cards.
5. **Update Tests**:
   - Modify `tests/agent.test.ts` to expect 8 personas instead of 6.
   - Add tests for `theSurveyor` and `theEngineer` logic to `tests/agent.test.ts`.
6. **Pre-commit Checks**: Run pre-commit instructions, then lint and tests.
