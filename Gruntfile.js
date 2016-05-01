module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        }
        , watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
        , serve: {
            options: {
                port: 8080
                ,path: "./src/main/webapp"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-serve');
    grunt.registerTask('default', ['jshint']);
    
    

};
