
/* globals css3lessplease, less */

var css3lessplease = (function () {
    var parser = new(less.Parser),
        selectors = {
            compileLess: ".compile .compile-less",
            compileScss: ".compile-scss",
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

    function scssParser(scss, output) {
        // do this in node.js
        $.post("http://sass-lang.com/try.html", { syntax: "scss" }, function (response) {
            //output.html(response);
        });
    }

    function applyCss(css) {
        $(selectors.css).append(css);
    }

    return {
        init: function () {

            $(selectors.compileLess).on("click", function () {
                var less,
                    output,
                    $this = $(this).parents(".rule");

                less = $this.find(".code pre.less").html();
                output = $this.find(".output pre");

                lessParser(less, output);
            });

            $(selectors.compileScss).on("click", function () {
                var scss,
                    output,
                    $this = $(this).parents(".rule");

                scss = $this.find(".code pre.scss").html();
                output = $this.find(".output pre");

                scssParser(scss, output);
            });

        }
    };
}());

css3lessplease.init();