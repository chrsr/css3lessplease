
/* globals css3lessplease, less */

var css3lessplease = (function () {
    var parser = new(less.Parser),
        selectors = {
            compile: ".compile",
            css: "#css"
        };

    function lessParser(less, output) {
        var options = {
            removeComments: true // do this
        },
        css;
        parser.parse(less, function (err, tree) {
            if (err) {
                output.html(err);
                return;
            }
            css = tree.toCSS();
            output.html(css);
            applyCss(css);
        });
    }

    function applyCss(css) {
        $(selectors.css).append(css);
    }

    return {
        init: function () {
            $(selectors.compile).on("click", function () {
                var less,
                    output,
                    $this = $(this).parents(".rule");

                less = $this.find(".code pre").html();
                output = $this.find(".output pre");

                lessParser(less, output);
            });
        }
    };
}());

css3lessplease.init();