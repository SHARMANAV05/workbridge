<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [              
        'org_id',
        'name',
        'industry_type',
        'gst_number',
        'established_at',
        'address',
        'city',
        'state',
        'pincode',
        'country',
        'website',
        'description',
        'created_by',
        'updated_by',
        'is_active',
        'is_latest'
    ];
}
