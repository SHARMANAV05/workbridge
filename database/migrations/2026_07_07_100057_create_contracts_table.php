<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('contracts', function (Blueprint $table) {

            $table->id();

            // Contract Information
            $table->string('cnt_id')->unique();

            // Foreign Keys
            $table->foreignId('org_id')->constrained('organizations')->cascadeOnDelete();
            $table->foreignId('emp_id')->constrained('employees')->cascadeOnDelete();
            $table->foreignId('contact_id')->constrained('organization_contacts')->cascadeOnDelete();

            // Contract Details
            $table->string('skill_type');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('contract_days');

            // Financial Details
            $table->decimal('billing_rate', 10, 2);
            $table->decimal('employee_wage', 10, 2);

            $table->decimal('org_service_percentage', 5, 2);
            $table->decimal('emp_service_percentage', 5, 2);

            $table->decimal('org_service_amount', 10, 2);
            $table->decimal('emp_service_amount', 10, 2);

            $table->decimal('client_payable', 10, 2);
            $table->decimal('employee_payable', 10, 2);

            // Invoice
            $table->enum('invoice_type', [
                'Daily',
                'Weekly',
                'Monthly'
            ]);

            // Employee Acceptance
            $table->enum('offer_status', [
                'Pending',
                'Accepted',
                'Rejected'
            ])->default('Pending');

            // Contract Status
            $table->enum('contract_status', [
                'Draft',
                'Active',
                'Completed',
                'Terminated',
                'Cancelled'
            ])->default('Draft');

            // Payment Status
            $table->enum('payment_status', [
                'Pending',
                'Partial',
                'Paid'
            ])->default('Pending');

            // Remarks
            $table->text('remarks')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('contracts');
    }
};