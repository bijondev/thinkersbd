<?php
// Our custom post type function
function create_posttype_protfolio() {

 register_post_type( 'protfolio',
 // CPT Options
  array(
   'labels' => array(
    'name' => __( 'Protfolio' ),
    'singular_name' => __( 'protfolio' )
   ),
   'public' => true,
   'has_archive' => true,
   'rewrite' => array('slug' => 'protfolio'),
  )
 );
}
// Hooking up our function to theme setup
add_post_type_support( 'protfolio', 'thumbnail' );
add_action( 'init', 'create_posttype_protfolio' );



  register_taxonomy('protfolio-cat','protfolio', array(
    'hierarchical' => true,
    'labels' => $labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'query_var' => true,
    'rewrite' => array( 'slug' => 'protfolio-cat' ),
  ));

?>