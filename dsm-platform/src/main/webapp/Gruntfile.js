module.exports = function (grunt) {

    grunt.initConfig({
        ts: {
            dsmPlatform: {
                src: ["app/**/*.ts"],
                out: "resources/js/compiled/dsm-platform.js"
            },
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts:dsmPlatform"]);
}
