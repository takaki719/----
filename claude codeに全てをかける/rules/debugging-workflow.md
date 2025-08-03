# Workflow for debugging persistent errors or complex issues.

## 🐛 Debugging Workflow

*   Use this routine for persistent errors or incomplete fixes.
*   **<DEBUGGING>**
    *   **<DIAGNOSE>**
        *   Gather error messages, logs, symptoms.
        *   Add relevant context from files.
        *   Retrieve relevant architecture, plan, task details from memory files (`documentation-memory.md`).
    *   **Context is Key:** When tests fail, always add more context using <DIAGNOSE> before attempting a fix.
    *   **Explain:** Clearly state OBSERVATIONS, then REASONING why it's the exact issue.
    *   **Certainty:** If unsure, get more OBSERVATIONS via <DIAGNOSE> or seek <CLARIFICATION>.
    *   **Analyze:** Understand relevant architecture using <ANALYZE CODE> (from `implementation-workflow.md`).
    *   **Root Cause:** Use <STEP BY STEP REASONING> (from `planning-workflow.md`) to consider all causes (architecture, design flaw, bug). Prioritize fixing the root cause, not just masking symptoms.
    *   **Research:** Look for similar patterns in `error-documentation.md` (`documentation-memory.md`). Use <WEB USE> if needed.
    *   **Plan Fix:** Present the fix using <REASONING PRESENTATION> (from `planning-workflow.md`) for validation.
    *   **Implement Fix:** Modify code using <SYSTEMATIC CODE PROTOCOL> (from `implementation-workflow.md`) and <TESTING> (from `testing.md`).
    *   **Console/Log Analysis:** Always check browser/server console output. Report findings. Use targeted logging for complex issues and *check the output*.
    *   **Check `fixes/`:** Look for documented solutions to similar past issues in the `fixes/` directory.
    *   **Periodically check your own process to make sure that your terminal or other command is not in stuck state
