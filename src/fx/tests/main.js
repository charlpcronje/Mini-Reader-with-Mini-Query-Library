// src/fx/tests/main.js

import { domTestGroup } from "./dom-tests.js";
import { cssTestGroup } from ".//css-tests.js";
import { ajaxTestGroup } from "./ajax-tests.js";
import { eventTestGroup } from "./event-tests.js";

/**
 * TestSuite class to handle test execution and result logging.
 */
class TestSuite {
    constructor(logPanelId) {
        this.logPanel = document.getElementById(logPanelId);
        if (!this.logPanel) {
            throw new Error(`Log panel with id "${logPanelId}" not found in the DOM.`);
        }
        this.testResults = [];
    }

    log(message, isSuccess = true, code = "") {
        const logEntry = document.createElement("div");
        logEntry.classList.add("log", isSuccess ? "success" : "error");
        logEntry.innerHTML = `
            <p>${message}</p>
            <pre>${code}</pre>
        `;
        this.logPanel.appendChild(logEntry);
        this.logPanel.scrollTop = this.logPanel.scrollHeight;
    }

    addTestResult(testName, success, code, reason = null) {
        this.testResults.push({ testName, success, code, reason });
        this.log(
            `${testName} - ${success ? "Passed" : "Failed"}`,
            success,
            code
        );
    }

    summarize(groupName) {
        const totalTests = this.testResults.length;
        const passedTests = this.testResults.filter((t) => t.success).length;
        const failedTests = totalTests - passedTests;

        const summary = document.createElement("div");
        summary.classList.add("summary");
        summary.innerHTML = `
            <h3>${groupName}</h3>
            <p>Total Tests: ${totalTests}</p>
            <p>Passed: ${passedTests}</p>
            <p>Failed: ${failedTests}</p>
        `;
        this.logPanel.appendChild(summary);
    }
}

/**
 * Run the test groups sequentially with a delay.
 */
async function runTests() {
    const testSuite = new TestSuite("log-panel");

    const testGroups = [
        domTestGroup,
        cssTestGroup,
        ajaxTestGroup,
        eventTestGroup,
    ];

    for (const group of testGroups) {
        testSuite.log(`Running group: ${group.name}`, true);

        for (const test of group.tests) {
            try {
                await new Promise((resolve) => setTimeout(resolve, 300)); // Delay of 300ms
                test.testCode(testSuite);
            } catch (error) {
                testSuite.addTestResult(
                    test.name,
                    false,
                    test.testCode.toString(),
                    error.message
                );
            }
        }

        testSuite.summarize(group.name);
    }

    testSuite.log("All test groups completed.", true);
}

// Start tests on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    runTests();
});
