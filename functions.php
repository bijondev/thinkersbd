<?php
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 825, 510, true );

	include 'admin/post-type-protfolio.php';
	include 'admin/post-type-client.php';
	include 'admin/post-type-service.php';
	include 'admin/post-type-team.php';
?>