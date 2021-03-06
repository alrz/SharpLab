import Vue from 'vue';
import { cases, loadComponentTemplate, renderComponent } from './helpers.js';
import outputViewGraphSettings from '../../components/internal/app-output-view-graph.js';

const OutputViewGraph = Vue.component('x', outputViewGraphSettings);

beforeEach(() => loadComponentTemplate('app-output-view-graph', 'internal'));

test.each(cases)('empty%s', async (_, bodyClass) => {
    const view = createView({ inspection: {
        stack: [],
        heap: [],
        references: []
    } });

    const rendered = await renderComponent(view, { bodyClass });

    expect(rendered).toMatchImageSnapshot();
});

// TODO: this is currently a mess as we can't auto-layout without the sizes
/*test.each(cases)('detailed%s', async (_, bodyClass) => {
    const view = createView({ inspection: detailedInspection });

    const rendered = await renderView(view, { bodyClass });

    expect(rendered).toMatchImageSnapshot();
});*/

function createView({ inspection }) {
    return new OutputViewGraph({
        el: document.createElement('div'),
        propsData: { inspection }
    });
}