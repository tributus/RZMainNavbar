module.exports = function (grunt) {
    var mode = 'dbg';
    grunt.initConfig({
            options: {
                srcFiles: [
                    "src/MainNavbarWidgetHelpers.js",
                    "src/MainNavbar.RenderingHelpers.js",
                    "src/MainNavbarWidget.js"
                ],
                demoRefsFiles: [
                    "dist/extensions/MenuitemRenderers/defaultUserMenuItemRenderer/defaultUserMenuItemRenderer.js",
                    "dist/extensions/MenuitemRenderers/defaultUserMenuItemRendererWithLabel/defaultUserMenuItemRendererWithLabel.js",
                    "src/MainNavbarWidgetHelpers.js",
                    "src/MainNavbar.RenderingHelpers.js",
                    "src/MainNavbarWidget.js"
                ],
                setupCSSRefs: function () {
                    var fname = (mode=='min')?"RZMainNavbar.min.css":"RZMainNavbar.css";
                    return '<link href="../dist/*" rel="stylesheet" type="text/css" media="all"/>'.replace("*",fname);
                },
                setupJSRefs: function (js_files) {
                    if (mode=="dbg") {
                        var basestr = '<script src="../*" type="text/javascript"></script>\n        ';
                        var jsDeclarations = '';
                        js_files.forEach(function (item) {
                            //var fileParts = item.split('/');
                            //jsDeclarations += basestr.replace("*", fileParts[fileParts.length - 1]);
                            jsDeclarations += basestr.replace("*", item);
                        });
                        return jsDeclarations;
                    }
                    else {
                        var js = (mode=='min') ? "RZMainNavbar.min.js":"RZMainNavbar.js";
                        return '<script src="../dist/*" type="text/javascript"></script>'.replace("*",js);
                    }
                }
            },
            concat: {
                dist: {
                    src: ['<%= options.srcFiles %>'],
                    dest: "dist/RZMainNavbar.js"
                }
            },
            uglify: {
                options: {
                    mangle: false
                },
                my_target: {
                    files: {
                        "dist/RZMainNavbar.min.js": ['dist/RZMainNavbar.js']
                    }
                },
                defaultUserMenuItemRenderer:{
                    files:{
                        "dist/extensions/MenuitemRenderers/defaultUserMenuItemRenderer/defaultUserMenuItemRenderer.min.js": ['src/extensions/MenuitemRenderers/defaultUserMenuItemRenderer/defaultUserMenuItemRenderer.js']
                    }
                },
                defaultUserMenuItemRendererWithLabel:{
                    files:{
                        "dist/extensions/MenuitemRenderers/defaultUserMenuItemRendererWithLabel/defaultUserMenuItemRendererWithLabel.min.js": ['src/extensions/MenuitemRenderers/defaultUserMenuItemRendererWithLabel/defaultUserMenuItemRendererWithLabel.js']
                    }
                }
            },
            less: {
                default: {
                    options: {
                        compress: false
                    },
                    files: {
                        'dist/RZMainNavbar.css': 'src/style/style.less'
                    }
                },
                compact: {
                    options: {
                        compress: true
                    },
                    files: {
                        'dist/RZMainNavbar.min.css': 'src/style/style.less'
                    }
                },
                 icon_semantic_ui: {
                    options: {
                        compress: true
                    },
                    files: {
                        'dist/semantic-ui/icon.min.css': 'src/style/icon.less'
                    }
                }
            },
        copy:{
            html_debug: {
                options: {
                    processContent: function (content) {
                        mode = 'dbg';
                        return grunt.template.process(content);
                    }
                },
                src: 'src/demo-templates/demo.html.ejs',
                dest: 'demo/index-dbg.html'
            },
            html_min: {
                options: {
                    processContent: function (content) {
                        mode = 'min';
                        return grunt.template.process(content);
                    }
                },
                src: 'src/demo-templates/demo.html.ejs',
                dest: 'demo/index-min.html'
            },
            html_default: {
                options: {
                    processContent: function (content) {
                        mode = 'default';
                        return grunt.template.process(content);
                    }
                },
                src: 'src/demo-templates/demo.html.ejs',
                dest: 'demo/index.html'
            },
            manifest:{
                src: 'manifest.json',
                dest: 'dist/manifest.json'
            },
            ext_defaultUserMenuItemRenderer:{
               dest:"dist/extensions/MenuitemRenderers/defaultUserMenuItemRenderer/defaultUserMenuItemRenderer.js",
               src: 'src/extensions/MenuitemRenderers/defaultUserMenuItemRenderer/defaultUserMenuItemRenderer.js'
            },
            ext_defaultUserMenuItemRendererWithLabel:{
                dest: "dist/extensions/MenuitemRenderers/defaultUserMenuItemRendererWithLabel/defaultUserMenuItemRendererWithLabel.js",
                src:'src/extensions/MenuitemRenderers/defaultUserMenuItemRendererWithLabel/defaultUserMenuItemRendererWithLabel.js'
            },
            ext_defaultUserMenuItemRenderer_manifest:{
               dest:"dist/extensions/MenuitemRenderers/defaultUserMenuItemRenderer/manifest.json",
               src: 'src/extensions/MenuitemRenderers/defaultUserMenuItemRenderer/manifest.json'
            },
            ext_defaultUserMenuItemRendererWithLabel_manifest:{
                dest: "dist/extensions/MenuitemRenderers/defaultUserMenuItemRendererWithLabel/manifest.json",
                src:'src/extensions/MenuitemRenderers/defaultUserMenuItemRendererWithLabel/manifest.json'
            },
            semantic_ui_icon:{
                dest: "dist/semantic-ui/icon.css",
                src:'src/style/icon.less'
            }

            /*,demo_js:{
                expand:true,
                flatten:true,
                filter:'isFile',
                src: ['<%= options.srcFiles %>','dist/RZMainNavbar.min.css','dist/RZMainNavbar.css','dist/RZMainNavbar.min.js','dist/RZMainNavbar.js'],
                dest: "demo/"

            }*/
        }
        }
    )
    ;
// Plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['concat', 'uglify', 'less','copy']);

}
;