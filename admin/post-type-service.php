<?php
// Our custom post type function
function create_posttype_service() {

 register_post_type( 'service',
 // CPT Options
  array(
   'labels' => array(
    'name' => __( 'Service' ),
    'singular_name' => __( 'Service' )
   ),
   'public' => true,
   'has_archive' => true,
   'rewrite' => array('slug' => 'service'),
  )
 );
}
// Hooking up our function to theme setup
add_post_type_support( 'service', 'thumbnail' );
add_action( 'init', 'create_posttype_service' );


?>