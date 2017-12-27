module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //compass
        compass: {
            dist: {
                options: {
                    sassDir: 'dev/sass',
                    cssDir: 'site',
                    specify: 'dev/sass/style.scss',
                    imagesDir: 'dev/i/'
                }
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dev',
                        src: ['*.html', '*.php', 'js/**/*', 'partials/*.php', 'i/**/*', 'fonts/**/*', 'data/**/*'],
                        dest: 'site/'
                    }
                ]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'ie 10']
            },

            dist: {
                src: 'site/style.css'
            }

        },

        clean: {
            dist: ['site/']

        },

        watch: {
            files: ['dev/**'],
            tasks: ['default'],
            options: {
                livereload: true
            }
        }

    });

    //Load in plugins
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'copy', 'compass', 'autoprefixer']);
}