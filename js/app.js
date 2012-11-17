
/* globals css3lessplease, less */

var css3lessplease = (function () {
    var parser = new(less.Parser),
        selectors = {
            compile: ".compile"
        }

    function lessParser (less, output) {
        var options = {
            removeComments: true // do this
        }
        parser.parse(less, function (err, tree) {
            if (err) {
                output.html(err);
                return;
            }
            output.html(tree.toCSS());
        });
    }

    return {   
        init: function() {
            // $(".code pre").html($(".code span").html().trim());

            $(selectors.compile).on("click", function () {
                var less,
                    output,
                    $this = $(this).parents(".rule");

                less = $this.find(".code pre").html();
                output = $this.find(".output pre");

                lessParser(less, output);
            });
        }
    }
}());

css3lessplease.init();