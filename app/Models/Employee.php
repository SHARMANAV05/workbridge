<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'emp_id',
        'first_name',
        'last_name',
        'gender',
        'dob',
        'email',
        'contact_number',
        'address',
        'city',
        'state',
        'pincode',
        'country',
        'skill_type',
        'experience_years',
        'bank_account_no',
        'bank_name',
        'ifsc_code',
        'document_type',
        'document_number',
        'description',
        'created_by',
        'updated_by',
        'is_active',
        'is_latest'
    ];
}