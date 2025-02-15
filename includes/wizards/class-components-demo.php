<?php
/**
 * Newspack Temporary Components Demo.
 *
 * @package Newspack
 */

namespace Newspack;

defined( 'ABSPATH' ) || exit;

require_once NEWSPACK_ABSPATH . '/includes/wizards/class-wizard.php';

/**
 * Temporary components demo.
 */
class Components_Demo extends Wizard {

	/**
	 * The slug of this wizard.
	 *
	 * @var string
	 */
	protected $slug = 'newspack-components-demo';

	/**
	 * The capability required to access this wizard.
	 *
	 * @var string
	 */
	protected $capability = 'manage_options';

	/**
	 * Priority setting for ordering admin submenu items.
	 *
	 * @var int.
	 */
	protected $menu_priority = 100;

	/**
	 * Constructor.
	 */
	public function __construct() {
		parent::__construct();

		// Only show a link to the Components Demo if WP_DEBUG is enabled.
		$this->hidden = ! defined( 'WP_DEBUG' ) || ! WP_DEBUG;
	}

	/**
	 * Get the name for this wizard.
	 *
	 * @return string The wizard name.
	 */
	public function get_name() {
		return esc_html__( 'Components demo', 'newspack' );
	}

	/**
	 * Get the description of this wizard.
	 *
	 * @return string The wizard description.
	 */
	public function get_description() {
		return esc_html__( 'A temporary demo of components used to build Newspack', 'newspack' );
	}

	/**
	 * Get the duration of this wizard.
	 *
	 * @return string A description of the expected duration (e.g. '10 minutes').
	 */
	public function get_length() {
		return esc_html__( '2 minutes', 'newspack' );
	}

	/**
	 * Enqueue Subscriptions Wizard scripts and styles.
	 */
	public function enqueue_scripts_and_styles() {
		parent::enqueue_scripts_and_styles();
		wp_enqueue_media();

		if ( filter_input( INPUT_GET, 'page', FILTER_SANITIZE_STRING ) !== $this->slug ) {
			return;
		}

		wp_enqueue_script(
			'newspack-components-demo',
			Newspack::plugin_url() . '/assets/dist/componentsDemo.js',
			$this->get_script_dependencies(),
			filemtime( dirname( NEWSPACK_PLUGIN_FILE ) . '/assets/dist/componentsDemo.js' ),
			true
		);

		wp_register_style(
			'newspack-components-demo',
			Newspack::plugin_url() . '/assets/dist/componentsDemo.css',
			$this->get_style_dependencies(),
			filemtime( dirname( NEWSPACK_PLUGIN_FILE ) . '/assets/dist/componentsDemo.css' )
		);
		wp_style_add_data( 'newspack-components-demo', 'rtl', 'replace' );
		wp_enqueue_style( 'newspack-components-demo' );
	}
}
