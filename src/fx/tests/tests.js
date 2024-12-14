import {$, DOM} from '../DOM.js';
import fx from '../FX.js';

class TestSuite {
    loadConfig = $.loadConfig;

    constructor(logPanelId) {
        this.logPanel = document.getElementById(logPanelId);
        this.testResults = [];
        this.totalTests = 0;
        this.passedTests = 0;
        this.failedTests = 0;
    }

    log(message, isSuccess = true, code = '') {
        const logEntry = document.createElement('div');
        logEntry.classList.add('log', isSuccess ? 'success' : 'error');
        logEntry.innerHTML = `
            <p>${message}</p>
            <pre>${code}</pre>
        `;
        this.logPanel.appendChild(logEntry);
        this.logPanel.scrollTop = this.logPanel.scrollHeight;
    }

    addTestResult(testName, success, code, reason = null) {
        this.totalTests++;
        if (success) {
            this.passedTests++;
        } else {
            this.failedTests++;
            this.testResults.push({ testName, reason, code });
        }
        this.log(
            `${testName} - ${success ? 'Passed' : 'Failed'}`,
            success,
            code
        );
    }

    summarize() {
        const summary = document.createElement('div');
        summary.classList.add('summary');
        summary.innerHTML = `
            <p>Total Tests: ${this.totalTests}</p>
            <p>Passed: ${this.passedTests}</p>
            <p>Failed: ${this.failedTests}</p>
            ${this.failedTests > 0 ? '<p>Failed Tests:</p>' : ''}
        `;
        if (this.failedTests > 0) {
            const failedList = document.createElement('ul');
            this.testResults.forEach(result => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${result.testName}:</strong> ${result.reason}<br><code>${result.code}</code>`;
                failedList.appendChild(li);
            });
            summary.appendChild(failedList);
        }
        this.logPanel.appendChild(summary);
    }
}

// Initialize the test suite
const testSuite = new TestSuite('log-panel');
function runTests() {
    // Example: Test CSS manipulation
    // Example: Test CSS manipulation
    try {
        const element = $('#css-content');
        const testCode = `
        const element = $('#css-content');
        element.css('background', 'blue');
        const bgColor = element.css('background-color');
    `;
        element.css('background', 'blue');
        const bgColor = element.css('background-color');
        if (bgColor === 'rgb(0, 0, 255)') {
            testSuite.addTestResult(
                'CSS Manipulation',
                true,
                testCode
            );
        } else {
            throw new Error(
                `Expected 'rgb(0, 0, 255)', but got '${bgColor}'`
            );
        }
    } catch (error) {
        testSuite.addTestResult(
            'CSS Manipulation',
            false,
            `
            const element = $('#css-content');
            element.css('background', 'blue');
            const bgColor = element.css('background-color');
        `,
            error.message
        );
    }

    // Example: Test val() method
    try {
        const input = $('#input-1');
        const testCode = `
            const input = $('#input-1');
            input.val('Test Value');
            const inputValue = input.val();
        `;
        input.val('Test Value');
        const inputValue = input.val();
        if (inputValue === 'Test Value') {
            testSuite.addTestResult(
                'Input Value Set/Get',
                true,
                testCode
            );
        } else {
            throw new Error('Input value did not match expected result');
        }
    } catch (error) {
        testSuite.addTestResult(
            'Input Value Set/Get',
            false,
            `
                const input = $('#input-1');
                input.val('Test Value');
                const inputValue = input.val();
            `,
            error.message
        );
    }


    // =====================
    // 1. Constructor Tests
    // =====================
    try {
        const testCode = `const instance = new DOM('.element');`;
        console.log(testCode);
        const instance = new DOM('.element');
    
        if (instance.elements.length > 0) {
            testSuite.addTestResult('Constructor - Valid Selector', true, testCode);
        } else {
            throw new Error('No elements selected');
        }
    } catch (error) {
        testSuite.addTestResult('Constructor - Valid Selector', false, error.message);
    }

    try {
        const testCode = `const instance = new DOM(document.querySelector('.element'));`;
        const instance = new DOM(document.querySelector('.element'));
        if (instance.elements instanceof Element) {
            testSuite.addTestResult('Constructor - DOM Element', true, testCode);
        } else {
            throw new Error('Element not correctly set');
        }
    } catch (error) {
        testSuite.addTestResult('Constructor - DOM Element', false, error.message);
    }

    try {
        const testCode = `const instance = new DOM(null);`;
         try {
            new DOM(null);
            testSuite.addTestResult('Constructor - Invalid Input', false, testCode, 'Should throw an error');
        } catch (error) {
            testSuite.addTestResult('Constructor - Invalid Input', true, error.message);
        }
    } catch (error) {
        testSuite.addTestResult('Constructor - Invalid Input', false, error.message);
    }

    // =================
    // 2. Method: val()
    // =================
    try {
        const testCode = `
            const input = new DOM('#input-1');
            input.val('Test Value');
            const value = input.val();
        `;
        const input = new DOM('#input-1');
        input.val('Test Value');
        const value = input.val();
        if (value === 'Test Value') {
            testSuite.addTestResult('val() - Set/Get Value', true, testCode);
        } else {
            throw new Error('Value mismatch');
        }
    } catch (error) {
        testSuite.addTestResult('val() - Set/Get Value', false, error.message);
    }

    try {
        const testCode = `
            const input = new DOM('#non-existent');
            const value = input.val();
        `;
        const input = new DOM('#non-existent');
        const value = input.val();
        if (value === '') {
            testSuite.addTestResult('val() - Non-Input Element', true, testCode);
        } else {
            throw new Error('Expected empty value');
        }
    } catch (error) {
        testSuite.addTestResult('val() - Non-Input Element', false, error.message);
    }

    // =================
    // 3. Method: css()
    // =================
    try {
        const testCode = `
            const element = new DOM('#css-content');
            element.css('background', 'blue');
            const bgColor = element.css('background-color');
        `;
        const element = new DOM('#css-content');
        element.css('background', 'blue');
        const bgColor = element.css('background-color');
        if (bgColor === 'rgb(0, 0, 255)') {
            testSuite.addTestResult('css() - Set/Get CSS', true, testCode);
        } else {
            throw new Error('Background color mismatch');
        }
    } catch (error) {
        testSuite.addTestResult('css() - Set/Get CSS', false, error.message);
    }

    // ==================
    // 4. Method: html()
    // ==================
    try {
        const testCode = `
            const element = new DOM('#html-content');
            element.html('New Content');
            const content = element.html();
        `;
        const element = new DOM('#html-content');
        element.html('New Content');
        const content = element.html();
        if (content === 'New Content') {
            testSuite.addTestResult('html() - Set/Get HTML', true, testCode);
        } else {
            throw new Error('Content mismatch');
        }
    } catch (error) {
        testSuite.addTestResult('html() - Set/Get HTML', false, error.message);
    }

    // ========================
    // 5. Event Binding Tests
    // ========================
    try {
        const testCode = `
            const button = new DOM('#button-1');
            let clicked = false;
            button.click(() => { clicked = true; });
            button.elements[0].click();
        `;
        const button = new DOM('#button-1');
        let clicked = false;
        button.click(() => {
            clicked = true;
        });
        button.elements[0].click();
        if (clicked) {
            testSuite.addTestResult('Event Binding - Click Event', true, testCode);
        } else {
            throw new Error('Click event not triggered');
        }
    } catch (error) {
        testSuite.addTestResult('Event Binding - Click Event', false, error.message);
    }

    // ===================
    // 6. AJAX Tests
    // ===================
    try {
        const testCode = `
            $.load({
                url: 'api/getUsers.json',
                type: 'GET',
                done: (data) => { console.log(data); },
                fail: (err) => { console.error(err); },
            });
        `;
        $.load({
            url: 'api/getUsers.json',
            type: 'GET',
            done: () => {
                testSuite.addTestResult('AJAX - GET Request', true, testCode);
            },
            fail: () => {
                throw new Error('GET request failed');
            },
        });
    } catch (error) {
        testSuite.addTestResult('AJAX - GET Request', false, error.message);
    }

    try {
        const testCode = `
            $.load({
                url: 'api/getUsers.json',
                type: 'GET',
                beforeSend: () => { console.log('beforeSend called'); },
            });
        `;
        let beforeSendCalled = false;
        $.load({
            url: 'api/getUsers.json',
            type: 'GET',
            beforeSend: () => {
                beforeSendCalled = true;
            },
            done: () => {
                if (beforeSendCalled) {
                    testSuite.addTestResult('AJAX - beforeSend Callback', true, testCode);
                } else {
                    throw new Error('beforeSend was not called');
                }
            },
            fail: () => {
                throw new Error('Request failed');
            },
        });
    } catch (error) {
        testSuite.addTestResult('AJAX - beforeSend Callback', false, error.message);
    }

    try {
        const testCode = `
            $.load({
                url: 'api/getUsers.json',
                type: 'GET',
                done: (data) => { console.log('done called with:', data); },
            });
        `;
        let doneCalled = false;
        $.load({
            url: 'api/getUsers.json',
            type: 'GET',
            done: (data) => {
                doneCalled = true;
                if (data) {
                    testSuite.addTestResult('AJAX - done Callback', true, testCode);
                } else {
                    throw new Error('No data returned in done callback');
                }
            },
            fail: () => {
                throw new Error('Request failed');
            },
        });
    } catch (error) {
        testSuite.addTestResult('AJAX - done Callback', false, error.message);
    }

    try {
        const testCode = `
            $.load({
                url: '/non-existent-endpoint',
                type: 'GET',
                fail: (error) => { console.log('fail called with:', error); },
            });
        `;
        let failCalled = false;
        $.load({
            url: '/non-existent-endpoint',
            type: 'GET',
            fail: (error) => {
                failCalled = true;
                if (error) {
                    testSuite.addTestResult('AJAX - fail Callback', true, testCode);
                } else {
                    throw new Error('Error object not provided in fail callback');
                }
            },
            done: () => {
                throw new Error('done should not be called for a failed request');
            },
        });
    } catch (error) {
        testSuite.addTestResult('AJAX - fail Callback', false, error.message);
    }
    

    try {
        const testCode = `
            $.load({
                url: 'api/getUsers.json',
                type: 'GET',
                complete: () => { console.log('complete called'); },
                always: () => { console.log('always called'); },
            });
        `;
        let completeCalled = false;
        let alwaysCalled = false;
        $.load({
            url: 'api/getUsers.json',
            type: 'GET',
            complete: () => {
                completeCalled = true;
            },
            always: () => {
                alwaysCalled = true;
                if (completeCalled && alwaysCalled) {
                    testSuite.addTestResult('AJAX - complete and always Callbacks', true, testCode);
                } else {
                    throw new Error('Callbacks not called as expected');
                }
            },
            fail: () => {
                throw new Error('Request failed');
            },
        });
    } catch (error) {
        testSuite.addTestResult('AJAX - complete and always Callbacks', false, error.message);
    }
    

    try {
        const testCode = `
            $.loadSetup({ timeout: 10000 });
            const config = $.loadConfig();
            console.log(config); // Debugging
        `;
        console.log("Before loading setup");
        $.loadSetup({ timeout: 10000 });
        const config = $.loadConfig(); // Call the function to get the config object
        console.log("config with timeout:", config);
        if (config.timeout === 10000) {
            testSuite.addTestResult('AJAX Configuration - Update Default Timeout', true, testCode);
        } else {
            throw new Error(`Expected timeout to be 10000, but got: ${config ? config.timeout : 'undefined'}`);
        }
    } catch (error) {
        testSuite.addTestResult(
            'AJAX Configuration - Update Default Timeout',
            false,
            `
                $.loadSetup({ timeout: 10000 });
                const config = $.loadConfig();
                console.log(config); // Debugging output: ${error.message}
            `,
            error.message
        );
    }

    try {
        const testCode = `
            $.loadSetup({ timeout: 10000, type: 'POST' });
            const config = $.loadConfig();
            console.log(config); // Debugging
        `;
        $.loadSetup({ timeout: 10000, type: 'POST' });
        const config = $.loadConfig();
        if (config && config.timeout === 10000 && config.type === 'POST') {
            testSuite.addTestResult('AJAX Configuration - Merge Custom Configurations', true, testCode);
        } else {
            throw new Error(`
                Configuration mismatch.
                Expected: { timeout: 10000, type: 'POST' }
                Received: ${JSON.stringify(config, null, 2)}
            `);
        }
    } catch (error) {
        testSuite.addTestResult(
            'AJAX Configuration - Merge Custom Configurations',
            false,
            `
                $.loadSetup({ timeout: 10000, type: 'POST' });
                const config = $.loadConfig();
                console.log(config); // Debugging output: ${error.message}
            `,
            error.message
        );
    }
    

    try {
        const testCode = `
            $.loadSetup({ invalidKey: 'invalidValue' });
            const config = $.loadConfig();
            console.log(config); // Debugging
        `;
        $.loadSetup({ invalidKey: 'invalidValue' });
        const config = $.loadConfig();
        if (config && config.invalidKey === undefined) {
            testSuite.addTestResult('AJAX Configuration - Invalid Key Handling', true, testCode);
        } else {
            throw new Error(`
                Invalid key should not be present.
                Received: ${JSON.stringify(config, null, 2)}
            `);
        }
    } catch (error) {
        testSuite.addTestResult(
            'AJAX Configuration - Invalid Key Handling',
            false,
            `
                $.loadSetup({ invalidKey: 'invalidValue' });
                const config = $.loadConfig();
                console.log(config); // Debugging output: ${error.message}
            `,
            error.message
        );
    }
    
    try {
        const testCode = `
            $.load({
                url: '/slow-response',
                type: 'GET',
                timeout: 1000,
            });
        `;
        $.load({
            url: '/slow-response',
            type: 'GET',
            timeout: 1000,
            fail: (error) => {
                if (error.message.includes('Timeout')) {
                    testSuite.addTestResult('AJAX - Timeout Handling', true, testCode);
                } else {
                    throw new Error('Timeout error not triggered');
                }
            },
        });
    } catch (error) {
        testSuite.addTestResult('AJAX - Timeout Handling', false, error.message);
    }
    
    try {
        const testCode = `
            $.load({
                url: '/xml-endpoint',
                type: 'GET',
                dataType: 'xml',
            });
        `;
        $.load({
            url: '/xml-endpoint',
            type: 'GET',
            dataType: 'xml',
            done: (data) => {
                if (data instanceof Document) {
                    testSuite.addTestResult('AJAX - Response Parsing (XML)', true, testCode);
                } else {
                    throw new Error('Response not parsed as XML');
                }
            },
            fail: () => {
                throw new Error('Request failed');
            },
        });
    } catch (error) {
        testSuite.addTestResult('AJAX - Response Parsing (XML)', false, error.message);
    }
    
    // ===================
    // 7. DOM Plugin Tests
    // ===================
    try {
        const testCode = `
            const body = fx.dom.$("body");
            const header = fx.dom.body.header;
        `;
        const body = fx.dom.$("body");
        if (body.type !== "dom") {
            throw new Error("Body Dynamic Object has incorrect type");
        }
        if (!fx.dom.nodes.body) {
            throw new Error("Body Dynamic Object not added to fx.dom.nodes");
        }
        const header = fx.dom.body.header;
         if (header.type !== "dom") {
            throw new Error("Header Dynamic Object has incorrect type");
        }
        if (!fx.dom.body.nodes.header) {
            throw new Error("Header Dynamic Object not added to fx.dom.body.nodes");
        }
        testSuite.addTestResult('DOM Plugin - Element Selection', true, testCode);
    } catch (error) {
        testSuite.addTestResult('DOM Plugin - Element Selection', false, `
            const body = fx.dom.$("body");
            const header = fx.dom.body.header;
        `, error.message);
    }

    // Summarize results
    testSuite.summarize();
}
window.addEventListener('DOMContentLoaded', runTests);
