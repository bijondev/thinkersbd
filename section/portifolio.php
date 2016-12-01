<!-- ========== portifolio ========== -->
<section id="portifolio" class="portifolio block-area">
  <div class="container">
    <div class="center title-section wow fadeInDown">
      <h5>CKECK IT OUR</h5>
      <h3 class="lrg">PORTITOLIO</h3>
      <div class="separator"> <span><i></i></span> </div>
    </div>
    <!-- title-section -->
    
    <div class="row">
      <div class="col-md-12">
        <div class="portfolio-filter"> 
        <a href="#" class="filter transition active" data-filter="*">All</a> 
        <?php
$args = array(
    'taxonomy'      => 'protfolio-cat',
    'parent'        => 0, // get top level categories
    'orderby'       => 'name',
    'order'         => 'ASC',
    'hierarchical'  => 1,
    'pad_counts'    => 0
);

$categories = get_categories( $args );
//print_r($categories);
foreach ( $categories as $category ){
?>
<a href="#" class="filter transition" data-filter=".<?php echo $category->slug; ?>"><?php echo $category->name ?></a> 
<?php
  //echo "<li class='m_right_5 m_bottom_10 m_xs_bottom_5 animate_ftr'><button class='button_type_2 bg_light_color_1 r_corners tr_delay_hover tt_uppercase box_s_none' data-filter='.".$category->slug."'>".$category->name."</button></li>";

    $sub_args = array(
        'taxonomy'      => 'protfolio-cat',
        'parent'        => $category->term_id, // get child categories
        'orderby'       => 'name',
        'order'         => 'ASC',
        'hierarchical'  => 1,
        'pad_counts'    => 0
    );

    $sub_categories = get_categories( $sub_args );

    foreach ( $sub_categories as $sub_category ){

       // echo '<li><a href="#" data-filter=".'. $sub_category->name . '" rel="'. $sub_category->name . '">'. $sub_category->name . '</a></li>';
      //echo "<li class='m_right_5 m_bottom_10 m_xs_bottom_5 animate_ftr'><button class='button_type_2 bg_light_color_1 r_corners tr_delay_hover tt_uppercase box_s_none' data-filter='.".$sub_category->slug."'>".$sub_category->name."</button></li>";

    }

}
?>

          
          <!-- <a href="#" class="filter transition" data-filter=".branding">Branding</a> 
          <a href="#" class="filter transition" data-filter=".illustration">Illustration</a> 
          <a href="#" class="filter transition" data-filter=".web-design">Web Design</a> 
          <a href="#" class="filter transition" data-filter=".print">Print</a> -->
           </div>
        <!-- end filter --> 
      </div>
      <!-- end col --> 
    </div>
    <!-- end row -->
    
    <div class="grid masonry"> 
      <?php
            $params = array('posts_per_page' => -1, 'post_type' => 'protfolio');
            $wc_query = new WP_Query($params);
            ?>
                 <?php if ($wc_query->have_posts()) : ?>
                 <?php while ($wc_query->have_posts()) :
                            $wc_query->the_post(); ?>
                 <!--product item-->
                 <?php 
            $terms = get_the_terms( $post->ID, 'protfolio-cat' );

            $thumb_id = get_post_thumbnail_id();
            $thumb_url = wp_get_attachment_image_src($thumb_id,'medium', true);
            $thumb_url_large = wp_get_attachment_image_src($thumb_id,'larger', true);
            //echo $thumb_url[0];
             ?>
      <!-- work item -->
      <div class="masonry-item web-design  wow fadeInUp <?php foreach ($terms as $term) { echo $term->slug." ";
                  $sub_args = array(
                    'taxonomy'      => 'protfolio-cat',
                    'parent'        => $category->term_id, // get child categories
                    'orderby'       => 'name',
                    'order'         => 'ASC',
                    'hierarchical'  => 1,
                    'pad_counts'    => 0
                );

                $sub_categories = get_categories( $sub_args );
                foreach ( $sub_categories as $sub_category ){
                echo $sub_category->slug." ";
            }

             } ?>" data-wow-delay=".1s">
        <div class="work-img">
          <figure class="portfolio-effect"> <img src="<?php echo $thumb_url[0]; ?>" alt="<?php the_title(); ?>">
            <figcaption>
              <h3>A4 Paper Mockup</h3>
              <a href="<?php echo $thumb_url_large[0]; ?>" class="lightbox-gallery" title=""><i class="fa fa-search"></i></a> </figcaption>
          </figure>
        </div>
      </div>
      <!-- end work-item --> 
      <?php endwhile; ?>
     <?php wp_reset_postdata(); ?>
     <?php else:  ?>
      <li>
          <?php _e( 'No Products' ); ?>
     </li>
      <?php endif; ?>
      
      
      
    </div>
    <!-- end grid --> 
  </div>
  <!-- .container --> 
</section>