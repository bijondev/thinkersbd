<?php
// Our custom post type function
function create_posttype_team() {

 register_post_type( 'team',
 // CPT Options
  array(
   'labels' => array(
    'name' => __( 'Team' ),
    'singular_name' => __( 'Team' )
   ),
   'public' => true,
   'has_archive' => true,
   'rewrite' => array('slug' => 'team'),
  )
 );
}
// Hooking up our function to theme setup
add_post_type_support( 'team', 'thumbnail' );
add_action( 'init', 'create_posttype_team' );


?>