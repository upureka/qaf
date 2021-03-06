<?php

/*
  |--------------------------------------------------------------------------
  | Web Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register web routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | contains the "web" middleware group. Now create something great!
  |
 */

Route::group(['prefix' => 'admin', 'namespace' => 'Admin'], function () {
    /**
     * Authentication routes
     */
    Route::group([ 'prefix' => 'auth', 'namespace' => 'Auth'], function () {
        Route::get('/', 'AuthController@getIndex');
        Route::get('/login', 'AuthController@getIndex');
        Route::post('/login', 'AuthController@postLogin')->name('admin.login');
        Route::get('/logout', 'AuthController@getLogout')->name('admin.logout');
        Route::get('/recover-password', 'AuthController@getRecoverPassword');
        Route::post('/recover-password', 'AuthController@postRecoverPassword');
        Route::get('/change-password/{hash}', 'AuthController@getChangePassword');
        Route::post('/change-password', 'AuthController@postChangePassword');
    });

    Route::group(['middleware' => 'auth.admin'], function () {

        /*
         * home route
         */

        Route::get('/', ['as' => 'admin.home', 'uses' => 'HomeController@getIndex']);

        /*
         * Settings routes
         */
        Route::group(['prefix' => 'settings'], function () {
            Route::get('/', ['as' => 'admin.settings', 'uses' => 'SettingsController@getIndex']);
            Route::post('/', ['as' => 'admin.settings', 'uses' => 'SettingsController@postIndex']);
        });

        /*
         * admin routes
         */
        Route::group(['prefix' => 'admins'], function () {
            Route::get('/', ['as' => 'admin.admins', 'uses' => 'AdminController@getIndex']);
            Route::post('/', ['as' => 'admin.admins', 'uses' => 'AdminController@postIndex']);
            Route::get('/edit/{id}', ['as' => 'admin.admins.edit', 'uses' => 'AdminController@getEdit']);
            Route::post('/edit/{id}', ['as' => 'admin.admins.edit', 'uses' => 'AdminController@postEdit']);
            Route::get('/delete/{id}', ['as' => 'admin.admins.delete', 'uses' => 'AdminController@getDelete']);
        });
    });
});
