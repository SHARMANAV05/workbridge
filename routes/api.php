<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\OrganizationContactController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('employees', EmployeeController::class);

Route::apiResource('organizations', OrganizationController::class);

Route::apiResource('contracts', ContractController::class);

Route::apiResource('organizations-contacts', OrganizationContactController::class);

// Route::get('/test-contact-contr', [ OrganizationContactController::class, 'index']);