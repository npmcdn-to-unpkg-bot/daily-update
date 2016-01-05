System.register(['angular2/src/facade/lang', 'angular2/src/platform/dom/dom_adapter', 'angular2/core'], function(exports_1) {
    var lang_1, dom_adapter_1, core_1;
    var PublicTestability, BrowserGetTestability;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            PublicTestability = (function () {
                function PublicTestability(testability) {
                    this._testability = testability;
                }
                PublicTestability.prototype.isStable = function () { return this._testability.isStable(); };
                PublicTestability.prototype.whenStable = function (callback) { this._testability.whenStable(callback); };
                PublicTestability.prototype.findBindings = function (using, provider, exactMatch) {
                    return this.findProviders(using, provider, exactMatch);
                };
                PublicTestability.prototype.findProviders = function (using, provider, exactMatch) {
                    return this._testability.findBindings(using, provider, exactMatch);
                };
                return PublicTestability;
            })();
            BrowserGetTestability = (function () {
                function BrowserGetTestability() {
                }
                BrowserGetTestability.init = function () { core_1.setTestabilityGetter(new BrowserGetTestability()); };
                BrowserGetTestability.prototype.addToWindow = function (registry) {
                    lang_1.global.getAngularTestability = function (elem, findInAncestors) {
                        if (findInAncestors === void 0) { findInAncestors = true; }
                        var testability = registry.findTestabilityInTree(elem, findInAncestors);
                        if (testability == null) {
                            throw new Error('Could not find testability for element.');
                        }
                        return new PublicTestability(testability);
                    };
                    lang_1.global.getAllAngularTestabilities = function () {
                        var testabilities = registry.getAllTestabilities();
                        return testabilities.map(function (testability) { return new PublicTestability(testability); });
                    };
                };
                BrowserGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
                    if (elem == null) {
                        return null;
                    }
                    var t = registry.getTestability(elem);
                    if (lang_1.isPresent(t)) {
                        return t;
                    }
                    else if (!findInAncestors) {
                        return null;
                    }
                    if (dom_adapter_1.DOM.isShadowRoot(elem)) {
                        return this.findTestabilityInTree(registry, dom_adapter_1.DOM.getHost(elem), true);
                    }
                    return this.findTestabilityInTree(registry, dom_adapter_1.DOM.parentElement(elem), true);
                };
                return BrowserGetTestability;
            })();
            exports_1("BrowserGetTestability", BrowserGetTestability);
        }
    }
});
//# sourceMappingURL=testability.js.map