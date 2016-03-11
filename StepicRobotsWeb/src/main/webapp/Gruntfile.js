module.exports = function (grunt) {

    grunt.initConfig({
        ts: {
            diagramStepic: {
                src: ["app/diagram/**/*.ts", "app/constants/*.ts"],
                out: "resources/js/compiled/diagram-stepic.js"
            },
            checkerCore: {
                src: ["app/checker/**/*.ts"],
                out: "resources/js/compiled/checker-core.js"
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts:diagramStepic", "ts:checkerCore"]);
}
