/**
 * Engagement Wizard
 */

/**
 * WordPress dependencies
 */
import { Component, render, Fragment } from '@wordpress/element';
import { ExternalLink, SVG, Path } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { withWizard } from '../../components/src';
import {
	Commenting,
	CommentingDisqus,
	CommentingNative,
	CommentingCoral,
	Newsletters,
	Social,
	UGC,
} from './views';

/**
 * External dependencies
 */
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

/**
 * Engagement wizard.
 */
class EngagementWizard extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			apiKey: '',
			connected: false,
			connectURL: '',
			wcConnected: false,
		};
	}

	/**
	 * Figure out whether to use the WooCommerce or Jetpack Mailchimp wizards and get appropriate settings.
	 */
	onWizardReady = () => {
		this.getSettings();
	};

	/**
	 * Get settings for the current wizard.
	 */
	getSettings() {
		const { setError, wizardApiFetch } = this.props;
		return wizardApiFetch( {
			path: '/newspack/v1/wizard/newspack-engagement-wizard/connection-status',
		} )
			.then( info => {
				this.setState( {
					...info,
				} );
			} )
			.catch( error => {
				setError( error );
			} );
	}

	/**
	 * Render
	 */
	render() {
		const { pluginRequirements } = this.props;
		const { apiKey, connected, connectURL, wcConnected } = this.state;
		const tabbed_navigation = [
			{
				label: __( 'Newsletters' ),
				path: '/newsletters',
				exact: true,
			},
			{
				label: __( 'Social' ),
				path: '/social',
				exact: true,
			},
			{
				label: __( 'Commenting' ),
				path: '/commenting/',
			},
			{
				label: __( 'UGC' ),
				path: '/user-generated-content',
			},
		];
		const commentingSecondaryNavigation = [
			{
				label: __( 'Disqus' ),
				path: '/commenting/disqus',
				exact: true,
			},
			{
				label: __( 'WordPress Discussion' ),
				path: '/commenting/native',
				exact: true,
			},
			{
				label: __( 'The Coral Project' ),
				path: '/commenting/coral',
				exact: true,
			},
		];
		const headerIcon = (
			<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<Path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
			</SVG>
		);
		const subheader = __( 'Newsletters, social, commenting, UGC' );
		return (
			<Fragment>
				<HashRouter hashType="slash">
					<Switch>
						{ pluginRequirements }
						<Route
							path="/newsletters"
							render={ routeProps => (
								<Newsletters
									noBackground
									headerIcon={ headerIcon }
									headerText={ __( 'Engagement', 'newspack' ) }
									subHeaderText={ subheader }
									tabbedNavigation={ tabbed_navigation }
									apiKey={ apiKey }
									connected={ connected }
									connectURL={ connectURL }
									wcConnected={ wcConnected }
									onChange={ apiKey => this.setState( { apiKey } ) }
								/>
							) }
						/>
						<Route
							path="/social"
							exact
							render={ routeProps => {
								const { apiKey } = this.state;
								return (
									<Social
										noBackground
										headerIcon={ headerIcon }
										headerText={ __( 'Engagement', 'newspack' ) }
										subHeaderText={ subheader }
										tabbedNavigation={ tabbed_navigation }
									/>
								);
							} }
						/>
						<Route
							path="/commenting"
							exact
							render={ routeProps => <Redirect to="/commenting/disqus" /> }
						/>
						<Route
							path="/commenting/disqus"
							exact
							render={ routeProps => (
								<CommentingDisqus
									noBackground
									headerIcon={ headerIcon }
									headerText={ __( 'Engagement', 'newspack' ) }
									subHeaderText={ subheader }
									tabbedNavigation={ tabbed_navigation }
									connected={ connected }
									connectURL={ connectURL }
									secondaryNavigation={ commentingSecondaryNavigation }
								/>
							) }
						/>
						<Route
							path="/commenting/native"
							exact
							render={ routeProps => (
								<CommentingNative
									noBackground
									headerIcon={ headerIcon }
									headerText={ __( 'Engagement', 'newspack' ) }
									subHeaderText={ subheader }
									tabbedNavigation={ tabbed_navigation }
									connected={ connected }
									connectURL={ connectURL }
									secondaryNavigation={ commentingSecondaryNavigation }
								/>
							) }
						/>
						<Route
							path="/commenting/coral"
							exact
							render={ routeProps => (
								<CommentingCoral
									noBackground
									headerIcon={ headerIcon }
									headerText={ __( 'Engagement', 'newspack' ) }
									subHeaderText={ subheader }
									tabbedNavigation={ tabbed_navigation }
									connected={ connected }
									connectURL={ connectURL }
									secondaryNavigation={ commentingSecondaryNavigation }
								/>
							) }
						/>
						<Route
							path="/user-generated-content"
							exact
							render={ routeProps => (
								<UGC
									noBackground
									headerIcon={ headerIcon }
									headerText={ __( 'Engagement', 'newspack' ) }
									subHeaderText={ subheader }
									tabbedNavigation={ tabbed_navigation }
								/>
							) }
						/>
						<Redirect to="/newsletters" />
					</Switch>
				</HashRouter>
			</Fragment>
		);
	}
}

render(
	createElement( withWizard( EngagementWizard, [ 'jetpack' ] ) ),
	document.getElementById( 'newspack-engagement-wizard' )
);
