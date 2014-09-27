var gulp           = require('gulp');
var fs             = require('fs');
var inquirer       = require('inquirer');
var getDirectories = require('../util/getDirectories');
var config         = require('../config');

gulp.task('promptForChoices', function(done) {

	var prompts = [{
		type: 'confirm',
		name: 'packageToJPT',
		message: 'Do you want to package to JPT?',
		default: false
	}];

	var graphicChoices = getDirectories('graphics');

	if (graphicChoices.length > 1) {
		prompts.unshift({
			type: 'list',
			name: 'graphicName',
			message: 'Choose a graphic',
			choices: graphicChoices
		});
	}

	inquirer.prompt(prompts, function(answers1) {

		var chosenGraphic = answers1.graphicName || graphicChoices[0];
		var chosenGraphicType = JSON.parse(fs.readFileSync('graphics/' + chosenGraphic + '/graphicType.json', {encoding: 'utf8'})).graphicType;

		if (!answers1.packageToJPT && chosenGraphicType === 'igraphic') {

			// ask what kind of template we want
			inquirer.prompt([{
				type: 'list',
				name: 'igraphicType',
				message: 'Choose an igraphic template',
				choices: ['regular', 'linked']	
			}], function(answers2) {
		
				// set global variables - not sure how else to pass params to gulp
				// also, apparently "Tasks should never take parameters"
				// see https://github.com/orchestrator/orchestrator/issues/17
				config.setUserChoice('graphic', chosenGraphic);
				config.setUserChoice('template', '-' + answers2.igraphicType);
				done();
			});
		} else {

			config.setUserChoice('graphic', chosenGraphic);
			config.setUserChoice('packageToJPT', answers1.packageToJPT);
			config.setUserChoice('template', '');
			done();
		}

	});
});