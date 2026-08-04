<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('org_id');
            $table->string('name');
            $table->string('industry_type');
            $table->string('gst_number');
            $table->dateTime('established_at');
            $table->string('address');
            $table->string('city');
            $table->string('state');
            $table->string('pincode')->nullable();
            $table->string('country');
            $table->string('website')->nullable();
            $table->string('description')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_latest')->default(true);
            $table->unique(['name', 'country']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('organizations');
    }
};


// id, org_id, name, industry_type, gst_number, 
// established_at, address, city, state, pincode, 
// country, website, description, created_by, 
// updated_by, is_active, is_latest, timestamps