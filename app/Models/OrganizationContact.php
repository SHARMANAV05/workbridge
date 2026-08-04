<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrganizationContact extends Model
{
    use HasFactory;

    protected $fillable = [
        'org_id',
        'contact_code',
        'designation',
        'email',
        'contact_name',
        'is_primary',
        'is_active',
    ];
}
