/**
 * then steps
 */

module.exports = function (dict) {
    this
        .then(/^I expect that the title is( not)* "$string"$/,
            require('../support/check/checkTitle'))

        .then(/^I expect that element "$string" is( not)* visible$/,
            require('../support/check/isVisible'))

        .then(/^I expect that element "$string" becomes( not)* visible$/,
            require('../support/action/waitForVisible'))

        .then(/^I expect that element "$string" is( not)* within the viewport$/,
            require('../support/check/checkWithinViewport'))

        .then(/^I expect that element "$string" does( not)* exist$/,
            require('../support/check/isExisting'))

        .then(/^I expect that element "$string" does( not)* contain the same text as element "$string"$/,
            require('../support/check/compareText'))

        .then(/^I expect that (element|inputfield) "$string"( not)* contains the text "$string"$/,
            require('../support/check/checkContent'))

        .then(/^I expect that (element|inputfield) "$string" does( not)* contain any text$/,
            require('../support/check/checkContent'))

        .then(/^I expect that (element|inputfield) "$string" is( not)* empty$/,
            require('../support/check/checkContainsText'))

        .then(/^I expect that the url is( not)* "$string"$/,
            require('../support/check/checkURL'))

        .then(/^I expect that the path is( not)* "$string"$/,
            require('../support/check/checkURLPath'))

        .then(/^I expect the url to( not)* contain "$string"$/,
            require('../support/check/checkInURLPath'))

        .then(/^I expect that the( css)* attribute "$string" from element "$string" is( not)* "$string"$/,
            require('../support/check/checkProperty'))

        .then(/^I expect that checkbox "$string" is( not)* checked$/,
            require('../support/check/checkSelected'))

        .then(/^I expect that element "$string" is( not)* selected$/,
            require('../support/check/checkSelected'))

        .then(/^I expect that element "$string" is( not)* enabled$/,
            require('../support/check/isEnabled'))

        .then(/^I expect that cookie "$string"( not)* contains "$string"$/,
            require('../support/check/checkCookieContent'))

        .then(/^I expect that cookie "$string"( not)* exists$/,
            require('../support/check/checkCookieExists'))

        .then(/^I expect that element "$string" is( not)* ([\d]+)px (broad|tall)$/,
            require('../support/check/checkDimension'))

        .then(/^I expect that element "$string" is( not)* positioned at ([\d]+)px on the (x|y) axis$/,
            require('../support/check/checkOffset'))

        .then(/^I expect that element "$string" (has|does not have) the class "$string"$/,
            require('../support/check/checkClass'))

        .then(/^I expect a new (window|tab) has( not)* been opened$/,
            require('../support/check/checkNewWindow'))

        .then(/^I expect the url "$string" is opened in a new (tab|window)$/,
            require('../support/check/checkIsOpenedInNewWindow'))

        .then(/^I expect that element "$string" is( not)* focused$/,
            require('../support/check/checkFocus'))

        .then(/^I wait on element "$string"( for (\d+)ms)*( to( not)* (be checked|be enabled|be selected|be visible|contain a text|contain a value|exist))*$/,
            require('../support/action/waitfor'))

        .then(/^I expect that a (alertbox|confirmbox|prompt) is( not)* opened$/,
            require('../support/check/checkModal'))

        .then(/^I expect that a (alertbox|confirmbox|prompt)( not)* contains the text "$text"$/,
            require('../support/check/checkModalText'))

        .then(/^I expect the url to contain the url for the question with ID "$string"/, function(id, done) {
            var that = this;
            this.browser
                .url()
                .then(function(result) {
                    var value = "/questions/view?q=" + that.questions[id].id;
                    result.value.should.contain(value, 'Expected URL (' + result.value + ') to contain "' + value + '"');
                })
                .call(done);
        })

        .then(/^I expect the page to( not)* contain the question with ID "$string"$/, function(falseCase, id, done) {
            var titleId = "#q" + this.questions[id].id + "_title";
            this.browser
                .elements(titleId)
                .then(function (elements) {
                    if (falseCase) {
                        expect(elements.value).to.have.length(0, 'expected element "' + elements + '" not to exist');
                    } else {
                        expect(elements.value).to.have.length.above(0, 'expected element "' + elements + '" to exist');
                    }
                })
                .call(done);
        })

        .then(/^I expect the page to( not)* contain the argument with ID "$string"$/, function(falseCase, id, done) {
            var textId = "#a" + this.arguments[id].id + "_text";
            this.browser
                .elements(textId)
                .then(function (elements) {
                    if (falseCase) {
                        expect(elements.value).to.have.length(0, 'expected element "' + elements + '" not to exist');
                    } else {
                        expect(elements.value).to.have.length.above(0, 'expected element "' + elements + '" to exist');
                    }
                })
                .call(done);
        })

        .then(/^I expect the question with ID "$string" to( not)* have a score of "$string"$/, function(id, falseCase, score, done) {
            var scoreId = "#q" + this.questions[id].id + "_count";
            this.browser.getText(scoreId)
                .then(function (text) {
                    if (falseCase) {
                        score.should.not.equal(text);
                    } else {
                        score.should.equal(text);
                    }
                })
                .call(done);
        })

        .then(/^I expect the argument with ID "$string" to( not)* have a score of "$string"$/, function(id, falseCase, score, done) {
            var scoreId = "#a" + this.arguments[id].id + "_count";
            this.browser.getText(scoreId)
                .then(function (text) {
                    if (falseCase) {
                        score.should.not.equal(text);
                    } else {
                        score.should.equal(text);
                    }
                })
                .call(done);
        })
};
