describe('MiniQuery Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="testDiv"></div>
            <input id="testInput" value="initial">
        `;
    });

    test('val() gets and sets values correctly', () => {
        const input = $('#testInput');
        expect(input.val()).toBe('initial');
        input.val('new value');
        expect(input.val()).toBe('new value');
    });

    test('css() gets and sets CSS properties', () => {
        const div = $('#testDiv');
        div.css('color', 'red');
        expect(div.css('color')).toBe('red');
        
        div.css({ backgroundColor: 'blue', margin: '10px' });
        expect(div.css('background-color')).toBe('blue');
        expect(div.css('margin')).toBe('10px');
    });

    test('html() gets and sets innerHTML', () => {
        const div = $('#testDiv');
        div.html('<p>Test</p>');
        expect(div.html()).toBe('<p>Test</p>');
    });

    test('on() attaches event listeners', () => {
        const div = $('#testDiv');
        const mockCallback = jest.fn();
        div.on('click', mockCallback);
        div.elements[0].click();
        expect(mockCallback).toHaveBeenCalled();
    });

    test('MiniQuery handles chained methods correctly', () => {
        const div = $('#testDiv');
        div.css('color', 'red').html('<p>Test</p>');
        expect(div.css('color')).toBe('red');
        expect(div.html()).toBe('<p>Test</p>');
    });

    test('MiniQuery works with multiple elements', () => {
        document.body.innerHTML = `
            <div class="testDiv"></div>
            <div class="testDiv"></div>
        `;
        const divs = $('.testDiv');
        divs.css('color', 'green');
        divs.forEachElement(el => {
            expect(el.style.color).toBe('green');
        });
    });
});
