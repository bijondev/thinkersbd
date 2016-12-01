<?php
// Our custom post type function
function create_posttype_client() {

 register_post_type( 'client',
 // CPT Options
  array(
   'labels' => array(
    'name' => __( 'Client' ),
    'singular_name' => __( 'Client' )
   ),
   'public' => true,
   'has_archive' => true,
   'rewrite' => array('slug' => 'client'),
  )
 );
}
// Hooking up our function to theme setup
add_post_type_support( 'client', 'thumbnail' );
add_action( 'init', 'create_posttype_client' );


?>