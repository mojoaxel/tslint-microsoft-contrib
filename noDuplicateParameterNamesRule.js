"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var ErrorTolerantWalker = require('./utils/ErrorTolerantWalker');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoDuplicateParameterNamesWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = 'Duplicate parameter name: ';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoDuplicateParameterNamesWalker = (function (_super) {
    __extends(NoDuplicateParameterNamesWalker, _super);
    function NoDuplicateParameterNamesWalker() {
        _super.apply(this, arguments);
    }
    NoDuplicateParameterNamesWalker.prototype.visitMethodDeclaration = function (node) {
        this.validateParameterNames(node);
        _super.prototype.visitMethodDeclaration.call(this, node);
    };
    NoDuplicateParameterNamesWalker.prototype.visitConstructorDeclaration = function (node) {
        this.validateParameterNames(node);
        _super.prototype.visitConstructorDeclaration.call(this, node);
    };
    NoDuplicateParameterNamesWalker.prototype.visitArrowFunction = function (node) {
        this.validateParameterNames(node);
        _super.prototype.visitArrowFunction.call(this, node);
    };
    NoDuplicateParameterNamesWalker.prototype.visitFunctionDeclaration = function (node) {
        this.validateParameterNames(node);
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    NoDuplicateParameterNamesWalker.prototype.visitFunctionExpression = function (node) {
        this.validateParameterNames(node);
        _super.prototype.visitFunctionExpression.call(this, node);
    };
    NoDuplicateParameterNamesWalker.prototype.validateParameterNames = function (node) {
        var _this = this;
        var seenNames = {};
        node.parameters.forEach(function (parameter) {
            var parameterName = parameter.name.text;
            if (parameterName != null) {
                if (seenNames[parameterName]) {
                    _this.addFailure(_this.createFailure(parameter.name.getStart(), parameterName.length, Rule.FAILURE_STRING + '\'' + parameterName + '\''));
                }
                else {
                    seenNames[parameterName] = true;
                }
            }
        });
    };
    return NoDuplicateParameterNamesWalker;
}(ErrorTolerantWalker));
//# sourceMappingURL=noDuplicateParameterNamesRule.js.map