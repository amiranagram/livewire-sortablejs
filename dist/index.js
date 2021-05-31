(function(global,factory){if(typeof define==="function"&&define.amd){define(["sortablejs","./utils"],factory)}else if(typeof exports!=="undefined"){factory(require("sortablejs"),require("./utils"))}else{var mod={exports:{}};factory(global.sortablejs,global.utils);global.index=mod.exports}})(typeof globalThis!=="undefined"?globalThis:typeof self!=="undefined"?self:this,function(_sortablejs,_utils){"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");_sortablejs=_interopRequireDefault(_sortablejs);if(typeof window.livewire==="undefined"){throw"Livewire SortableJS: window.livewire is undefined. Make sure @livewireScripts is placed above this script include"}window.livewire.directive("sortable",function(el,directive,component){// Only fire the rest of this handler on the "root" directive.
if(directive.modifiers.length>0)return;var options={};var selectableConfigAttributes=["handle"];var valuableConfigAttributes=["group","animation"];selectableConfigAttributes.forEach(function(item){if(el.querySelector("[wire\\:sortable\\.".concat(item,"]"))){options[item]="[wire\\:sortable\\.".concat(item,"]")}});valuableConfigAttributes.forEach(function(item){if(el.hasAttribute("wire:sortable.".concat(item))){var attrValue=el.getAttribute("wire:sortable.".concat(item));options[item]=(0,_utils.isJson)(attrValue)?JSON.parse(attrValue):attrValue}});options.onEnd=function(){var items=[];el.querySelectorAll("[wire\\:sortable\\.item]").forEach(function(el,index){items.push({order:index+1,value:el.getAttribute("wire:sortable.item")})});component.call(directive.method,items)};var sortable=_sortablejs.default.create(el,options)})});