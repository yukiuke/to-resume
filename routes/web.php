<?php

use Illuminate\Support\Facades\Route;

Route::get('/baalsdepe/{any?}', function () {
    return view('app');
})->where('any', '.*');
