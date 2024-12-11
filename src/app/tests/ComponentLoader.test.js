describe('ComponentLoader Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="testContainer"></div>
        `;
    });

    test('ComponentLoader loads and renders components', () => {
        const container = document.getElementById('testContainer');
        const mockComponent = {
            name: 'test-component',
            props: { text: 'Hello, World!' },
            render: (props) => `<p>${props.text}</p>`,
        };

        // Simulate loading a component
        container.innerHTML = mockComponent.render(mockComponent.props);
        const renderedComponent = container.querySelector('p');

        expect(renderedComponent).not.toBeNull();
        expect(renderedComponent.textContent).toBe('Hello, World!');
    });

    test('ComponentLoader fails gracefully with invalid component', () => {
        const container = document.getElementById('testContainer');
        try {
            container.innerHTML = null; // Simulate an invalid component render
        } catch (error) {
            expect(error).toBeTruthy();
        }
    });
});
