
/* =========================================================================
 * Svelto - Tasks - Build - SCSS - Parts - Keyframes
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp    = require ( 'gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'keyframes', true );

task.description = '[DEV] Build scss keyframes';

/* GULP */

gulp.task ( 'build-scss-keyframes', task );
