<?php
/**
 * Plugin Name: Newspack
 * Description: An advanced open-source publishing and revenue-generating platform for news organizations.
 * Version: 1.0.0-alpha.9
 * Author: Automattic
 * Author URI: https://newspack.blog/
 * License: GPL2
 * Text Domain: newspack
 * Domain Path: /languages/
 */

defined( 'ABSPATH' ) || exit;

// Define NEWSPACK_PLUGIN_FILE.
if ( ! defined( 'NEWSPACK_PLUGIN_FILE' ) ) {
	define( 'NEWSPACK_PLUGIN_FILE', __FILE__ );
}

// Include the main Newspack class.
if ( ! class_exists( 'Newspack' ) ) {
	include_once dirname( __FILE__ ) . '/includes/class-newspack.php';
}
