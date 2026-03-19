<?php

use App\Http\Controllers\Admin\EventController as AdminEventController;
use App\Http\Controllers\Admin\LoginController;
use Illuminate\Support\Facades\Route;

// Admin auth (must be before SPA catch-all)
Route::post('/baalsdepe/admin/login', [LoginController::class, 'login'])->name('admin.login');
Route::post('/baalsdepe/admin/logout', [LoginController::class, 'logout'])->middleware('auth')->name('admin.logout');
Route::get('/baalsdepe/admin/api/me', [LoginController::class, 'me'])->middleware('auth')->name('admin.me');

// Admin Events CRUD (auth required)
Route::middleware('auth')->prefix('baalsdepe/admin/api')->group(function (): void {
    Route::get('events', [AdminEventController::class, 'index']);
    Route::post('events', [AdminEventController::class, 'store']);
    Route::get('events/{event}', [AdminEventController::class, 'show']);
    Route::put('events/{event}', [AdminEventController::class, 'update']);
    Route::delete('events/{event}', [AdminEventController::class, 'destroy']);
});

// Admin SPA shell (separate view/styles from public app)
Route::get('/baalsdepe/admin', fn () => view('admin.app'));
Route::get('/baalsdepe/admin/login', fn () => view('admin.app'));
Route::get('/baalsdepe/admin/events', fn () => view('admin.app'));

// SPA catch-all (public app)
Route::get('/baalsdepe/{any?}', function () {
    return view('app');
})->where('any', '.*');
