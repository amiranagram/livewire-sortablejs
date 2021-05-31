import Sortable from 'sortablejs';
import {isJson} from './utils';

if (typeof window.livewire === 'undefined') {
    throw 'Livewire SortableJS: window.livewire is undefined. Make sure @livewireScripts is placed above this script include'
}

window.livewire.directive('sortable', (el, directive, component) => {
    // Only fire the rest of this handler on the "root" directive.
    if (directive.modifiers.length > 0) return

    const options = {};
    const selectableConfigAttributes = ['handle'];
    const valuableConfigAttributes = ['group', 'animation'];

    selectableConfigAttributes.forEach((item) => {
        if (el.querySelector(`[wire\\:sortable\\.${item}]`)) {
            options[item] = `[wire\\:sortable\\.${item}]`;
        }
    });

    valuableConfigAttributes.forEach((item) => {
        if (el.hasAttribute(`wire:sortable.${item}`)) {
            const attrValue = el.getAttribute(`wire:sortable.${item}`);
            options[item] = isJson(attrValue) ? JSON.parse(attrValue) : attrValue;
        }
    })

    options.onEnd = () => {
        let items = []

        el.querySelectorAll('[wire\\:sortable\\.item]').forEach((el, index) => {
            items.push({ order: index + 1, value: el.getAttribute('wire:sortable.item')})
        })

        component.call(directive.method, items)
    }

    const sortable = Sortable.create(el, options);
});
