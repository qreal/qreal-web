module.exports = function (grunt) {

    grunt.initConfig({
        ts: {
            separateExample: {
                src: ["app/**/*.ts"],
                out: "resources/js/compiled/separate-example.js"
            },
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts:separateExample"]);
}
