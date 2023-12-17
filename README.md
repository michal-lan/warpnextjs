# WarpNext.js

WarpNext.js is a framework that allows developers building front-end
applications with headless WordPress on the back-end. It's provides support for
Gutenberg Content/ACF Blocks, Custom Page builder in ACF (Flexible Content) and
more (JWT auth, app structure, custom post types, categories/tags, pagination,
menus, sitemap, metadata) and it's built to serve SSG/Static type of application
for Ultra speed and great SEO Optimization.

## Requirements

-   NodeJS v18.18.2 or newer

_TIP: if you are using NVM, you can use `nvm use` inside root directory of
application (but may require installation of node version)_

## WordPress Plugins

All plugins are required to be installed on headless WordPress. _You can use
this without paid ACF version (just do not use attached PageBuilder)_

-   ACF Content Analysis for Yoast SEO:
    https://wordpress.org/plugins/acf-content-analysis-for-yoast-seo/
-   Add WPGraphQL SEO: https://wordpress.org/plugins/add-wpgraphql-seo/
-   Advanced Custom Fields PRO: https://www.advancedcustomfields.com/
-   WarpNext.js WP Plugin: https://github.com/michal-lan/warpnextjs-wp-plugin
-   WPGraphQL: https://wordpress.org/plugins/wp-graphql/
-   WPGraphQL Blocks: https://wordpress.org/plugins/wpgraphql-blocks/
-   WPGraphQL for Advanced Custom Fields: https://wpgraphql.com/acf
-   WPGraphQL JWT Authentication:
    https://github.com/wp-graphql/wp-graphql-jwt-authentication
-   WPGraphQL Offset Pagination:
    https://github.com/valu-digital/wp-graphql-offset-pagination
-   Yoast SEO: https://wordpress.org/plugins/wordpress-seo/

_TIP: If the plugin is avaiable only on Github, download the .zip file and
install through the WordPress Admin or put it inside your `wp-content/plugins/`
directory_

## 🚀 Quick start

1. Download and go to the project directory
2. Change .env.example to .env (or adjust to development/production
   environments)
3. Change parameters inside .env

4. If you are owner of ACF PRO, uncomment pageBuilder in:
   `pageFields.fragment.graphql` and `app/page.tsx`
5. Run `npm install` to install dependencies
6. Run `npm run compile` to generate graphql queries
7. Run Application `npm run dev` after all required steps contained below.

#### Additional Options/Tips

-   If you would like to override the theme styles or wordpress style, check
    `styles/globals.scss`
-   Add a slug of page (WordPress Pages) inside `constants/CustomPages.ts` if
    you created a directory for custom page - it's needed to provide full
    SSG/Static Application.
-   If you need to override paths for Sitemap.xml, just add it inside
    `constants/slugOverride.ts`

### WordPress Quick start

1. Install and Activate required plugins that are listed below
2. Create Page `HomePage` and `Blog`
3. Go to Settings->Reading and set `Your homepage displays` to the
   `A static page (select below)` and select created pages.
4. Go to Settings->Reading and set `Search engine visibility` to be NOT checked!
5. Go to Settings->Permalinks and set `Permalink structure` to `Post name`
6. Go to GraphlQL->Settings and turn on `Enable Public Introspection`
7. Go to Appearance->Menus and create eg. `Main menu` and in Menu Settings
   select `Display location` to `Primary`
8. Change the defined url `NEXTJS_APP_URL` in
   `wp-content/plugins/warpnextjs-wp-plugin/warpnextjs-wp-plugin.php` - that
   should be url of front-end app

### PageBuilder Instructions

If you are owner of ACF PRO, go to ACF->Field Groups and create Group named
`Page builder`, inside add field named: `Page builder` and set Field Type to
`Flexible Content`.

1. Create inside this field, a field named `Section Hero`, select "Show in
   GraphQL" and add 3 fields: -- Heading (Text) -- Description (Text Area) --
   isHidden (True/False)
2. Set the Location Rules of Field Group to Post Type is equal to Page (or some
   other type)
3. In GraphQL Section, turn on "Show in GraphQL" and set the name to
   `pageBuilder` and toggle `ContentNode Interface (All Post Types)`

You are able to create more sections inside page builder, but after you create
them here in WordPress, you need to add them to GraphQL query inside
`src/queries/fragments/pageFields.fragment.graphql` with all their fields and
also assign them as a component inside `src/constants/AcfPageBuilder.ts`

_Do not forget to generate graphql queries `npm run compile`_

_TIP: If you are using Clone Field in ACF and it doesn't show in some of
section, set: // "Prefix Field Labels" on true and Display to "Sameless"_

## TODO

-   preview page
