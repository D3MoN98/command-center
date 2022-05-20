<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('logout', [AuthController::class, 'logout']);

    Route::group(['middleware' => ['role:admin']], function () {
        Route::apiResource('user', UserController::class);
        Route::apiResource('role', RoleController::class)->except(['store', 'delete']);
        Route::apiResource('permission', PermissionController::class)->except(['store', 'delete']);
        Route::put('role/permission/{id}', [RoleController::class, 'setPermission'])->name('set-permission');
    });
});

Route::middleware('guest')->group(function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('forgot-password', [AuthController::class, 'forgetPassword'])->name('password.email');
    Route::post('reset-password', [AuthController::class, 'ResetPassword'])->name('password.update');
    Route::get('login/google', [AuthController::class, 'googleLoginAction'])->name('login.google');
    Route::get('login/google/callback', [AuthController::class, 'googleLoginCallback'])->name('login.google.callback');
});