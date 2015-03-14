module.exports = function (grunt) {
	'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		svg_sprite : {
			basic:{
				expand: true,
				cwd: 'lib/icons',
				dest: 'public/stylesheets',
				src: ['**/*.svg'],
				// Target options
				options: {
					mode: {
						symbol: {
							prefix: 'icon-%s',
							sprite: 'sprite.svg',
							dest:'.'
						}
					}
				}
		}
	}
	});
	grunt.loadNpmTasks('grunt-svg-sprite');
	grunt.registerTask('icons', ['svg_sprite']);
};
